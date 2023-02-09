import {Profile} from "./user";

export interface Album {
	alg?: string;
	id: number;
	name: string;
	picUrl: string;
	playCount?: number;
	trackCount?: number;
	type?: number;
	link?: string
}

export interface PersonalizedResponse {
	category: number;
	hasTaste: boolean;
	result: Album[];
}

export interface Artist {
	id: number;
	name: string;
	link?: string
}

export interface Song {
	name: string;
	id: number;
	dt: number;
	ar: Artist[];
}

export interface AvailableMusic {
	id: number,
	name: string,
	duration: number,
	album: Album,
	artists: Artist[];
}

export interface PlayList {
	id: number;
	name: string;
	description: string;
	tags: string[];
	creator: Profile;
	createTime: number;
	coverImgUrl: string;
	tracks: Song[];
	trackIds: { id: number }[];
	playCount: number;
	subscribedCount: number;
	subscribed: boolean;
}

export interface AlbumDetail {
	playlist: PlayList;
}

export interface AvailableAlbum {
	id: number;
	name: string;
	playlist: AvailableMusic[];

	shuffledPlayList?: AvailableMusic[];
}

export enum Mode {
	List = 'list',
	Shuffle = 'shuffle',
	Single = 'single'
}

export const ModeList = new Map([
	[Mode.List, 'icon-ios-listCirculation'],
	[Mode.Shuffle, 'icon-ios-shuffle'],
	[Mode.Single, 'icon-ios-singleCirculation'],
])


export enum SwitchDirection {
	Prev,
	Next
}

export interface Lyric {
	version: number;
	lyric: string;
}

export interface LyricResponse {
	lrc: Lyric;
	lyricUser: Profile;
	tlyric: Lyric;
	transUser: Profile;
	uncollected: boolean;
	nolyric: boolean;
}


export interface TopListResponse {
	list: PlayList[];
}
