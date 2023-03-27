import http, { RequestConfig } from '../util/http'
import { SearchType } from '../defination/search'

export const search = (keyword: string, type: SearchType, page: number): any => http.get(`/search?keywords=${keyword}&type=${type}&limit=30&offset=${page}`, { rawData: true } as RequestConfig);
