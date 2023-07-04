import http, { type RequestConfig } from '../util/http';
import { type SearchType } from '../defination/search';

export const search = (keyword: string, type: SearchType, page: number): any => http.get(`/search?keywords=${keyword}&type=${type}&limit=10&offset=${(page - 1) * 10}`, { rawData: true } as RequestConfig);
