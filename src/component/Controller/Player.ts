import { Howl, Howler } from 'howler';

const BYTE_ARRAY_LENGTH = 4096;

interface Option {
  onPlay: () => void;
  onEnd: () => void;
}

export default class Player {
  static instance: any = null
  static analyser: any = null
  static dataArray: any = null

  static playSong(url: string, opt: Option) {
    Player.instance?.unload();
    Player.instance = new Howl({
      src: [url],
      html5: true,
      preload: true,
      format: ['mp3'],
      onplayerror: Player.handlePlayError,
      onend: opt.onEnd,
      onload: Player.play,
      onplay: opt.onPlay
    });
  }

  static play() {
    Player.instance?.play();
    Player.createAnalyser();
  }

  static pause() {
    Player.instance.pause();
  }

  static next() {
    // store.dispatch(nextSong())
  }

  static prev() {
    // store.dispatch(prevSong())
  }

  static handlePlayError() {
    // toaster.error('Bad audio!', () => {
    //   Player.play()
    //   this.next()
    // })
  }

  static getCurrentTime() {
    return Player.instance.seek();
  }

  static getPlayingStatus() {
    return Player.instance?.playing();
  }

  static createAnalyser() {
    const ctx = Howler.ctx;
    const audioSourceNode = ctx.createMediaElementSource(Player.instance._sounds[0]._node);
    let analyser = ctx.createAnalyser();
    audioSourceNode.connect(analyser);
    analyser.connect(Howler.ctx.destination);
    analyser.fftSize = BYTE_ARRAY_LENGTH;
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;
    const bufferLength = analyser.frequencyBinCount;
    Player.analyser = analyser;
    Player.dataArray = new Uint8Array(bufferLength);
  }

  static getAudioData() {
    Player.analyser.getByteFrequencyData(Player.dataArray);
    return Player.dataArray;
  }
}
