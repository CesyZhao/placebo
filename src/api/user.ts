import http, {RequestConfig} from '../util/http'
import {
	QRKeyResponse,
	QRCodeResponse,
	UserSignInEntity,
	QRCodeStatusResponse,
	AccountResponse, UserDetailResponse, UserVipInfoResponse, UserLikeListResponse
} from '../defination/user'

export const login = (form: UserSignInEntity) => {
	const { phone, password } = form;
	return http.get(`/login/cellphone?phone=${phone}&password=${password}`);
}

export const getQrKey = (): Promise<QRKeyResponse> => {
	return http.get('/login/qr/key');
}

export const getQrCode = (key: string): Promise<QRCodeResponse> => {
	return http.get('/login/qr/create?key='+ key + '&qrimg=true');
}

export const checkQrCodeStatus = (key: string): Promise<QRCodeStatusResponse> => {
	return http.get('/login/qr/check?key='+ key + '&timestamp=' + new Date().getTime(), { rawData: true } as RequestConfig);
}

export const getAccount = (): Promise<AccountResponse> => {
	return http.get('/user/account', { rawData: true } as RequestConfig);
}

export const getUserDetail = (id: number): Promise<UserDetailResponse> => {
	return http.get(`/user/detail?uid=${id}`, { rawData: true } as RequestConfig);
}

export const getVipInfo = (): Promise<UserVipInfoResponse> => {
	return http.get(`/vip/info`);
}

export const getLoginStatus = (): Promise<AccountResponse> =>  http.get('/login/status');

export const refreshLoginStatus = () => http.get('/login/refresh');

export const getUserLikeList = (id: number): Promise<UserLikeListResponse> => http.get(`/likelist?uid=${id}`, { rawData: true } as RequestConfig);