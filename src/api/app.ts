import http, { RequestConfig } from '../util/http'
import { SearchType } from '../defination/search'

export const search = (keyword: string, type: SearchType, page: number): any => http.get(`/search?keywords=${keyword}&type=${type}&limit=10&offset=${page - 1}`, { rawData: true } as RequestConfig);
