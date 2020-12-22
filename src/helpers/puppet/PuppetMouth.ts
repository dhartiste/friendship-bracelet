
/**
 * PuppetMouth controls a PIXI Animate MovieClip that contains frames for various mouth shapes
 * It is set to be called with an audio file and configuration for the lipsync
 */
export class PuppetMouth {

    mouth:PIXI.animate.MovieClip;
    syncRhubarb:Array<RhubarbJSON> | RhubarbArray;
    update:Function;

    _currentDuration:number;
    _currentSoundInstance:PIXI.sound.IMediaInstance;
    _talking:boolean;

    constructor (object:PIXI.animate.MovieClip) {
        this.mouth = object;
        this.rest();
    }

    stop() {
        this.rest();   
        this._talking = false;
    }

    rest() {
        this.mouth.gotoAndStop("X");
    }

    /**
     * 
     * @param syncconfig 
     */
    setSyncArray(syncconfig:RhubarbArray) {
        this.syncRhubarb = syncconfig;
        this._currentDuration = syncconfig[syncconfig.length-2] as number;
        this.update = this.updateRhubarb.bind(this);
    } 

    /**
     * 
     * @param syncconfig 
     */
   setSyncJSON(syncconfig:Array<RhubarbJSON>) {
       this.syncRhubarb = syncconfig;
       this._currentDuration = syncconfig[syncconfig.length -1].end;
       this.update = this.updateJSON.bind(this);
   }

    /**
     * 
     * updatePercentage works with Rhubarb's default style output, 
     * converted into an array of 2-element arrays, for start time and mouth position code:
     * [
     *  [0, "X"],
     *  [0.23, "A"],
     *  [0,40, "B"]...
     * ]
     * 
     * The numbers up front are converted here from absolute time to percentages in order to just pass the position.
     *  
     * 
     * @param position The position of the audio file, from 0 to 1, or could be the elapsed time in seconds if that's how the config is structured
     */
    updateRhubarb(position:number) {
        const frame = this.getFrameValue(position * this._currentDuration);
        this.mouth.gotoAndStop(frame);
    }

    /**
     * 
     * Uses Rhubarb's JSON-style configuration
     * 
     * @param position Position of audio file, from 0 to 1, or could be the elapsed time in seconds if that's how the config is structured.
     */
    updateJSON(position:number) {
        const frame = this.getFrameValueJSON(position * this._currentDuration);
        this.mouth.gotoAndStop(frame);
    }


    getFrameValue(totalTime:number):string {
        for (let i = this.syncRhubarb.length - 2; i >= 0; i=i-2) {
            if(this.syncRhubarb[i] <= totalTime) {
                return this.syncRhubarb[i+1] as string;
            }
        }
        return "X";
    }

    getFrameValueJSON(totalTime:number):string {
        for (let i = this.syncRhubarb.length - 1; i >= 0; i--) {
            if((this.syncRhubarb[i] as RhubarbJSON).start <= totalTime) {
                return (this.syncRhubarb[i] as RhubarbJSON).value;
            }
        }
        return "X";
    }

    lipSync(sound:PIXI.sound.IMediaInstance,syncinfo:RhubarbArray) {
        this.setSyncArray(syncinfo);
        this._currentSoundInstance = sound;
        this._currentSoundInstance.off("progress",this.updateMouth);
        this._currentSoundInstance.on("progress",this.updateMouth);
        this._talking = true;
      }

      updateMouth = (progress:number) => {
        if(this._talking) {   
            this.update(progress);
            if(progress >= 1) {
              this._talking = false;
              this._currentSoundInstance.off("progress",this.updateMouth);
            }
        }
      }
}

export type RhubarbJSON = {
    start:number,
    end:number,
    value:RhubarbMouths
};

export type RhubarbArray = Array<number|RhubarbMouths>;

export type RhubarbMouths = "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|"X";

export interface RhubarbConfig { [key: string]: RhubarbArray; }