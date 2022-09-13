import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import styles from './style.module.scss';
import Menu from "../Menu";
import Album from "../Album";
import Controller from "../Controller";
import PlayingPanel from "../PlayingPanel";
import Top from "../Top";
import User from "../User";

const RouteContainer = () => {
	return (
		<div className={styles.routeContainer}>
			<Menu></Menu>
			<div className={styles.content}>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/album/:id" element={<Album />}></Route>
					<Route path="/topList" element={<Top />}></Route>
					<Route path="/user" element={<User />}></Route>
				</Routes>
			</div>
			<Controller></Controller>
			<PlayingPanel></PlayingPanel>
		</div>
	)
}

export default RouteContainer;