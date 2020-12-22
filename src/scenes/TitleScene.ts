import { Scene, AssetList, Tween } from 'wgbh-springroll-game';

export default class TitleScene extends Scene {

    private NUM_LEVELS = 15;
    private DESIGN_POS = 900;
    private PATTERN_POS = 1100;
    private currentBraceletLevel:number = 0;


    private level1:PIXI.Sprite;
    private level2:PIXI.Sprite;
    private level3:PIXI.Sprite;

    // private btnPink:PIXI.animate.MovieClip;
    // private btnBlue:PIXI.animate.MovieClip;
    private btnYellowMC:PIXI.animate.MovieClip;

    private btnPink:PIXI.Sprite;
    private btnBlue:PIXI.Sprite;
    private btnYellow:PIXI.Sprite;

    private colors:Array<string> = ["pink", "yellow", "blue"];
    private currentColorName:string = "";
    private currentColorValue:number = 0;
    private userOrder:Array<number> = [];
    private levels:Array<PIXI.Sprite> = [];

    preload():AssetList{
        return [
            {type:'image', id:'v_pink', path:'img/pink.png'},
            {type:'image', id:'v_yellow', path:'img/yellow.png'},
            {type:'image', id:'v_blue', path:'img/blue.png'},
            {type:'image', id:'btn_pink', path:'img/btn_pink.png'},
            {type:'image', id:'btn_yellow', path:'img/btn_yellow.png'},
            {type:'image', id:'btn_blue', path:'img/btn_blue.png'},
        ];
    }

    setup(){
        let i:number;
        const background = new PIXI.Graphics();
        background.beginFill(0xDDDDDD);
        background.drawRect(0, 0, 1624, 750);
        background.endFill();
        this.addChild(background);

        let n:number = -1;
        this.levels = [this.level1,this.level2,this.level3];

        for (let index = 0; index < 5; index++) {

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
                this.levels[n].x = this.PATTERN_POS;
                this.levels[n].y = 125 + n*30;
                this.levels[n].alpha = 0;
                this.addChild(this.levels[n]);
            });
        }

        this.btnBlue = new PIXI.Sprite(this.cache.images.btn_blue);
        this.btnPink = new PIXI.Sprite(this.cache.images.btn_pink);
        this.btnYellow = new PIXI.Sprite(this.cache.images.btn_yellow);


        // recipe for an object that has interactivity and two states

        /*
            0. load 2 gfx, states: off and pressed
            1. make a container
            2. add the 2 gfx to the container
            3. put the interactivity on the container (instead of on Sprite)
            4. toggle the vis of the gfx on user input
            5. add click sound
        */

        // let c:PIXI.Container;
        // c.addChild(this.btnPink);

        //////


        this.btnBlue.x = this.btnPink.x = this.btnYellow.x = 200;
        this.btnPink.y = 150;
        this.btnYellow.y = this.btnPink.y + this.btnYellow.height + 25;
        this.btnBlue.y = this.btnYellow.y + this.btnBlue.height + 25;

        this.addChild(this.btnBlue, this.btnPink, this.btnYellow);

        this.btnPink.on("pointerdown",()=>{
            // todo
            console.log("Pink button pressed");
            this.makeBraceletLevel(0);
        });
        this.btnYellow.on("pointerdown",()=>{
            // todo
            console.log("Yellow button pressed");
            this.makeBraceletLevel(1);
        });
        this.btnBlue.on("pointerdown",()=>{
            // todo
            console.log("Blue button pressed");
            this.makeBraceletLevel(2);
        });


        // this.simpleButton(this.btnPink);
        // this.simpleButton(this.btnYellow);
        // this.simpleButton(this.btnBlue);

        this.resize();
    }

    start(){

        let n:number = -1;
        let a:number = 0;

        for (let index = 0; index < 5; index++) {

            this.colors.forEach(element => {
                n++;
                a = 1-n*0.07;
                Tween.get(this.levels[n]).wait(100*n).to({alpha:a},a*1200);
            });
        }

        this.btnPink.buttonMode = true;
        this.btnPink.interactive = true;
        this.btnYellow.buttonMode = true;
        this.btnYellow.interactive = true;
        this.btnBlue.buttonMode = true;
        this.btnBlue.interactive = true;



    }

    // ----------------------------------------------------------
    // ****** SOME FUNCTIONS >>>>>>>
    // ----------------------------------------------------------

    makeBraceletLevel = (n:number)=> {
        //

        let newLevel:PIXI.Sprite;
        if (n%3===0){
            newLevel = new PIXI.Sprite(this.cache.images.v_pink);
        } else if (n%3===1) {
            newLevel = new PIXI.Sprite(this.cache.images.v_yellow);
        } else {
            newLevel = new PIXI.Sprite(this.cache.images.v_blue);
        }
        this.addChild(newLevel);
        newLevel.x = this.DESIGN_POS;
        newLevel.y = 125 + this.currentBraceletLevel*30;

        this.currentBraceletLevel++;
        if (this.currentBraceletLevel >= this.NUM_LEVELS-1) {
            //
            console.log("WOW! You Made it!");
            //todo: play a sound
            // this.btnPink.interactive = false;
            // this.btnYellow.interactive = false;
            // this.btnBlue.interactive = false;
            this.currentBraceletLevel = 0;
            this.DESIGN_POS-= newLevel.width+10;

            this.changeScene('congratulation');


        }

        
    }






    // ----------------------------------------------------------
    // ****** END SOME FUNCTIONS <<<<<<<<<
    // ----------------------------------------------------------

    resize(){
       // todo
    }


    activate = ()=>{
        this.interactive = true;
        this.cursor = 'pointer';
        this.once('pointertap', ()=>{
            this.cursor = 'normal';
            this.changeScene('game');
        });
    }
}