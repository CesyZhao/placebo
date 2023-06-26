import axios, { AxiosRequestConfig } from "axios";
import placebo from '../../model/Placebo'

const BASE_URL = 'http://localhost:3000';

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 50000,
	withCredentials: true,
});

export interface RequestConfig extends AxiosRequestConfig {
	rawData?: boolean;
	needAuth?: boolean;
}

instance.interceptors.request.use((config: RequestConfig) => {
	if (config.needAuth) {
		const state = placebo.state.getOriginalState();
		const { userProfile } = state.user;
		const { userId } = userProfile;
		if (!userId) {
			window.location.href = '/login'
		}
	}
	return config;
}, (error) => Promise.reject(error))

instance.interceptors.response.use((resp) => {
	const { data, config } = resp;
	const { rawData } = config  as RequestConfig;
	// if (data.code !== 200) {
	// 	return Promise.reject(rawData ? data : data.data);
	// }
	return rawData ? data : data.data;
}, (error) => {
	return Promise.reject(error);
})

export default instance;
