import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
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
import { updateUser } from "../../store/module/user";

const Login = () => {
	const navigate = useNavigate();
	const goHome = useCallback(() => {
		navigate('/');
	}, []);

	const [errorText, setErrorText] = useState('');

	const phoneRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const dispatch = useAppDispatch();

	const [message, setMessage] = useState('');

	const [qrCode, setQrCode] = useState('');
	const [qrKey, setQrKey] = useState('');

	let timer: any = useRef();

	const handleSign = useCallback(async () => {
		// 先清掉错误提示
		setErrorText('');
		const { value: phone } = phoneRef.current as HTMLInputElement;
		const { value: password } = passwordRef.current as HTMLInputElement;
		// const md5Password = md5.hash(password);
		try {
			const result = await login({ phone, password });
		} catch (e) {
			setErrorText('Invalid phone number or password!')
		}
	}, [phoneRef, passwordRef]);

	const clearError = useCallback(() =>	setErrorText(''), []);

	const getAccountInfo = useCallback(async () => {
		try {
			const { profile } = await getAccount();
			const { level } = await getUserDetail(profile.userId);
			dispatch(updateUser({ ...profile, level }));
			goHome();
		} catch (e) {
			setErrorText('Something went wrong, please try again!');
		}
	}, []);

	const checkQrStatus = useCallback(async (qrKey: string) => {
		try {
			const { code } = await checkQrCodeStatus(qrKey);
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
			console.log('+++++++++')
			const { qrimg } = await getQrCode(qrKey);
			setQrCode(qrimg);
			timer.current = setInterval(() => {
				console.log('timer-----------');
				checkQrStatus(qrKey);
			}, 3000);
		} catch (e) {
			// setErrorText('Something went wrong, please try again!');
		}
	}, [timer]);

	const getQrKeyString = useCallback(async () => {
		try {
			console.log('///////////////');
			const { unikey } = await getQrKey();
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
		}
	}, [])

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
				{/*<p>Hi there, sign in and just enjoy!</p>*/}
				{/*<section className={styles.loginForm}>*/}
				{/*	<input type="text" placeholder="Phone number" ref={phoneRef} onInput={clearError} />*/}
				{/*	<input type="password" placeholder="Password" ref={passwordRef} onInput={clearError} />*/}
				{/*	<div className={styles.errorText}>{ errorText }</div>*/}
				{/*	<button onClick={handleSign}>*/}
				{/*		Sign in*/}
				{/*	</button>*/}
				{/*</section>*/}
			</div>
		</>
	)
}

export default Login;
