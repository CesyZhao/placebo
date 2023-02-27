import React, {useCallback, useEffect, useMemo, useState} from "react";
import styles from "./styles.module.scss";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { switchMusic } from '../../store/module/controller'
import {formatDuration} from "../../util/number";
import { AvailableMusic, ModeList, SwitchDirection } from '../../defination/music'
import placebo from '../../model/Placebo'
import LazyImage from '../LazyImage'


const Controller = () => {

  const {
    currentMusic: currentMusicSelector,
    playing: playingSelector,
    favorites: favoritesSelector,
    playMode
  } = placebo.music;

	const [currentTime, setCurrentTime] = useState(0);
  const [type, setType] = useState(1);
	const dispatch = useAppDispatch();

  const music = useAppSelector<AvailableMusic>(currentMusicSelector) || {};
  const playing = useAppSelector(playingSelector) || false;
  const favorites = useAppSelector(favoritesSelector) || [];
  const currentMode = useAppSelector(playMode);

	const currentModeIcon = useMemo(() => {
		return ModeList.get(currentMode);
	}, [currentMode])

	const liked = useMemo(() => {
		const result = favorites.includes(+music.id)
		return result
	}, [favorites, music])

	const switchMode = useCallback(() => {
		placebo.music.switchPlayMode();
	}, [])

	const onPause = useCallback(() => {
		placebo.music.switchPlayingStatus();
	}, []);


	useEffect(() => {
		setCurrentTime(0);
		setType(0);
		placebo.music.playMusicById(music.id)
			.then(() => {
				setType(1);
			});
	}, [music]);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(placebo.music.seekTime());
		}, 1000);

    return () => {
      clearInterval(timer);
    }
	}, [])

	return (
			music.id
			?
			<div className={styles.controller}>
				<div className={styles.progressBar}>
					<div className={`${styles.progress} ${playing ? styles.playing : styles.paused}`} style={{ animationDuration: `${music.duration}ms`, animationName: `${type ? styles.play : styles.replay}` }}></div>
				</div>
				<div className={styles.cover}>
					{/*<img alt="playing-cover" src={music?.album?.picUrl.replace('100y100', '965y965')} onLoad={handleImageLoad}></img>*/}
					<LazyImage url={music?.album?.picUrl}></LazyImage>
				</div>
				<div className={styles.contents}>
					<div className={styles.coverWrapper}>
						<img src={music?.album?.picUrl} alt=""/>
						<div className={styles.info}>
							<div>
								<span>{music.name}</span>
								-
								<span> {music?.artists?.map(artist => artist.name).join('/')} </span>
							</div>
							<div>
							<span className="pc-controller-time">
                {` ${formatDuration(currentTime * 1000)} / ${formatDuration(music.duration)} `}
              </span>
							</div>
						</div>
					</div>
					<div className={styles.ops}>
						<i className="iconfont icon-ios-rewind" onClick={() => placebo.music.prev()}></i>
						<i className={`iconfont ${playing ? 'icon-ios-pause' : 'icon-iosplay'}`} onClick={onPause}></i>
						<i className="iconfont icon-ios-fastforward" onClick={() => placebo.music.next()}></i>
					</div>
					<div className={styles.controls}>
						<i className={`iconfont ${liked ? 'icon-heart1' : 'icon-heart'}`} ></i>
						<i className={`iconfont ${currentModeIcon}`} onClick={switchMode}></i>
						<span onClick={() => placebo.screen.togglePanel(true)}>LRC</span>
					</div>
				</div>
			</div>
			:
			<div className={styles.noMusic}></div>
	)
}

export default Controller;
