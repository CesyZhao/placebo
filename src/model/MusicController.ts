import Player from './Player'
import { getAlbum, getList, getLyric, getPersonalFM, getPersonalized, getRankingList, getSongUrl } from '../api/music'
import { Album, AvailableAlbum, AvailableMusic, SpecialAlbum, SwitchDirection } from '../defination/music'
import { Placebo } from './Placebo'
import { formatList } from '../util/audio'

class MusicController {

  player: Player;

  placebo: Placebo;

  personalizedAlbums: Album[];

  currentActiveAlbum: number;

  constructor(placebo: Placebo) {
    this.player = new Player();
    this.placebo = placebo;
    this.personalizedAlbums = [];
    this.currentActiveAlbum = 0;
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

  updateCurrentActiveAlbum(index: number) {
    this.currentActiveAlbum = index;
  }

  unload() {
    return this.player?.unload();
  }

  seekTime() {
    return this.player.getCurrentTime();
  }

  next() {
    this.placebo.state.switchPlayingMusic(SwitchDirection.Next)
  }

  prev() {
    this.placebo.state.switchPlayingMusic(SwitchDirection.Prev)
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
    this.placebo.state.currentAlbum = album;
  }

  async playMusicById(id: number) {
    const { switchPlayingMusic } = this.placebo.state;
    this.placebo.state.playingStatus = false;
    let url = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
    try {
      const data = await getSongUrl(id);
      if (data instanceof Array) {
        const [obj] = data;
        url = obj.url || url;
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

  async getPersonalized() {
    let personalizedList: Album[]
    try {
      const { result } = await getPersonalized();
      personalizedList = result;
    } catch (e) {
      personalizedList = [];
    }
    this.personalizedAlbums = personalizedList;
    return personalizedList;
  }

  async getLyric(id: number) {
    try {
      const { lrc, tlyric, nolyric, uncollected } = await getLyric(id);
      return (nolyric || uncollected) ? {} : { lyric: lrc.lyric, translatedLyric: tlyric.lyric };

    } catch (e) {
      return {};
    }
  }

  async getRankingList() {
    try {
      const { list } = await getRankingList();
      return list;

    } catch (e) {
      return [];
    }
  }

  async getPersonalFM() {
    try {
      const { data } = await getPersonalFM()
      let album: AvailableAlbum = {
        playlist: formatList(data),
        id: SpecialAlbum.FM,
        name: '私人 FM'
      };
      this.updatePlayingAlbum(album, 0);
      this.placebo.screen.showPanel()
    } catch (error) {

    }
  }
}

export default MusicController;
