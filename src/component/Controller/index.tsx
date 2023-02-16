import React, {useCallback, useEffect, useMemo, useState} from "react";
import styles from "./styles.module.scss";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { mode, playingMusic, switchMusic, updateMode, updatePlayingStatus, playingStatus } from '../../store/module/controller'
import {formatDuration} from "../../util/number";
import { getSongUrl} from "../../api/music";
import Player from "./Player";
import {ModeList, SwitchDirection} from "../../defination/music";
import { userFavorites } from '../../store/module/user';
import event from '../../util/event'
import { PlaceboEvent } from '../../defination/event'
import placebo from '../../model/Placebo'


const Controller = () => {

	const [type, setType] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const dispatch = useAppDispatch();

	const music = useAppSelector(placebo.music.currentMusic) || {};
	const playing: Boolean = useAppSelector(placebo.music.playing) || false;
	const favorites = useAppSelector(userFavorites) || [];
	const currentMode = useAppSelector(mode);

	console.log(playing, 'playing++++++++++++')


	const currentModeIcon = useMemo(() => {
		return ModeList.get(currentMode);
	}, [currentMode])

	useEffect(() => {
		setCurrentTime(0);
		placebo.music.playMusicById(music.id);
	}, [music]);

	const switchMode = () => {
		dispatch(updateMode())
	}

	const onPause = useCallback(() => {
		placebo.music.switchPlayingStatus();
	}, []);

	const liked = useMemo(() => {
		const result = favorites.includes(+music.id)
		return result
	}, [favorites, music])


	useEffect(() => {
		event.on(PlaceboEvent.UpdatePlayingStatus, () => onPause())

		const timer = setInterval(() => {
			setCurrentTime(placebo.music.seekTime())
		}, 1000)

		return () => {
			event.off(PlaceboEvent.UpdatePlayingStatus)

			clearInterval(timer)

		}
	}, [onPause])


	return (
		<div className={styles.controller}>
			<div className={styles.progressBar}>
				<div className={`${styles.progress} ${playing ? styles.playing : styles.paused}`} style={{ animationDuration: `${music.duration}ms`, animationName: `${type ? styles.play : styles.replay}` }}></div>
			</div>
			<div className={styles.cover}>
				<img alt="playing-cover" src={music?.album?.picUrl.replace('100y100', '965y965')}></img>
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
					<i className="iconfont icon-ios-rewind" onClick={() => dispatch(switchMusic(SwitchDirection.Prev))}></i>
					<i className={`iconfont ${playing ? 'icon-ios-pause' : 'icon-iosplay'}`} onClick={onPause}></i>
					<i className="iconfont icon-ios-fastforward" onClick={() => dispatch(switchMusic(SwitchDirection.Next))}></i>
				</div>
				<div className={styles.controls}>
					<i className={`iconfont ${liked ? 'icon-heart1' : 'icon-heart'}`} ></i>
					<i className={`iconfont ${currentModeIcon}`} onClick={switchMode}></i>
					<span onClick={() => placebo.screen.togglePanel(true)}>LRC</span>
				</div>
			</div>
		</div>
	)
}

export default Controller;
