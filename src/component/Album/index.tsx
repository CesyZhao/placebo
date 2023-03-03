import React, { useCallback, useMemo, useRef, useState } from 'react'
import styles from "./style.module.scss";
import { useParams } from "react-router-dom";
import { useMount } from "ahooks";
import {getAlbum, getList} from "../../api/music";
import { AvailableAlbum, AvailableMusic, PlayList } from '../../defination/music'
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
import Loading from '../Loading'
import placebo from "../../model/Placebo";
import { Profile } from '../../defination/user';

const Album = () => {
  const { currentMusic, playing: playingSelector, currentAlbum: currentAlbumSelector } = placebo.music;
  const { userProfile } = placebo.user;

	const { id = 0 } = useParams();

  const music = useAppSelector<AvailableMusic>(currentMusic) || {};
  const playing = useAppSelector<boolean>(playingSelector);
  const currentAlbum = useAppSelector<AvailableAlbum>(currentAlbumSelector) || {};
  const profile = useAppSelector<Profile>(userProfile) || {};

	const listRef = useRef<any>(null);

	const [album, setAlbum] = useState({} as PlayList);
	const [list, setList] = useState([] as AvailableMusic[]);
	const [loading, setLoading] = useState(false);

	const isOwner = useMemo(() => {
		return profile?.userId === album?.creator?.userId;
	}, [album, profile])

	const handleSearch = useCallback(() => {
		listRef.current.search(true)
	}, [])

	const getSongList = useCallback( async () => {
		setLoading(true);
		try {
			const { album, list } = await placebo.music.getAlbumDetail(+id);
			setAlbum(album);
			const formattedList = formatList(list);
			setList(formattedList);
		} catch (e) {
			setList([]);
		}
		setLoading(false);
	}, [])

	const dispatch = useAppDispatch();

	const handleSongPlay = useCallback((index: number) => {
		const nextAlbum = { playlist: list, id: album.id, name: album.name }
		placebo.music.updatePlayingAlbum(nextAlbum, index)
	}, [ list ])

	const handleAlbumPlay = useCallback(() => {
		if (!isCurrentList) {
			handleSongPlay(0);
		}
		placebo.music.switchPlayingStatus();
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
			album.id && !loading ?
			<div className={styles.album}>
				<div className={styles.info}>
					<div className={styles.top}>
						<div className={styles.cover}>
							<LazyImage url={album.coverImgUrl}></LazyImage>
						</div>
						<div className={styles.name}> {album.name} </div>
					</div>
					<div className={styles.detail}>
						<div className={styles.creator}>
						  <span className={styles.creatorAvatar}>
						    <LazyImage url={album.creator.avatarUrl}></LazyImage>
						  </span>
								<span className={styles.creatorNickname}>{album.creator.nickname}</span>
						</div>
						<div className={styles.tags}>
							{
								album.tags.length > 0 &&
								<div> {album.tags.join(' ')} </div>
							}
						</div>
						<div className={styles.playCount}> <span className={styles.number}>{humanNumber(album.playCount)}</span> PLAYED  <span className={styles.number}>{ humanNumber(album.subscribedCount) || 0 }</span> SUBSCRIBED</div>
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
		: <Loading></Loading>
	)
}

export default Album;
