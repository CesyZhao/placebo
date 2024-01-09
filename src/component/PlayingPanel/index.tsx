import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {isEmpty} from "lodash";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {playingMusic} from "../../store/module/controller";
import {CSSTransition} from "react-transition-group";
import Player from "../Controller/Player";
import styles from "./style.module.scss";
import { AvailableAlbum, SpecialAlbum, SwitchDirection } from '../../defination/music'
import {Wave} from "../../util/canvas";
import {useMount} from "ahooks";
import Lyric from "../Lyric";
import placebo from '../../model/Placebo';
import LazyImage from '../LazyImage';


const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 508;
const PlayingPanel = () => {

  const { currentAlbum: currentAlbumSelector } = placebo.music;

  const music = useAppSelector(playingMusic) || {};
	const playing = useAppSelector(placebo.music.playing);
	const showPlayingPanel: boolean = useAppSelector(placebo.screen.showPanel);
	const [lyric, setLyric] = useState('');
	const [translatedLyric, setTranslatedLyric] = useState('');

  const currentAlbum = useAppSelector<AvailableAlbum>(currentAlbumSelector) || {};
  const isPersonalFM = useMemo(() => {
    return currentAlbum.id === SpecialAlbum.FM;
  }, [currentAlbum]);

	const dismiss = useCallback(() => {
		placebo.screen.togglePanel(false);
	}, []);

	const getLyricById = useCallback(async (id: number) => {
		let lyric, translatedLyric;

		try {
			const { lyric: l = '', translatedLyric: t = '' } = await placebo.music.getLyric(id);
			lyric = l;
			translatedLyric = t;
		} catch (e) {
			lyric = '';
			translatedLyric = '';
		}
		setLyric(lyric);
		setTranslatedLyric(translatedLyric);
	}, []);

	useMount(() => {
		dismiss();
	});

	const ref = useRef<HTMLCanvasElement | null>(null);
	useEffect(() => {
		if (showPlayingPanel) {
			const context = ref.current?.getContext('2d');
			const wave = new Wave(placebo.music.player, context as any);
			const commonOptions = {
				lineColor: "transparent",
				lineWidth: 0,
				count: 20,
				rounded: true,
				mirroredX: true
			};
			wave.addAnimation(new wave.animations.Glob({
				fillColor: { gradient: ["#9B30FF", "#7BA3FF", "#57E1E7"], rotate: 70 },
				glow: { strength: 15, color: "#7BA3FF" },
				diameter: 160,
				...commonOptions,
				count: 45
			}));
			wave.addAnimation(new wave.animations.Glob({
				fillColor: { gradient: ["#57E1E7", "#7BA3FF", "#9B30FF"], rotate: 90 },
				glow: { strength: 5, color: "#9B30FF" },
        diameter: 160,
				...commonOptions,
				count: 25
			}));
		}
	}, [showPlayingPanel]);

	useEffect(() => {
		showPlayingPanel && getLyricById(music.id);
	}, [music, showPlayingPanel]);

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
	                      {/* { */}
	                      {/*  // this.state.mode === '歌词模式' && */}
	                      {/* } */}
						    {/* <i className={`iconfont ${favorites.get(song.id) ? 'icon-iosheart' : 'icon-iosheartoutline'}`} onClick={() => this.likeSong(song)}></i> */}
						    <i className={`iconfont icon-ios-rewind ${isPersonalFM ? styles.disabled : ''}`} onClick={() => { placebo.music.prev(); }}></i>
						    <i className={`iconfont ${playing ? 'icon-ios-pause' : 'icon-iosplay'}`} onClick={() => { placebo.music.switchPlayingStatus(); }}></i>
						    <i className="iconfont icon-ios-fastforward" onClick={() => { placebo.music.next(); }}></i>
	                      {/* <Link to="/comment" onClick={this.dismiss}><i className="iconfont icon-aui-icon-comment"></i></Link> */}
					    </div>
					    <div className={styles.info}>
						    {/* <Link to={this.getFromUrl(song)} onClick={this.dismiss}> 来源: {song.from} </Link> */}
					    </div>
				    </div>
				    <div className={styles.lyricWrapper}>
							<div className={styles.songInfo}>
								<h2> {music.name} </h2>
								<span>Artist: {music.artists.map(artist => artist.name).join('/')} </span>
							</div>
					    <Lyric lyric={lyric} translatedLyric={translatedLyric}></Lyric>
				    </div>
			    </div>
			    <div className={styles.blurCover}>
						<LazyImage url={music.album.picUrl}></LazyImage>
			    </div>
		    </div>
	    </CSSTransition>
	    : <div></div>
  );
};

export default PlayingPanel;
