import React, {useCallback} from "react";
import { menus } from "../../defination/menu";
import styles from './style.module.scss';
import { useAppSelector } from '../../store/hooks';
import {
	userAvatar
} from '../../store/module/user';
import {Link, useNavigate} from "react-router-dom";
import { isEmpty } from 'lodash';

const Menu = () => {
	const navigate = useNavigate();
	const avatar = useAppSelector(userAvatar);
	const signed = !isEmpty(avatar);
	const handleAvatarClick = useCallback(() => {
		navigate(signed ? '/user' : '/login');
	}, [signed]);
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