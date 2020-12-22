const fs = require('fs');

const configLocation = process.env.npm_package_configDirectory;
console.log(process.env.npm_package_configDirectory);
const outputLocation = ensureTrailingSlash(process.env.npm_package_configDirectory) + 'config.ts';


var message = 'Concatenating config files...';
console.log(message);


var configobject = {};


var recurs = function(path, node) {
	fs.readdirSync(path,{"withFileTypes":true}).forEach(file => {

		var pathtonewfile = ensureTrailingSlash(path) + file.name;
		
		if(file.isDirectory()) {
			node[file.name] = {};
			recurs(pathtonewfile,node[file.name]);
		} else if(file.name.indexOf(".json") > -1) {
			var newname = file.name.substr(0,file.name.indexOf(".json"));
			if(node[newname]) return;
			console.log("adding " + file.name);			
			pathtonewfile = ensureTrailingSlash(path) + file.name;
			node[newname] = JSON.parse(fs.readFileSync(pathtonewfile,'utf8').toString());
		}
	})

}

recurs(configLocation,configobject);

fs.writeFileSync(outputLocation, modulate(configobject,"CONFIG"));
console.log("...concatenated config file created at " + outputLocation)

function modulate(jsonobject,objectname) { // turn the JSON into a js object

	let str = JSON.stringify(jsonobject);
	str = " export const "+ objectname + " = Object.freeze(" + str + ");";
	return str;
}

function ensureTrailingSlash(string) {
  let newstring = string;
  if(!string.match(/\/$/)){
    newstring+="/";
  }
  return newstring;
}