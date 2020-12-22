# WGBH SpringRoll Game Template

Example project utilizing [WGBH SpringRoll Game Library](https://github.com/WGBH/wgbh-springroll-game).
This project is based on [Springroll-Seed](https://github.com/SpringRoll/Springroll-Seed).

## Setup

`npm install` will install all required dependencies. 

To test the game, run `npm start` then open http://localhost:8080 in your browser.

## Commands

### npm start

Starts the dev server - it will be available at `127.0.0.1:8080`/`localhost:8080`

### npm run build:release

Builds app for release

### npm run build:debug

Builds the app without mangling or minifying it for easier debugging

### npm run config

Compress all json files within `configDirectory` in `package.json` to a `CONFIG` object in `config.ts`

        Captions and Lipsync are generated with a similar process. You can have one or the other or both.

### npm run quickcaptions

Creates a captions json file based on tab separated list of filenames and caption texts. 

There are a few settings under `captionconf` in `package.json`

`audioDirectory` is where the audio files are located

`audioListFile` is where the TSV file of filenames and caption texts is located

`outputDirectory` is where the output `captions.json` will be exported

### npm run rhubarb   

Creates a lipsync json file based on list of filenames (can use captions.txt if you want to have one file for both). 

####Installation Requirements

You will need to install rhubarb globally, since you will run this from cli (https://github.com/DanielSWolf/rhubarb-lip-sync/releases)

Set the path for rhubarbconf.rhubarbBinary in your package.json file, 
e.g. "rhubarbBinary": "/Applications/rhubarb-lip-sync-1.10.0-osx/rhubarb"
Change [/Applications/rhubarb-lip-sync-1.10.0-osx/rhubarb] to the location of rhubarb on your local machine.

####Files Needed

* src/config/captions.txt - list of filenames to process
* static/sounds/vo/[files].ogg - the actual audio files to process
* tasks/rhubarb-audio.js - processing script that will run (you don't need to modify this)
* package.json - configuration file (you may need to configure this, see below)

####Configuration

There are a few settings under `rhubarbconf` in `package.json`

`audioDirectory` is where the audio files are located

`audioListFile` is where the TSV file of filenames (and optional caption texts) is located.

`outputDirectory` is where the output `lipsync.json` will be exported

`rhubarbBinary` is where the rhubarb application is installed on your computer 

Note: the LipsyncScene.ts file has an example of how to use this.

## Project structure

`assets_src` is where the XFL files go (XFL is uncompressed FLA)

`src` is where the typescript code goes

`src/assets` is where the Animate content gets published into, as PixiAnimate js files and image assets

`static` is where any other bitmap, audio, or data files go

`templates` has the html document

`html.config.js` has some constants to use in the html template

`tsconfig.json` is the compiller options

`tslint.json` is the linter (style enforcer) options

`webpack.config.js` is the bundler options

`package.json` is for npm: build scripts, dependencies, etc.