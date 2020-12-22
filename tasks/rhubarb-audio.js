const fs = require('fs');

let audioDirectory = process.env.npm_package_rhubarbconf_audioDirectory;
const runrhubarb = process.env.npm_package_rhubarbconf_rhubarbBinary;
const audioList = process.env.npm_package_rhubarbconf_audioListFile;
const outputLocation = ensureTrailingSlash(process.env.npm_package_rhubarbconf_outputDirectory) + "lipsync.json";
let audiofilelist;
let output = "{";

const { execSync } = require('child_process');

var getallfiles = function(path,fileextension) {
  const files = [];
	fs.readdirSync(path,{"withFileTypes":true}).forEach(file => {
		if(!file.isDirectory() && file.name.indexOf(fileextension) > -1) {
      var newname = file.name;
      console.log("found audio file: ",newname);
      files.push(newname);
		}
  })
  return files;
}

var getFilesFromList = function(pathtoaudiofile) {
  // 
  const files = fs.readFileSync(pathtoaudiofile,'utf8').toString().split("\n");
  return files;
}

if(audioDirectory) {
  if(!audioDirectory.match(/\/$/)){
    audioDirectory+="/";
  }

  if(audioList) {
    audiofilelist = getFilesFromList(audioList);
  } else {
    audiofilelist = getallfiles(audioDirectory,'.ogg');
  }
  readfiles(audiofilelist);

  output = output.replace(/,\s*$/,"");
  output +="}";
  
  newconfig = JSON.parse(output);

  let fullconfig;
  try {
    fullconfig = fs.readFileSync(outputLocation,'utf8');
    fullconfig = JSON.parse(fullconfig.toString());
    for(var i in newconfig) {
     fullconfig[i] = newconfig[i];
    }
  } catch (error) {
    console.log("No existing json file configuration", error);
    fullconfig = newconfig;
  }
  
  outputstring = packageJSON(fullconfig,"LIPSYNC"); 
  if(outputLocation) {
    fs.writeFileSync(outputLocation, outputstring);
  }
  if (fs.existsSync('captionsTemp.txt')) {
    fs.unlinkSync('captionsTemp.txt', function (err) {
      if (err) throw err;
    });   
  }
  console.log("FINISHED");
}

function readfiles(audiofilelist) {
  for(var index in audiofilelist) {

    // strip out the filename in the case that there are captions included. Assume tab delimited.
    var filename = audiofilelist[index].trim().split("\t")[0];

    console.log('rhubarb ' + audioDirectory + filename);

    /* 
    rhubarb has an option to feed it a txt file that corresponds with the dialog in an audio file, which gives some better results.
    The audio text is available here, as long as the captions file is used.
    If found, the dialogue is added to a temporary file (captionsTemp.txt) that is processed with the rhubarb command. 
    The file is deleted after the proces is done.
    */

    let audiotext = audiofilelist[index].trim().split("\t")[1];
    let audiotext2 = "";

    if (audiotext) {

      // console.log("Writing file for", audiotext);
      fs.writeFileSync('captionsTemp.txt', audiotext, function (err) {
        if (err) throw err;
      });
      audiotext2 = "-d captionsTemp.txt";

    } else {
      audiotext2 = "";
    }
    
    if(runrhubarb) {
      if (audiotext2) {
        console.log("Rhubarb processing audiofile with text:",audiotext);
      }
      result = execSync(runrhubarb +' ' + audioDirectory + ensureogg(filename) + ' ' + audiotext2, (err) => {
        if (err) {
            // node couldn't execute the command
            return;
          }
      });
      output += "\"" + filename.replace(/\.\w{2,4}$/,"") + "\": " + parseResult(result);
    }
  }
}

function parseResult(resultstring) { // this is a buffer....
  let res = resultstring.toString().replace(/(\d+\.\d+)\t(\w+)/g,"$1,\"$2\",");
  res = res.replace(/\n/g,"");
  res = res.replace(/,\s*$/,"");
  res = "[" + res + "],\n";
  return res;
}

function packageJSON(json,name) {
  let string = JSON.stringify(json);
  return string;
}

function ensureTrailingSlash(string) {
  let newstring = string;
  if(!string.match(/\/$/)){
    newstring+="/";
  }
  return newstring;
}

function ensureogg(string) {
  let newstring = string;
  if(!string.match(/\.ogg$/)){
    newstring+=".ogg";
  }
  return newstring;
}