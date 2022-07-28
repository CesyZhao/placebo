import http, { RequestConfig } from "../util/http";
import {AlbumDetail, LyricResponse, PersonalizedResponse, TopListResponse} from "../defination/music";

export const getPersonalized = (): Promise<PersonalizedResponse> => {
  return http.get('/personalized', { rawData: true } as RequestConfig);
}

export const getAlbum = (id: number): Promise<AlbumDetail> => {
  return http.get(`/playlist/detail?id=${id}`, { rawData: true } as RequestConfig)
}

export const getList = (id: number): Promise<any> => {
  return http.get(`/playlist/track/all?id=${id}`, { rawData: true } as RequestConfig)
}

export const getSongUrl = (id: number) => {
  return http.get(`/song/url?id=${id}&br=999000`)
}

export const getLyric = (id: number): Promise<LyricResponse> => {
  return http.get(`/lyric?id=${id}`, { rawData: true } as RequestConfig);
}

export const getRankingList = (): Promise<TopListResponse> => http.get('/toplist/detail', { rawData: true } as RequestConfig);