import React, {useCallback, useMemo, useState} from "react";
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
	updatePlayingList,
	updatePlayingMusic,
	playingList,
	updatePlayingAlbum, playingAlbum
} from "../../store/module/controller";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

const Album = () => {
	const { id = 0 } = useParams();
	const music = useAppSelector(playingMusic) || {};
	const currentAlbum = useAppSelector(playingAlbum) || {};

	const [album, setAlbum] = useState({} as PlayList);
	const [list, setList] = useState([] as AvailableMusic[]);

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

	const isCurrentList = useMemo(() => {
		return album.id === currentAlbum.id
	}, [album, currentAlbum])

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
						<div className={styles.right}>
							<div className={styles.creator}>
              <span className={styles.creatorAvatar}>
	              <LazyImage url={album.creator.avatarUrl}></LazyImage>
                {/*<img src={album.creator.avatarUrl}></img>*/}
              </span>
								<span className={styles.creatorNickname}>{album.creator.nickname}</span>
							</div>
							<div className={styles.description}> {album.description} </div>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.name}> {album.name} </div>
						<div className={styles.tags}>
							{
								album.tags.length > 0 &&
								<div> {album.tags.join(' ')} </div>
							}
						</div>
						<div> <span className={styles.number}>{humanNumber(album.playCount)}</span> PLAYED  <span className={styles.number}>{ humanNumber(album.subscribedCount) }</span> SUBSCRIBED</div>
						<div className={styles.operations}>
							<div > <i className={`iconfont ${album.subscribed ? 'icon-yishoucang_huaban1' : 'icon-shoucang'}`}></i> </div>
							<div className={styles.playAll}> <i className={`iconfont ${isCurrentList ? 'icon-pause' : 'icon-24gl-play'}`}></i> </div>
							<div > <i className="iconfont icon-sousuo1"></i> </div>
						</div>
					</div>
				</div>
				<div className={styles.listWrapper}>
					<List currentSongId={music.id} list={list} handleSongPlay={handleSongPlay}></List>
				</div>
			</div>
		: <div></div>
	)
}

export default Album;