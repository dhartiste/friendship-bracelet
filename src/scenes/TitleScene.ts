import { Scene, AssetList, Tween } from 'wgbh-springroll-game';
import { MovieClip } from 'pixi-animate';
import { Rectangle, interaction } from 'pixi.js';
import DragManager from '../helpers/DragManager';

const NUM_LEVELS:number = 15;
const UPPER_GUIDE:number = 125;
const BUTTON_POS:PIXI.Point = new PIXI.Point(200,UPPER_GUIDE);
const DESIGN_POS:PIXI.Point = new PIXI.Point(900, UPPER_GUIDE);
const PATTERN_POS:PIXI.Point = new PIXI.Point(1100, UPPER_GUIDE);
const LEVEL_OFFSET:number = 30;
const BUTTON_OFFSET:number = 25;

export default class TitleScene extends Scene {

    private vBlue:PIXI.Sprite;
    private dragManager:DragManager;
    
    private level1:PIXI.Sprite;
    private level2:PIXI.Sprite;
    private level3:PIXI.Sprite;
    private btnPink:PIXI.Sprite;
    private btnBlue:PIXI.Sprite;
    private btnYellow:PIXI.Sprite;

    private colors:Array<string> = ["pink", "yellow", "blue"];
    private currentBraceletLevel:number = 0;
    private currentColorName:string = "";
    private currentColorValue:number = 0;
    private userOrder:Array<number> = [];
    private levels:Array<PIXI.Sprite> = [];
    private allLevels:Array<PIXI.Sprite> = [];

    preload():AssetList {
        return [
            {type:'image', id:'v_pink', path:'img/pink.png'},
            {type:'image', id:'v_yellow', path:'img/yellow.png'},
            {type:'image', id:'v_blue', path:'img/blue.png'},
            {type:'image', id:'btn_pink', path:'img/btn_pink.png'},
            {type:'image', id:'btn_yellow', path:'img/btn_yellow.png'},
            {type:'image', id:'btn_blue', path:'img/btn_blue.png'},
            // todo: we need a few sounds - who is going to search out a few open source mp3's??
        ];
    }

    setup() {
        let i:number;
        const background = new PIXI.Graphics();
        background.beginFill(0xDDDDDD); 
        background.drawRect(0, 0, 1624, 750);
        background.endFill();
        this.addChild(background);

        this.vBlue = new PIXI.Sprite(this.cache.images.v_blue);
        this.addChild(this.vBlue);

        let n:number = -1;
        this.levels = [this.level1,this.level2,this.level3];

        for (let index = 0; index < 5; index++) 
        {
            this.colors.forEach(element => {
                //
                n++;
                if (n%3===0){
                    this.levels[n] = new PIXI.Sprite(this.cache.images.v_pink);
                } else if (n%3===1) {
                    this.levels[n] = new PIXI.Sprite(this.cache.images.v_yellow);
                } else {
                    this.levels[n] = new PIXI.Sprite(this.cache.images.v_blue);
                }
                this.levels[n].position = PATTERN_POS;
                this.levels[n].y += n*LEVEL_OFFSET;
                this.levels[n].alpha = 0;
                this.addChild(this.levels[n]);
                this.allLevels.push(this.levels[n]);
            });
        }

        this.btnBlue = new PIXI.Sprite(this.cache.images.btn_blue);
        this.btnPink = new PIXI.Sprite(this.cache.images.btn_pink);
        this.btnYellow = new PIXI.Sprite(this.cache.images.btn_yellow);

        this.btnPink.position = BUTTON_POS;
        this.btnYellow.position = BUTTON_POS;
        this.btnBlue.position = BUTTON_POS;
        this.btnYellow.y = this.btnPink.y + this.btnPink.height + BUTTON_OFFSET;
        this.btnBlue.y = this.btnYellow.y + this.btnYellow.height + BUTTON_OFFSET;

        this.addChild(this.btnBlue, this.btnPink, this.btnYellow);

        this.btnPink.on("pointerdown",()=>{
            this.makeBraceletLevel(0);
        });
        this.btnYellow.on("pointerdown",()=>{
            this.makeBraceletLevel(1);
        });
        this.btnBlue.on("pointerdown",()=>{
            this.makeBraceletLevel(2);
        });
        this.resize(this.stageManager.width,this.stageManager.height,this.stageManager.offset);
    }

    start() {

         this.interactive = true;
        // this.interactiveChildren = true;
        this.dragManager = new DragManager(this, this, new Rectangle(312, 0, 1000, 750) , this.onStartDrag, this.onEndDrag, this.onStickySelect);
        this.dragManager.addObject(this.vBlue);
        this.vBlue.x=400;

        let a:number = 0;

        this.allLevels.forEach((element, index) => {
            a = 1-index*0.07;
            Tween.get(element).wait(100*index).to({alpha:a},a*1200);
        });

        this.btnPink.buttonMode = true;
        this.btnPink.interactive = true;
        this.btnYellow.buttonMode = true;
        this.btnYellow.interactive = true;
        this.btnBlue.buttonMode = true;
        this.btnBlue.interactive = true;
    }

    onStartDrag = (object:MovieClip) => {
        //this.sound.play(SFX.pop);
    }

    onStickySelect = (object:MovieClip) => {
        //object.filters = SELECTED_FILTERS;
    }

    onEndDrag = (object:MovieClip) => {
       // object.filters = null;
    }

    // ----------------------------------------------------------
    // ****** SOME FUNCTIONS >>>>>>>
    // ----------------------------------------------------------

    makeBraceletLevel = (n:number)=> 
    {
        let newLevel:PIXI.Sprite;
        if (n%3===0){
            newLevel = new PIXI.Sprite(this.cache.images.v_pink);
        } else if (n%3===1) {
            newLevel = new PIXI.Sprite(this.cache.images.v_yellow);
        } else {
            newLevel = new PIXI.Sprite(this.cache.images.v_blue);
        }
        this.addChild(newLevel);
        this.dragManager.addObject(newLevel);
        newLevel.position = DESIGN_POS;
        newLevel.y += this.currentBraceletLevel*LEVEL_OFFSET;

        this.currentBraceletLevel++;
        if (this.currentBraceletLevel >= NUM_LEVELS-1) {
            //
            console.log("WOW! You Made it!");
            // todo: play a sound - how are we going to do that?

            // this.btnPink.interactive = false;
            // this.btnYellow.interactive = false;
            // this.btnBlue.interactive = false;
            this.currentBraceletLevel = 0;

            // kind of abrupt transition right now!
            // think of another way to end the round
            //this.changeScene('congratulation');
        }
    }

    // ----------------------------------------------------------
    // ****** END SOME FUNCTIONS <<<<<<<<<
    // ----------------------------------------------------------

    update(){
        this.dragManager.update();
    }

    resize(w:number,h:number,offset:PIXI.PointLike){
        super.resize(w,h,offset);
    }

}