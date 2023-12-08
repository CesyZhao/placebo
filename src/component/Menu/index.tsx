import React, { useCallback, useMemo } from 'react';
import { menus, Menu as MenuEnum, MenuPathMap } from '../../defination/menu';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	updateUserFavorites,
	userAvatar, userProfile
} from '../../store/module/user';
import {Link, useNavigate, useLocation} from "react-router-dom";
import { isEmpty } from 'lodash';
import { getList, getUserPlaylist } from '../../api/music';
import { useMount } from 'ahooks';
import event from '../../util/event';
import { PlaceboEvent } from '../../defination/event';
import placebo from '../../model/Placebo';
import { type AvailableAlbum, SpecialAlbum } from '../../defination/music';
import { getUserLikeList } from '../../api/user';

const Menu = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const profile = useAppSelector(userProfile);
	const dispatch = useAppDispatch();
	const avatar = profile?.avatarUrl;
	const signed = !isEmpty(avatar);

	const { playing: playingSelector, currentAlbum: currentAlbumSelector } = placebo.music;

	const showSearch = useAppSelector(placebo.screen.showSearch);


	const currentAlbum = useAppSelector<AvailableAlbum>(currentAlbumSelector);
	const playing = useAppSelector<boolean>(playingSelector);



	const handleMenuClick = useCallback(async (e: any, menu: any) => {
		if (menu.path === MenuPathMap.get(MenuEnum.FM)) {
			e.preventDefault();
			if (currentAlbum.id === SpecialAlbum.FM) {
				if (!playing) {
					placebo.music.switchPlayingStatus();
				}
				placebo.screen.togglePanel(true);
			} else {
				await placebo.music.getPersonalFM();
				placebo.screen.togglePanel(true);
			}
		}
	}, [currentAlbum, playing]);


	const move = useCallback((direction: number) => {
		navigate(direction);
	}, []);

	const back = useCallback(() => {
    placebo.screen.setBackwardsStatus(true);
		move(-1);
	}, []);

	const forward = useCallback(() => {
		move(1);
	}, []);

	const canGoBack = useMemo(() => {
		return location.pathname !== '/';
	}, [location]);

	const canGoForward = useMemo(() => {
		const { length, state } = window.history;
		return state.idx < length - 1;
	}, [window.history, location]);

	const search = () => {
		placebo.screen.toggleSearch(!showSearch);
	};

	return (
		<div className={styles.menusWrapper}>
			<div className={styles.menus}>
				{
					menus.map(menu => {
						return (
							<Link to={menu.path} key={menu.key} onClick={(e) => { handleMenuClick(e, menu); }}>
								<div className={styles.menuItem}>
									{ menu.title }
								</div>
							</Link>
						);
					})
				}
			</div>
			<div className={styles.navigator}>
				<i className="iconfont icon-sousuo1" onClick={search}></i>
				<i className={`iconfont icon-you-copy ${canGoBack ? '' : styles.disabled}`} onClick={back}></i>
				<i className={`iconfont icon-you ${canGoForward ? '' : styles.disabled}`} onClick={forward}></i>
			</div>
			<div className={styles.avatarWrapper} >
				{
					signed
						? <Link to='/user'><img className={styles.userAvatar} src={avatar} alt=""/></Link>
						: <Link to='/login'><span className={styles.userAvatar} ><i className="iconfont icon-user11"></i></span></Link>
				}
			</div>
		</div>
	);
};

export default Menu;
