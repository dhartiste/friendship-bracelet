import {Game} from 'wgbh-springroll-game';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import LipsyncScene from './scenes/LipsyncScene'; 
import CongratulationScene from './scenes/CongratulationScene';

export default class TemplateGame extends Game{

    gameReady(){
        this.addScenes({
            title: TitleScene,
            game: GameScene,
            lipsync: LipsyncScene,
            congratulation: CongratulationScene
        });
        this.changeScene('title');
    }
}