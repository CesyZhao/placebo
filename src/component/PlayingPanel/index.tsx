import React, {useCallback, useEffect, useRef} from "react";
import {isEmpty} from "lodash";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {playingMusic} from "../../store/module/controller";
import {CSSTransition} from "react-transition-group";
import Player from "../Controller/Player";
import styles from "./style.module.scss";
import {SwitchDirection} from "../../defination/music";
import {showPanel, togglePanel} from "../../store/module/app";
import {Wave} from "../../util/canvas";
import {useMount} from "ahooks";
import Lyric from "../Lyric";
import placebo from '../../model/Placebo'


const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 548;
const PlayingPanel = () => {

  const music = useAppSelector(playingMusic) || {};
	const playing = Player.getPlayingStatus();
	const showPlayingPanel = useAppSelector(showPanel);

	const dismiss = useCallback(() => {
		placebo.screen.hidePlayingPanel();
	}, []);

	const handleSwitch = useCallback((mode: SwitchDirection) => {

	}, []);

	const togglePlaying = useCallback(() => {

	}, []);

	useMount(() => {
		dismiss();
	})

	const ref = useRef<HTMLCanvasElement | null>(null);
	useEffect(() => {
		if (showPlayingPanel) {
			const context = ref.current?.getContext('2d');
			const wave = new Wave(Player, context as any);
			const commonOptions = {
				lineColor: "transparent",
				lineWidth: 0,
				count: 20,
				rounded: true,
				frequencyBand: "highs",
				mirroredX: true
			}
			// @ts-ignore
			wave.addAnimation(new wave.animations.Glob({
				fillColor: { gradient: ["#9B30FF", "#7BA3FF", "#57E1E7"], rotate: 70 },
				glow: { strength: 35, color: "#7BA3FF" },
				diameter: 220,
				...commonOptions
			}));
			// @ts-ignore
			wave.addAnimation(new wave.animations.Glob({
				fillColor: { gradient: ["#57E1E7", "#7BA3FF", "#9B30FF"], rotate: 90 },
				glow: { strength: 35, color: "#9B30FF" },
        diameter: 160,
				...commonOptions,
				count: 25
			}));
		}
	}, [showPlayingPanel])

  return (
    !isEmpty(music)
    ? <CSSTransition in={showPlayingPanel} timeout={300} unmountOnExit classNames="playing-panel">
		    <div className={styles.playingPanel}>
			    <div className={styles.currentSongWrapper}>
				    <div className={`${styles.iconDismiss} iconfont icon-fanhui`} onClick={dismiss}></div>
				    <div className={styles.visualizorWrapper}>
					    <canvas ref={ref} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
					    <div className={styles.imgWrapper}>
                <div className={styles.img} >
                  <img src={music.album.picUrl.replace('100y100', '200y200')} alt="ablum"/>
                </div>
              </div>
					    <div className={styles.toolbar}>
	                      {/*{*/}
	                      {/*  // this.state.mode === '歌词模式' &&*/}
	                      {/*}*/}
						    {/*<i className={`iconfont ${favorites.get(song.id) ? 'icon-iosheart' : 'icon-iosheartoutline'}`} onClick={() => this.likeSong(song)}></i>*/}
						    <i className="iconfont icon-ios-rewind" onClick={() => handleSwitch(SwitchDirection.Prev)}></i>
						    <i className={`iconfont ${playing ? 'icon-ios-pause' : 'icon-iosplay'}`} onClick={togglePlaying}></i>
						    <i className="iconfont icon-ios-fastforward" onClick={() => handleSwitch(SwitchDirection.Next)}></i>
	                      {/* <Link to="/comment" onClick={this.dismiss}><i className="iconfont icon-aui-icon-comment"></i></Link> */}
					    </div>
					    <div className={styles.info}>
						    {/*<Link to={this.getFromUrl(song)} onClick={this.dismiss}> 来源: {song.from} </Link>*/}
					    </div>
				    </div>
				    <div className={styles.lyricWrapper}>
					    <Lyric music={music}></Lyric>
				    </div>
			    </div>
			    <div className={styles.blurCover}>
				    <img src={music.album.picUrl.replace('100y100', '964y608')} alt="ablum"></img>
			    </div>
		    </div>
	    </CSSTransition>
	    : <div></div>
  );
};

export default PlayingPanel;
