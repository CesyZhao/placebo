import ScreenController from './ScreenController'
import MusicController from './MusicController'
import StateController from './StateController'

export class Placebo {

  screen: ScreenController;
  music: MusicController;

  state: StateController;
  constructor() {
    this.state = new StateController();
    this.screen = new ScreenController(this);
    this.music = new MusicController(this);
  }
}

export default new Placebo()
