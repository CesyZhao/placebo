import React, {useCallback} from "react";
import { menus } from "../../defination/menu";
import styles from './style.module.scss';
import { useAppSelector } from '../../store/hooks';
import {
	userProfile
} from '../../store/module/user';
import {Link, useNavigate} from "react-router-dom";
import { isEmpty } from 'lodash';

const Menu = () => {
	const navigate = useNavigate();
	const user = useAppSelector(userProfile);
	const signed = !isEmpty(user);
	const handleAvatarClick = useCallback(() => {
		!signed && navigate('/login');
	}, []);
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
						? <img src={user.avatarUrl} alt=""/>
						: <span className={styles.userAvatar} ><i className="iconfont icon-user11"></i></span>
				}
			</div>
		</div>
	)
};

export default Menu;