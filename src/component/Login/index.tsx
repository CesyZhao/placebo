import React, {useCallback, useRef, useState} from "react";
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import md5 from "spark-md5";
import {checkQrCodeStatus, getAccount, getQrCode, getQrKey, login} from "../../api/user";
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
	}, [phoneRef, passwordRef])

	const clearError = useCallback(() =>	setErrorText(''), []);

	const dispatch = useAppDispatch();
	const { run: getAccountInfo } = useRequest<AccountResponse, any>(getAccount, {
		manual: true,
		onSuccess(data) {
			const { profile } = data;
			dispatch(updateUser(profile));
			goHome();
		}
	})

	const [message, setMessage] = useState('');
	const { run: checkQrStatus } = useRequest<QRCodeStatusResponse, any>(checkQrCodeStatus, {
		manual: true,
		pollingInterval: 3000,
		onSuccess(result) {
			setMessage(QRCodeStatusMap.get(result.code) || '');
			if (result.code === QRCodeStatus.Authorized) {
				getAccountInfo();
			}
		}
	})

	const [qrCode, setQrCode] = useState('');
	const { loading: qrCreating, run: getQrUrl } = useRequest<QRCodeResponse, any>(getQrCode, {
		manual: true,
		onSuccess(result) {
			setQrCode(result.qrimg);
			checkQrStatus(qrKey);
		}
	});

	const [qrKey, setQrKey] = useState('');
	const { loading, run: getQrKeyString } = useRequest<QRKeyResponse, any>(getQrKey, {
		manual: true,
		onSuccess(result) {
			setQrKey(result.unikey);
			getQrUrl(result.unikey);
		}
	});

	const refreshRrCode = useCallback(() => {
		getQrUrl(qrKey);
	}, [qrKey])

	useMount(() => {
		getQrKeyString();
	});
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