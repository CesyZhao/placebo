import Player from './Player';
import { getAlbum, getList, getSongUrl } from '../api/music'
import { SwitchDirection } from '../defination/music';
import { Placebo } from './Placebo';
import { formatList } from '../util/audio'

class MusicController {

  player!: Player;

  placebo: Placebo;
  constructor(placebo: Placebo) {
    this.player = new Player();
    this.placebo = placebo;

  }

  get playing() {
    return this.placebo.state.playingStatus;
  }

  get currentMusic() {
    return this.placebo.state.currentMusic;
  }

  get playMode() {
    return this.placebo.state.playMode;
  }

  get favorites() {
    return this.placebo.state.favorites;
  }

  get currentAlbum() {
    return this.placebo.state.currentAlbum;
  }

  async playMusicById(id: number) {
    const { switchPlayingMusic } = this.placebo.state;
    this.placebo.state.playingStatus = false;
    let url = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
    try {
      const data = await getSongUrl(id);
      if (data instanceof Array) {
        const [obj] = data;
        url = obj.url || `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
      }
    } catch (e) {
      // TODO handle error
    }

    this.player.onPlay = () => this.placebo.state.playingStatus = true;
    this.player.onEnd = () => switchPlayingMusic(SwitchDirection.Next);

    this.player.initMusic(url);
  }

  async getAlbumDetail(id: string | number) {
    let album, list
    try {
      const { playlist } = await getAlbum(+id);
      album = playlist;
      const { songs } = await getList(album.id);
      list = formatList(songs);
    } catch (e) {
      album = {} as any;
      list = [];
    }

    return { album, list }
  }

  seekTime() {
    return this.player.getCurrentTime();
  }

  switchPlayingStatus() {
    const nowPlaying = this.player.getPlayingStatus();
    nowPlaying ? this.player.pause() : this.player.play();
    const newestStatus = this.player.getPlayingStatus();
    this.placebo.state.playingStatus = newestStatus;
  }

  switchPlayMode() {
    this.placebo.state.switchPlayMode();
  }

  updatePlayingAlbum(album: Record<string, any>, index: number) {
    const { playlist } = album;
    const nextSong = playlist[index];
    this.placebo.state.currentMusic = nextSong;
  }
}

export default MusicController;
