import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
// @ts-expect-error
import md5 from "spark-md5";
import {checkQrCodeStatus, getAccount, getQrCode, getQrKey, getUserDetail, login} from "../../api/user";
import {useMount, useRequest} from "ahooks";
import {
	AccountResponse,
	QRCodeResponse,
	QRCodeStatus,
	QRCodeStatusMap,
	QRCodeStatusResponse,
	QRKeyResponse
} from "../../defination/user";

import { useAppDispatch } from "../../store/hooks";
import Placebo from "../../model/Placebo";

const Login = () => {
	const navigate = useNavigate();
	const goHome = useCallback(() => {
		navigate('/');
	}, []);

	const dispatch = useAppDispatch();

	const [message, setMessage] = useState('');

	const [qrCode, setQrCode] = useState('');
	const [qrKey, setQrKey] = useState('');

	const timer: any = useRef();

	const getAccountInfo = useCallback(async () => {
		try {
			await Placebo.user.getUserProfile();
			goHome();
		} catch (e) {
			setMessage('Something went wrong, please try again!');
		}
	}, []);

	const checkQrStatus = useCallback(async (qrKey: string) => {
		try {
			const { code } = await Placebo.user.checkQrStatus(qrKey);
			setMessage(QRCodeStatusMap.get(code) || '');
			if (code === QRCodeStatus.Authorized) {
				getAccountInfo();
			}
		} catch (e) {
			// setErrorText('Something went wrong, please try again!');
		}
	}, []);

	const getQrUrl = useCallback(async (qrKey: string) => {
		try {
			const { qrimg } = await Placebo.user.getQrUrl(qrKey);
			setQrCode(qrimg);
			timer.current = setInterval(() => {
				checkQrStatus(qrKey);
			}, 3000);
		} catch (e) {
			// setErrorText('Something went wrong, please try again!');
		}
	}, [timer]);

	const getQrKeyString = useCallback(async () => {
		try {
			const { unikey } = await Placebo.user.getQrKeyString();
			setQrKey(unikey);
			getQrUrl(unikey);
		} catch (e) {
			// setErrorText('Something went wrong, please try again!');
		}
	}, []);

	const refreshRrCode = useCallback(() => {
		clearInterval(timer.current);
		getQrUrl(qrKey);
	}, [qrKey]);

	useEffect(() => {
		getQrKeyString();

		return () => {
			clearInterval(timer.current);
		};
	}, []);

 	return (
		<>
			<div className={styles.loginHeader}>
				<span onClick={goHome}>
					<i className="iconfont icon-you"></i>
					Home
				</span>
			</div>
			<div className={styles.loginContainer}>
				<header>Sign in</header>
				<p>Hi there, scan the QR code with NetEase music to sign in!</p>
				<img src={qrCode} alt=""/>
				<p onClick={refreshRrCode}>
					{
						message && <><i className="iconfont icon-refresh"></i> { message }</>
					}
				</p>
			</div>
		</>
	);
};

export default Login;
