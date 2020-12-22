import { Scene, AssetList, PauseableTimer } from 'wgbh-springroll-game';
import * as GameArt from '../assets/Game';

export default class GameScene extends Scene {

    private art: Art;

    private tvOn = false;

    private counter:PauseableTimer;

    preload():AssetList{
        return [
            {type:'animate', id:'gameArt', stage:GameArt.stage, cacheInstance:true},
            {type:'sound', id:'tvOn', path:'sounds/on.{ogg,mp3}',context:'sfx'},
            {type:'sound', id:'tvOff', path:'sounds/off.{ogg,mp3}', volume:0.3,context:'sfx'},
            {type:'sound',id:'hello',path:'sounds/vo/hello.{ogg,mp3}',context:'vo'},
            {type:'sound',id:'bye',path:'sounds/vo/bye.{ogg,mp3}',context:'vo'}
        ];
    }

    setup(){
        this.art = this.cache.animations.gameArt as Art;
        this.art.remote.button.gotoAndStop(0);
        this.art.screen.gotoAndStop(0);
        this.addChild(this.art);
    }

    get score():number{
        if(!this.dataStore.score){
            this.dataStore.score = 0;
        }
        return this.dataStore.score;
    }
    set score(score:number){
        this.dataStore.score = score;
    }

    start(){
        this.art.remote.cursor = 'pointer';
        this.art.remote.interactive = true;
        this.art.remote.on('pointerdown', this.buttonDown);
        this.art.remote.on('pointerup', this.buttonUp);
        this.art.remote.on('pointerupoutside', this.buttonUp);
        this.art.remote.on('pointertap', this.toggleTV);

        this.art.lipsyncScene.cursor = 'pointer';
        this.art.lipsyncScene.interactive = true;
        this.art.lipsyncScene.on('pointerup', ()=>{
            this.changeScene('lipsync');
        });

        this.art.screen.cursor = 'pointer';
        this.art.screen.on('pointertap', ()=>{
            this.changeScene('congratulation');
        });
    }

    toggleTV = ()=>{
        this.art.remote.interactive = false;
        if(this.tvOn){
            this.clearInterval(this.counter);
            this.art.screen.interactive = false;
            this.sound.play('tvOff');
            PIXI.animate.Animator.play(this.art.screen, 'turnOff', this.enableRemote);
            this.sound.play('bye');
            this.stageManager.showCaption('bye');            
        }
        else{
            this.sound.play('tvOn');
            PIXI.animate.Animator.play(this.art.screen, 'turnOn', this.watchTV);
            this.sound.play('hello');
            this.stageManager.showCaption('hello');
        }
        this.tvOn = !this.tvOn;
    }

    watchTV = ()=>{
        this.enableRemote();
        this.art.screen.interactive = true;
        PIXI.animate.Animator.play(this.art.screen, 'watchTV');
        this.counter = this.setInterval(this.countTime, 1000);
    }

    countTime = ()=>{
        this.score++;
    }

    enableRemote = ()=>{
        this.art.remote.interactive = true;
    }

    buttonDown = ()=>{
        this.art.remote.button.gotoAndStop(1);
    }

    buttonUp = ()=>{
        this.art.remote.button.gotoAndStop(0);
    }

    cleanup(){
        this.clearInterval(this.counter);
    }
}

interface Art extends PIXI.animate.MovieClip {
    remote: PIXI.animate.MovieClip & {
        button: PIXI.animate.MovieClip;
    };
    screen: PIXI.animate.MovieClip;
    lipsyncScene: PIXI.animate.MovieClip;
}