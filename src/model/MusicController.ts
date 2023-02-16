import Player from './Player'
import { getSongUrl } from '../api/music'
import { updatePlayingStatus } from '../store/module/controller'
import { store } from '../store/store'
import { SwitchDirection } from '../defination/music'
import { Placebo } from './Placebo'

class MusicController {

  player!: Player;

  placebo: Placebo;
  constructor(placebo: Placebo) {
    this.player = new Player();
    this.placebo = placebo;

  }

  get playing() {
    return this.player.getPlayingStatus();
  }

  async playMusicById(id: number) {
    const { updatePlayingStatus, switchPlayingMusic } = this.placebo.state
    updatePlayingStatus();
    let url = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;;
    try {
      const data = await getSongUrl(id);
      if (data instanceof Array) {
        const [obj] = data;
        url = obj.url || `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
      }
    } catch (e) {
      // TODO handle error
    }

    this.player.onPlay = () => updatePlayingStatus();
    this.player.onEnd = () => switchPlayingMusic(SwitchDirection.Next);

    this.player.initMusic(url);
  }

  seekTime() {
    return this.player.getCurrentTime();
  }

  switchPlayingStatus() {
    const nowPlaying = this.player.getPlayingStatus();
    nowPlaying ? this.player.pause() : this.player.play();
    console.timeStamp()
  }
}

export default MusicController;
