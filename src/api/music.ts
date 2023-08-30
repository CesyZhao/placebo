import http, { type RequestConfig } from "../util/http";
import {type AlbumDetail, type FMResponse, FMSong, type LyricResponse, type PersonalizedResponse, type TopListResponse} from "../defination/music";

export const getPersonalized = async (): Promise<PersonalizedResponse> => {
  return await http.get('/personalized', { rawData: true } as RequestConfig);
};

export const getAlbum = async (id: number): Promise<AlbumDetail> => {
  return await http.get(`/playlist/detail?id=${id}`, { rawData: true } as RequestConfig);
};

export const getList = async (id: number): Promise<any> => {
  return await http.get(`/playlist/track/all?id=${id}`, { rawData: true } as RequestConfig);
};

export const getSongUrl = async (id: number) => {
  return await http.get(`/song/url?id=${id}&br=999000`);
};

export const getLyric = async (id: number): Promise<LyricResponse> => {
  return await http.get(`/lyric?id=${id}`, { rawData: true } as RequestConfig);
};

export const getRankingList = async (): Promise<TopListResponse> => await http.get('/toplist/detail', { rawData: true } as RequestConfig);

export const getUserPlaylist = async (uid: number) => {
  return await http.get(`/user/playlist?uid=${uid}&limit=9999`,  { rawData: true } as RequestConfig);
};

export const getPersonalFM = async (): Promise<FMResponse> => {
  const timestamp = new Date().getTime();
  return await http.get(`/personal_fm?timestamp=${timestamp}`,  { rawData: true, needAuth: true } as RequestConfig);
};
