import { Howl, HowlCallback, Howler } from 'howler';

const BYTE_ARRAY_LENGTH = 4096;


class Player {
  player: any;

  analyser!: any;
  dataArray!: any;
  onPlay!: HowlCallback;

  onEnd!: HowlCallback;
  initMusic(url: string) {
    this.player?.unload();

    this.player = new Howl({
      src: [url],
      html5: true,
      preload: true,
      format: ['mp3'],
      onload: this.play.bind(this),
      onend: this.onEnd.bind(this),
      onplay: this.onPlay.bind(this)
    })
  }

  play() {
    this.player?.play();
    if (!this.analyser) {
      this.createAnalyser();
    }
  }

  pause() {
    this.player.pause();
  }

  getCurrentTime() {
    return this.player?.seek();
  }

  getPlayingStatus() {
    return this.player?.playing();
  }

  createAnalyser() {
    const ctx = Howler.ctx;
    const audioSourceNode = ctx.createMediaElementSource(this.player?._sounds?.[0]?._node);
    let analyser = ctx.createAnalyser();
    audioSourceNode.connect(analyser);
    analyser.connect(ctx.destination);
    analyser.fftSize = BYTE_ARRAY_LENGTH;
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;
    const bufferLength = analyser.frequencyBinCount;
    this.analyser = analyser;
    this.dataArray = new Uint8Array(bufferLength);
  }

  getAudioData() {
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }

  unload() {
    return this.player?.unload();
  }
}

export default Player;
