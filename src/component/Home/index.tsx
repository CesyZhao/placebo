import React, {useCallback, useState} from "react";
import { useMount, useRequest } from "ahooks";
import {getPersonalized} from "../../api/music";
import {Album, PersonalizedResponse} from "../../defination/music";
import styles from './style.module.scss';
import { take } from "lodash";
import {Link} from "react-router-dom";
import {humanNumber} from "../../util/number";
import Loading from '../Loading'

const Home = () => {

	const [albums, setAlbums] = useState<Album[]>([]);
	const { loading, run } = useRequest<PersonalizedResponse, any>(getPersonalized, {
		manual: true,
		onSuccess(result) {
			setAlbums(take(result.result, 10));
		}
	});

	useMount(() => {
		run();
	});

	const [currentIndex, setCurrentIndex] = useState(0);
	const getClassName = (index: number) => {
		if (currentIndex === index) {
			return styles.current;
		}
		const left = albums.length - index;
		if ((currentIndex === 0 && left === 1) || currentIndex - index === 1) {
			return styles.prev;
		}
		if ((currentIndex === 0 && left === 2) || (currentIndex === 1 && left === 1) || currentIndex - index === 2) {
			return styles.prev2;
		}
		if (currentIndex + 1 === index || (currentIndex === albums.length - 1 && index === 0)) {
			return styles.next;
		}
	};

	const handleIndexChange = (direction: number) => {
		let nextIndex = currentIndex + direction
		if (nextIndex < 0) {
			nextIndex = albums.length - 1
		} else if (nextIndex === albums.length) {
			nextIndex = 0
		}
		setCurrentIndex(nextIndex);
	}

	const currentAlbum = albums[currentIndex] || {};

	return (
		loading
		? <Loading></Loading>
		: <div className={styles.contentWrapper}>
			<div className={`${styles.switchButton} ${styles.prevButton}`} onClick={() => handleIndexChange(-1)}>
				<i className="iconfont icon-fanhui"></i>
			</div>
			<div className={styles.albumsWrapper}>
				{
					albums.map((album, index) => {
						return (
							<div key={album.id} className={`${styles.album} ${getClassName(index)}`}>
								<img src={album.picUrl} alt=""/>
							</div>
						)
					})
				}
			</div>
			<div className={styles.currentAlbum}>
				<div className={styles.name}>{ currentAlbum.name }</div>
				<div className={styles.info}>
					<span> <span className={styles.number}>{humanNumber(currentAlbum.playCount)}</span> PLAY COUNTS</span>
					<span> <span className={styles.number}>{humanNumber(currentAlbum.trackCount)}</span>  TRACKS</span>
				</div>
				<div className={styles.buttons}>
					<span className={styles.button}><span>PLAY NOW</span></span>
					<Link to={{ pathname: `/album/${currentAlbum.id}` }}>
            <span className={`${styles.button} ${styles.link}`}>
              ALBUM
            </span>
					</Link>
				</div>
			</div>
			<div className={`${styles.switchButton} ${styles.nextButton}`} onClick={() => handleIndexChange(1)}> <i className="iconfont icon-gengduo"></i>  </div>
		</div>
	)
};

export default Home;
