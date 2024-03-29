import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { formatDuration } from '../../util/number'
import { type AvailableAlbum, type AvailableMusic, Mode, ModeList, SpecialAlbum } from '../../defination/music'
import placebo from '../../model/Placebo'
import LazyImage from '../LazyImage'
import { useUnmount } from 'ahooks'


const Controller = () => {

	const {
		currentMusic: currentMusicSelector,
		currentAlbum: currentAlbumSelector,
		playing: playingSelector,
		favorites: favoritesSelector,
		playMode
	} = placebo.music;

	const [currentTime, setCurrentTime] = useState(0);
	const [type, setType] = useState(1);
	const dispatch = useAppDispatch();

	const music = useAppSelector<AvailableMusic>(currentMusicSelector) || {};
	const currentAlbum = useAppSelector<AvailableAlbum>(currentAlbumSelector) || {};
	const playing = useAppSelector(playingSelector) || false;
	const favorites = useAppSelector(favoritesSelector) || [];
	const currentMode = useAppSelector(playMode);

	const currentModeIcon = useMemo(() => {
		return ModeList.get(currentMode);
	}, [currentMode]);

	const liked = useMemo(() => {
		// @ts-expect-error
		const result = favorites.includes(+music.id);
		return result;
	}, [favorites, music]);

	const isPersonalFM = useMemo(() => {
		return currentAlbum.id === SpecialAlbum.FM;
	}, [currentAlbum]);

	const switchMode = useCallback(() => {
		placebo.music.switchPlayMode();
	}, []);

	const onPause = useCallback(() => {
		placebo.music.switchPlayingStatus();
	}, []);

	const handleNext = useCallback(() => {
		const { playlist, id } = currentAlbum;
		if (id === SpecialAlbum.FM) {
			const index = playlist.findIndex(s => s.id === music.id);
			if (index === playlist.length - 1) {
				placebo.music.getPersonalFM();
				return;
			}
		}
		placebo.music.next();
	}, [currentAlbum, music]);

	const handleProgressClick = useCallback((e: any) => {
		let { pageX, target, currentTarget } = e;
		if (currentTarget !== target) {
			target = target.parentNode;
		}
		const { clientWidth } = target;
		const percent = pageX / clientWidth;
		const { duration } = music;
		const currentTime = Math.round(duration / 1000 * percent);
		placebo.music.seekTime(currentTime);

	}, [music]);

	const handleLikeMusic = useCallback(() => {
		placebo.user.likeMusic(music.id);
	}, [music]);


	useEffect(() => {
		setCurrentTime(0);
		setType(0);
		placebo.music.playMusicById(music.id)
			.then(() => {
				setType(1);
			});
	}, [music]);

	useEffect(() => {
		placebo.user.getLikedSongIds();

		const timer = setInterval(() => {
			setCurrentTime(placebo.music.seekTime());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	useUnmount(() => {
		placebo.music.unload();
	});

	return (
		music.id
			?
			<div className={styles.controller}>
				<div className={styles.progressBar} onClick={handleProgressClick}>
					<div className={styles.progress} style={{ width: currentTime * 1000 / music.duration * 100 + '%'  }}></div>
				</div>
				<div className={styles.cover}>
					{/* <img alt="playing-cover" src={music?.album?.picUrl.replace('100y100', '965y965')} onLoad={handleImageLoad}></img> */}
					<LazyImage url={music?.album?.picUrl}></LazyImage>
				</div>
				<div className={styles.contents}>
					<div className={styles.coverWrapper}>
						<img src={music?.album?.picUrl} alt="" />
						<div className={styles.info}>
							<div>
								{/* <marquee behavior="alternate"> */}
								{/*	*/}
								{/* </marquee> */}
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
						<i className={`iconfont icon-ios-rewind ${isPersonalFM ? styles.disabled : ''}`} onClick={() => { placebo.music.prev(); }}></i>
						<i className={`iconfont ${playing ? 'icon-ios-pause' : 'icon-iosplay'}`} onClick={onPause}></i>
						<i className="iconfont icon-ios-fastforward" onClick={handleNext}></i>
					</div>
					<div className={styles.controls}>
						<i className={`iconfont ${liked ? 'icon-heart1' : 'icon-heart'}`} onClick={handleLikeMusic}></i>
						{
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							!isPersonalFM && <i className={`iconfont ${currentModeIcon}`} onClick={switchMode}></i>
						}
						<span onClick={() => { placebo.screen.togglePanel(true); }}>LRC</span>
					</div>
				</div>
			</div>
			:
			<div className={styles.noMusic}></div>
	);
};

export default Controller;
