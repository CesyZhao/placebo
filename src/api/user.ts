import http, {type RequestConfig} from '../util/http';
import {
	type QRKeyResponse,
	type QRCodeResponse,
	type UserSignInEntity,
	type QRCodeStatusResponse,
	type AccountResponse, type UserDetailResponse, type UserVipInfoResponse, type UserLikeListResponse
} from '../defination/user';

export const login = async (form: UserSignInEntity) => {
	const { phone, password } = form;
	return await http.get(`/login/cellphone?phone=${phone}&password=${password}`);
};

export const getQrKey = async (): Promise<QRKeyResponse> => {
	return await http.get('/login/qr/key');
};

export const getQrCode = async (key: string): Promise<QRCodeResponse> => {
	return await http.get('/login/qr/create?key='+ key + '&qrimg=true');
};

export const checkQrCodeStatus = async (key: string): Promise<QRCodeStatusResponse> => {
	return await http.get('/login/qr/check?key='+ key + '&timestamp=' + new Date().getTime(), { rawData: true } as RequestConfig);
};

export const getAccount = async (): Promise<AccountResponse> => {
	return await http.get('/user/account', { rawData: true } as RequestConfig);
};

export const getUserDetail = async (id: number): Promise<UserDetailResponse> => {
	return await http.get(`/user/detail?uid=${id}`, { rawData: true } as RequestConfig);
};

export const getVipInfo = async (): Promise<UserVipInfoResponse> => {
	return await http.get(`/vip/info`);
};

export const getLoginStatus = async (): Promise<AccountResponse> =>  await http.get('/login/status');

export const refreshLoginStatus = async () => await http.get('/login/refresh');

export const getUserLikeList = async (id: number): Promise<UserLikeListResponse> => await http.get(`/likelist?uid=${id}`, { rawData: true } as RequestConfig);


export const likeMusic = async (id: number): Promise<UserLikeListResponse> => await http.get(`/like?id=${id}`, { rawData: true, needAuth: true } as RequestConfig);
