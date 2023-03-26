import http from '../util/http'
import { SearchType } from '../defination/search'

export const search = (keyword: string, type: SearchType, page: number) => http.get(`/search?keywords=${keyword}&type=${type}&limit=5&offset=${page}`);
