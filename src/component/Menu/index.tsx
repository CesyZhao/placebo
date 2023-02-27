import React, { useCallback, useMemo } from 'react'
import { menus, Menu as MenuEnum, MenuPathMap } from '../../defination/menu'
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	updateUserFavorites,
	userAvatar, userProfile
} from '../../store/module/user'
import {Link, useNavigate, useLocation} from "react-router-dom";
import { isEmpty } from 'lodash';
import { getList, getUserPlaylist } from '../../api/music'
import { useMount } from 'ahooks'
import event from '../../util/event'
import { PlaceboEvent } from '../../defination/event'
import placebo from '../../model/Placebo'

const Menu = () => {
	const navigate = useNavigate();
	const location = useLocation();
	// const avatar = useAppSelector(userAvatar);
	const profile = useAppSelector(userProfile);
	const dispatch = useAppDispatch()
	const avatar = profile?.avatarUrl;
	const signed = !isEmpty(avatar);


	const handleMenuClick = useCallback((e: any, menu: any) => {
		if (menu.path === MenuPathMap.get(MenuEnum.FM)) {
			e.preventDefault()
			placebo.screen.togglePanel(true)
		}
	}, [])


	const getFavoriteList = useCallback(async (id: number) => {
		try {
			// @ts-ignore
			const { playlist } = await getUserPlaylist(id);
			const list = playlist[0]
			const { songs } = await getList(list.id);
			const favorites = songs.map((s: any) => s.id);
			dispatch(updateUserFavorites(favorites))
		} catch (e) {
		}
	}, [])

	const move = useCallback((direction: number) => {
		navigate(direction)
	}, [])

	const back = useCallback(() => {
		move(-1)
	}, [])

	const forward = useCallback(() => {
		move(1)
	}, [])

	const canGoBack = useMemo(() => {
		return location.pathname !== '/'
	}, [location])

	const canGoForward = useMemo(() => {
		const { length, state } = window.history
		return state < length - 1;
	}, [window.history])

	useMount(() => {
		getFavoriteList(profile.userId)
	})

	return (
		<div className={styles.menusWrapper}>
			<div className={styles.menus}>
				{
					menus.map(menu => {
						return (
							<Link to={menu.path} key={menu.key} onClick={(e) => handleMenuClick(e, menu)}>
								<div className={styles.menuItem}>
									{ menu.title }
								</div>
							</Link>
						)
					})
				}
			</div>
			<div className={styles.navigator}>
				<i className={`iconfont icon-you-copy ${canGoBack ? '' : styles.disabled}`} onClick={back}></i>
				<i className="iconfont icon-you" onClick={forward}></i>
			</div>
			<div className={styles.avatarWrapper} >
				{
					signed
						? <Link to='/user'><img className={styles.userAvatar} src={avatar} alt=""/></Link>
						: <Link to='/login'><span className={styles.userAvatar} ><i className="iconfont icon-user11"></i></span></Link>
				}
			</div>
		</div>
	)
};

export default Menu;
