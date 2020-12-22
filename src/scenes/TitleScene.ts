import { Scene, AssetList, Tween } from 'wgbh-springroll-game';

export default class TitleScene extends Scene {

    private logo:PIXI.Sprite;

    preload():AssetList{
        return [
            {type:'image', id:'logo', path:'img/logo.png'}
        ];
    }

    setup(){
        const background = new PIXI.Graphics();
        background.beginFill(0xDDDDDD);
        background.drawRect(0, 0, 1624, 750);
        background.endFill();
        this.addChild(background);
        const title = new PIXI.Text('Game Template', {align: 'center', fontSize: 72, fontFamily: 'Arial'});
        title.x = 1624/2;
        title.y = 750/2;
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        this.addChild(title);
        this.logo = new PIXI.Sprite(this.cache.images.logo);
        this.logo.y = -this.logo.height;
        this.resize();
        this.addChild(this.logo);
    }

    start(){
        Tween.get(this.logo).to({y:550}, 1500, 'bounceOut').call(this.activate);
    }


    resize(){
        this.logo.x = (this.stageManager.viewFrame.value.right - 286);
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