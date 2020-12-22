# README: PuppetMouth

PuppetMouth is a controller to implement Rhubarb lip sync on a mouth movie clip.

## How To

The puppet mouth takes in a PIXI MovieClip with (up to) nine labeled frames - A B C D E F (G H X) - corresponding with the "rhubarb" mouth shapes described at  https://github.com/DanielSWolf/rhubarb-lip-sync#mouth-shapes
Nutshell for those shapes is 

A = closed ("M","B","P" sounds)
B = Teeth only ("EE" sound, also S, T, K)
C = Moderately open ("Eh")
D = Wide open ("Ah")
E = Rounded ("Er","R")
F = Round/Puckered ("OO","W","O")
G = (optional) Teeth on lip for "F"
H = (optional) Tongue touching roof for "L" 
X = closed again at rest, if needed to distinguish from A.

### Set up the puppet

    var mouthmc = pixianimatefile.mouth;
    var mouthpuppet = new PuppetMouth(mouthmc);

### Set up the lip sync arrays

Times and positions as an interlaced Array. Mashed together from rhubarb tool's default output:

    var lipsync = {
        "game_intro":[0,"X", 1.34,"A", 2.5,"E", 3.1,"D", 3.4,"X"],
        "game_goodbye":[0,"X", 0.44,"B", 0.8,"C", 0.9,"D", 1.0,"X"]
    };

### Activate lip sync 

The SoundManager will pass the sound instance back from a sound play call. Pass this sound instance to the PuppetMouth so that it can respond to the sound's "position" update. Also pass the lipsync positions.

    var soundname = "game_intro";
    var soundinstance = this.soundManager.play(soundname);
    mouthpuppet.lipSync(soundinstance, lipsync[soundname]);
    
