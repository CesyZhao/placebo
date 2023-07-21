import React, { createRef } from 'react';
import { Routes, Route, useLocation, useOutlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Home';
import styles from './style.module.scss';
import Menu from "../Menu";
import Album from "../Album";
import Controller from "../Controller";
import PlayingPanel from "../PlayingPanel";
import Top from "../Top";
import User from "../User";
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group';
import Login from '../Login';
import Search from '../Search';



const routes = [
	{ path: '/', name: 'Home', element: <Home />, nodeRef: createRef() },
	{ path: '/album/:id', name: 'Album', element: <Album />, nodeRef: createRef() },
	{ path: '/topList', name: 'TopList', element: <Top />, nodeRef: createRef() },
	{ path: '/user', name: 'User', element: <User />, nodeRef: createRef() }
];


const RouteContainer = () => {

	const location = useLocation();

	const currentOutlet = useOutlet();
	const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {} as any;


	return (
		<div className={styles.routeContainer}>
			<Menu></Menu>
			<div className={styles.content}>
				<SwitchTransition>
					<CSSTransition
						key={location.pathname}
						nodeRef={nodeRef}
						timeout={300}
						classNames="fade"
						unmountOnExit
					>
						{(state) => (
							<div ref={nodeRef} className={styles.page}>
								{currentOutlet}
							</div>
						)}
					</CSSTransition>
				</SwitchTransition>
			</div>
			<Controller></Controller>
			<PlayingPanel></PlayingPanel>
			<Search></Search>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <RouteContainer />,
		children: routes.map((route) => ({
			index: route.path === '/',
			path: route.path === '/' ? undefined : route.path,
			element: route.element,
		})),
	},
	{
		path: '/login',
		element: <Login />,
	}
]);

export default <RouterProvider router={router} />;
