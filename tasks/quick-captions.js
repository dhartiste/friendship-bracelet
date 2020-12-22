const fs = require('fs');

let audioDirectory = process.env.npm_package_captionconf_audioDirectory;
const audioList = process.env.npm_package_captionconf_audioListFile; // this is a simple TSV list of audio files and their associated lines
const outputLocation = process.env.npm_package_captionconf_outputDirectory + "captions.json";

let afinfo = "afinfo";

let lines;

let output = "{";

const { execSync } = require('child_process');

var getFilesFromList = function(pathtoaudiofile) {
  // 
  const files = fs.readFileSync(pathtoaudiofile,'utf8').toString().split("\n");
  return files;
}

if(audioDirectory && audioList) {

  lines = makeObject(audioList);

//  audiofilelist = lines.keys();

  readfiles(lines,".mp3");

  output = output.replace(/,\s*$/,"");
  output +="}";
  
  newconfig = lines; //JSON.parse(output);

  let fullconfig;
  try {
    fullconfig = fs.readFileSync(outputLocation,'utf8');
    fullconfig = JSON.parse(fullconfig.toString());
    for(var i in newconfig) {
     fullconfig[i] = newconfig[i];
    }
  } catch(error) {
    console.log("No existing json file configuration", error);
    fullconfig = newconfig;
  }
  

  outputstring = packageJSON(fullconfig,"CAPTIONS");
  console.log("The output string = " , outputLocation); 
  if(outputLocation) {
    fs.writeFileSync(outputLocation, outputstring);
  }
  console.log("FINISHED");
}


function makeObject(audiofilelist) {
  // convert filename\tstring to object
  let obj = {};
  audiofilelist = getFilesFromList(audioList);
  for(var line in audiofilelist) {
    var o = audiofilelist[line].split("\t");
    var key = noExtension(o[0]);
    var val = stripquotes(o[1]);
    val = nodoublequotes(val);
    val = escapequotes(val);
    val = stripTrailingReturn(val);
    obj[key] = [{content:val,start:0}];
  }
  console.log(obj);
  return obj;
}

function readfiles(audiofilelistobject,extension) {
  for(var filename in audiofilelistobject) {
    console.log('afinfo ' + audioDirectory + filename);
    
    if(afinfo) {
       try{
         result = execSync(afinfo + ' ' + audioDirectory + ensureExtension(filename,extension) + '| grep duration');
       }catch(ex){
          //node couldn't execute the command
       }
      lines[noExtension(filename)][0].end = parseResult(result);
    }
  }
}


function parseResult(resultstring) { // this is a buffer....
  let res = resultstring.toString().replace(/.*\s+(\d+\.\d+).*/g,"$1");
  console.log("result: " + res);
  return Math.round(Number(res) * 1000);
}

function packageJSON(json,name) {
  let string = JSON.stringify(json,null,2);
//  string = " export const "+ name + " = Object.freeze(" + string + ");";
  return string;
}

function ensureTrailingSlash(string) {
  let newstring = string;
  if(!string.match(/\/$/)){
    newstring+="/";
  }
  return newstring;
}

function ensureExtension(string,extension) {
  let newstring = string;
  extension = extension.replace(/^\./,"");
  var re = new RegExp('/\.' + extension + '$/', "g");
  if(!string.match(re)){
    newstring+="." + extension;
  }
  return newstring;
}

function noExtension(string) {
  return string.replace(/\.\w{2,4}$/,"");
}


function stripquotes(string) {
  console.log(string);
  return string.replace(/^"(.*)"$/,"$1");
}

function nodoublequotes(string) {
  return string.replace(/""$/g,'"');
}

function escapequotes(string) {
  return string.replace(/"/gi,"\"");
}

function stripTrailingReturn(string) {
  string = string.replace(/\n+$/,"");
  string = string.replace(/\r+$/,"");
  return string;
}