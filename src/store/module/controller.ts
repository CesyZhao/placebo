import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {AvailableAlbum, AvailableMusic, Mode, ModeList, SwitchDirection} from "../../defination/music";
import { shuffle } from 'lodash'


export interface ControllerState {
	playingMusic: AvailableMusic,
	playingList: AvailableMusic[],
	playingAlbum: AvailableAlbum,
	mode: Mode,
	playingStatus: Boolean
}

const initialState: ControllerState = {
	playingMusic: {} as AvailableMusic,
	playingList: [] as AvailableMusic[],
	playingAlbum: {} as AvailableAlbum,
	mode: Mode.List,
	playingStatus: false
};


export const userSlice = createSlice({
	name: 'controller',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		updatePlayingStatus(state, action: PayloadAction<Boolean>) {
			state.playingStatus = action.payload;
		},
		updatePlayingMusic(state, action: PayloadAction<AvailableMusic>) {
			state.playingMusic = action.payload;
		},
		switchMusic(state, action: PayloadAction<SwitchDirection>) {
			const { playingAlbum , playingMusic, mode } = state;
			const { playlist: tracks, shuffledPlayList = [] } = playingAlbum;
			const targetList = mode === Mode.Shuffle ? shuffledPlayList : tracks;
			const { payload } = action;
			let nextIndex, nextSong
			let index = targetList.findIndex(e => +e.id === +playingMusic.id);
			if (mode === Mode.Single) {
				nextIndex = index
			} else {
				nextIndex = payload === SwitchDirection.Prev
					? --index >= 0 ? index : targetList.length - 1
					: ++index < targetList.length ? index : 0;
			}
			nextSong = targetList[nextIndex];
			state.playingMusic = {...nextSong};
		},
		updatePlayingList(state, action: PayloadAction<AvailableMusic[]>) {
			state.playingList = action.payload;
		},
		updatePlayingAlbum(state, action: PayloadAction<AvailableAlbum>) {
			const { playlist } = action.payload;
			state.playingAlbum = Object.assign(action.payload, { shuffledPlayList: shuffle(playlist) });
		},
		updateMode(state) {
			const { mode: currentMode, playingAlbum } = state;
			const array = Array.from(ModeList.keys());
			const index = array.findIndex(s => s === currentMode);
			state.mode = array[index === array.length - 1 ? 0 : index + 1];
			if (state.mode === 'shuffle' && !playingAlbum.shuffledPlayList) {
				playingAlbum.shuffledPlayList = shuffle(playingAlbum.playlist)
			}
		}
	},
});

export const { updatePlayingMusic, updatePlayingList, updateMode, switchMusic, updatePlayingAlbum, updatePlayingStatus } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const playingMusic = (state: RootState) => state.controller.playingMusic;
export const playingList = (state: RootState) => state.controller.playingList;
export const playingAlbum = (state: RootState) => state.controller.playingAlbum;
export const mode = (state: RootState) => state.controller.mode;

export const playingStatus = (state: RootState) => state.controller.playingStatus;

export default userSlice.reducer;
