import ScreenController from './ScreenController'
import MusicController from './MusicController'
import StateController from './StateController'
import UserController from "./UserController";

export class Placebo {

  screen: ScreenController;

  music: MusicController;

  state: StateController;

  user: UserController;

  constructor() {
    this.state = new StateController();
    this.screen = new ScreenController(this);
    this.music = new MusicController(this);
    this.user = new UserController(this);
  }
}

export default new Placebo()
