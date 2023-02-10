import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../Home';
import styles from './style.module.scss';
import Menu from "../Menu";
import Album from "../Album";
import Controller from "../Controller";
import PlayingPanel from "../PlayingPanel";
import Top from "../Top";
import User from "../User";
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group'

const RouteContainer = () => {

	const location = useLocation()

	return (
		<div className={styles.routeContainer}>
			<Menu></Menu>
			<div className={styles.content}>
				<SwitchTransition>
					<CSSTransition
						key={location.pathname}
						timeout={500}
						classNames="fade"
						unmountOnExit
					>
						<Routes>
							<Route path="/" element={<Home />}></Route>
							<Route path="/album/:id" element={<Album />}></Route>
							<Route path="/topList" element={<Top />}></Route>
							<Route path="/user" element={<User />}></Route>
						</Routes>
					</CSSTransition>
				</SwitchTransition>
			</div>
			<Controller></Controller>
			<PlayingPanel></PlayingPanel>
		</div>
	)
}

export default RouteContainer;
