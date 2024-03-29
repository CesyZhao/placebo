export enum SearchType {
  Music = 1,
  Artist = 100,
  Playlist = 1000,
  User = 1002
}


export const SearchTypeMap = new Map([
  [SearchType.Music, 'Music'],
  [SearchType.Artist, 'Artist'],
  [SearchType.Playlist, 'Playlist'],
  [SearchType.User, 'User'],
]);

export const SearchResultMap = new Map([
  [SearchType.Music, 'song'],
  [SearchType.Artist, 'artist'],
  [SearchType.Playlist, 'playlist'],
  [SearchType.User, 'user'],
]);


export const SearchTypeList = [
  SearchType.Music,
  SearchType.Artist,
  SearchType.Playlist,
  SearchType.User,
].map(t => ({ type: t, name: SearchTypeMap.get(t) }));
