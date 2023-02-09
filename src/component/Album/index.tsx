import React, { useCallback, useMemo, useRef, useState } from 'react'
import styles from "./style.module.scss";
import { useParams } from "react-router-dom";
import { useMount } from "ahooks";
import {getAlbum, getList} from "../../api/music";
import {AvailableMusic, PlayList} from "../../defination/music";
import { humanNumber } from "../../util/number";
import LazyImage from "../LazyImage";
import List from "../List";
import { formatList } from "../../util/audio";
import {
	playingMusic,
	updatePlayingMusic,
	updatePlayingAlbum, playingAlbum, playingStatus
} from '../../store/module/controller'
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import event from '../../util/event'
import { userProfile } from '../../store/module/user'

const Album = () => {
	const { id = 0 } = useParams();
	const music = useAppSelector(playingMusic) || {};
	const playing = useAppSelector(playingStatus);
	const currentAlbum = useAppSelector(playingAlbum) || {};
	const listRef = useRef<any>(null);

	const profile = useAppSelector(userProfile) || {};

	const [album, setAlbum] = useState({} as PlayList);
	const [list, setList] = useState([] as AvailableMusic[]);

	const isOwner = useMemo(() => {
		return profile?.userId === album?.creator?.userId;
	}, [album, profile])

	const handleSearch = useCallback(() => {
		listRef.current.search(true)
	}, [])

	const getSongList = useCallback( async () => {
		try {
			const { playlist: album } = await getAlbum(+id);
			setAlbum(album);
			const { songs } = await getList(album.id);
			const formattedList = formatList(songs);
			setList(formattedList);
		} catch (e) {
			// Todo
		}
	}, [])

	const dispatch = useAppDispatch();
	const handleSongPlay = useCallback((song: AvailableMusic) => {
		dispatch(updatePlayingMusic(song));
		dispatch(updatePlayingAlbum({ playlist: list, id: album.id, name: album.name}));
	}, [list])

	const handleAlbumPlay = useCallback(() => {
		if (!isCurrentList) {
			dispatch(updatePlayingMusic(list[0]));
			dispatch(updatePlayingAlbum({ playlist: list, id: album.id, name: album.name}));
		}
		event.emit('placebo.updatePlayingStatus');
	}, [list, playing])

	const isCurrentList = useMemo(() => {
		return album.id === currentAlbum.id
	}, [album, currentAlbum,])

	const isCurrentListPlaying = useMemo(() => {
		return isCurrentList && playing;
	}, [isCurrentList, playing])

	useMount(() => {
		getSongList();
	})

	return (
			album.id ?
			<div className={styles.album}>
				<div className={styles.info}>
					<div className={styles.top}>
						<div className={styles.cover}>
							<LazyImage url={album.coverImgUrl}></LazyImage>
						</div>
						<div className={styles.name}> {album.name} </div>
						{/*<LazyImage url={album.creator.avatarUrl}></LazyImage>*/}
						{/*<div className={styles.right}>*/}
						{/*	<div className={styles.creator}>*/}
            {/*  <span className={styles.creatorAvatar}>*/}
	          {/*    <LazyImage url={album.creator.avatarUrl}></LazyImage>*/}
            {/*    /!*<img src={album.creator.avatarUrl}></img>*!/*/}
            {/*  </span>*/}
						{/*		<span className={styles.creatorNickname}>{album.creator.nickname}</span>*/}
						{/*	</div>*/}
						{/*	<div className={styles.description}> {album.description} </div>*/}
						{/*</div>*/}
					</div>
					<div className={styles.detail}>
						<div className={styles.creator}>
						  <span className={styles.creatorAvatar}>
						    <LazyImage url={album.creator.avatarUrl}></LazyImage>
						    {/*<img src={album.creator.avatarUrl}></img>*/}
						  </span>
								<span className={styles.creatorNickname}>{album.creator.nickname}</span>
						</div>
						<div className={styles.tags}>
							{
								album.tags.length > 0 &&
								<div> {album.tags.join(' ')} </div>
							}
						</div>
						<div> <span className={styles.number}>{humanNumber(album.playCount)}</span> PLAYED  <span className={styles.number}>{ humanNumber(album.subscribedCount) || 0 }</span> SUBSCRIBED</div>
						<div className={styles.operations}>
							<div className={`${isOwner ? styles.disabled : ''}`}> <i className={`iconfont ${album.subscribed ? 'icon-yishoucang_huaban1' : 'icon-shoucang'}`}></i> </div>
							<div className={styles.playAll} onClick={handleAlbumPlay}> <i className={`iconfont ${isCurrentListPlaying ? 'icon-pause' : 'icon-24gl-play'}`}></i> </div>
							<div onClick={handleSearch}> <i className="iconfont icon-sousuo1"></i> </div>
						</div>
					</div>
				</div>
				<div className={styles.listWrapper}>
					<List ref={listRef} currentSongId={music.id} list={list} handleSongPlay={handleSongPlay}></List>
				</div>
			</div>
		: <div></div>
	)
}

export default Album;
