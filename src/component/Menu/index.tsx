import React, {useCallback} from "react";
import { menus } from "../../defination/menu";
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	updateUserFavorites,
	userAvatar, userProfile
} from '../../store/module/user'
import {Link, useNavigate} from "react-router-dom";
import { isEmpty } from 'lodash';
import { getList, getUserPlaylist } from '../../api/music'
import { useMount } from 'ahooks'

const Menu = () => {
	const navigate = useNavigate();
	// const avatar = useAppSelector(userAvatar);
	const profile = useAppSelector(userProfile);
	const dispatch = useAppDispatch()
	const avatar = profile?.avatarUrl
	const signed = !isEmpty(avatar);


	const handleAvatarClick = useCallback(() => {
		navigate(signed ? '/user' : '/login');
	}, [signed]);


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

	useMount(() => {
		getFavoriteList(profile.userId)
	})

	return (
		<div className={styles.menusWrapper}>
			<div className={styles.menus}>
				{
					menus.map(menu => {
						return (
							<Link to={menu.path} key={menu.key}>
								<div className={styles.menuItem}>
									{ menu.title }
								</div>
							</Link>
						)
					})
				}
			</div>
			<div className={styles.avatarWrapper} onClick={handleAvatarClick}>
				{
					signed
						? <img className={styles.userAvatar} src={avatar} alt=""/>
						: <span className={styles.userAvatar} ><i className="iconfont icon-user11"></i></span>
				}
			</div>
		</div>
	)
};

export default Menu;
