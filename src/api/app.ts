import http, { type RequestConfig } from '../util/http';
import { type SearchType } from '../defination/search';

export const search = (keyword: string, type: SearchType, page: number): any => http.get(`/search?keywords=${keyword}&type=${type}&limit=50&offset=${(page - 1) * 50}`, { rawData: true } as RequestConfig);
