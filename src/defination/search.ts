export enum SearchType {
  Music = 1,
  Artist = 100,
  PlayList = 1000,
  User = 1002
}


export const SearchTypeMap = new Map([
  [SearchType.Music, 'Music'],
  [SearchType.Artist, 'Artist'],
  [SearchType.PlayList, 'PlayList'],
  [SearchType.User, 'User'],
]);


export const SearchTypeList = [
  SearchType.Music,
  SearchType.Artist,
  SearchType.PlayList,
  SearchType.User,
].map(t => ({ type: t, name: SearchTypeMap.get(t) }));
