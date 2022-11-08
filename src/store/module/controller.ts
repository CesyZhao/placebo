import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {AvailableAlbum, AvailableMusic, Mode, ModeList, SwitchDirection} from "../../defination/music";


export interface ControllerState {
	playingMusic: AvailableMusic,
	playingList: AvailableMusic[],
	playingAlbum: AvailableAlbum,
	mode: Mode
}

const initialState: ControllerState = {
	playingMusic: {} as AvailableMusic,
	playingList: [] as AvailableMusic[],
	playingAlbum: {} as AvailableAlbum,
	mode: Mode.List
};


export const userSlice = createSlice({
	name: 'controller',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		updatePlayingMusic(state, action: PayloadAction<AvailableMusic>) {
			state.playingMusic = action.payload;
		},
		switchMusic(state, action: PayloadAction<SwitchDirection>) {
			const { playingList, playingMusic, mode } = state;
			const { payload } = action;
			let nextIndex, nextSong
			let tracks = playingList;
			let index = tracks.findIndex(e => +e.id === +playingMusic.id);
			nextIndex = payload === SwitchDirection.Prev
				? --index >= 0 ? index : tracks.length - 1
				: ++index < tracks.length ? index : 0;
			nextSong = tracks[nextIndex];
			state.playingMusic = nextSong;
		},
		updatePlayingList(state, action: PayloadAction<AvailableMusic[]>) {
			state.playingList = action.payload;
		},
		updatePlayingAlbum(state, action: PayloadAction<AvailableAlbum>) {
			state.playingAlbum = action.payload;
		},
		updateMode(state) {
			const currentMode = state.mode;
			const array = Array.from(ModeList.keys());
			const index = array.findIndex(s => s === currentMode);
			state.mode = array[index === array.length - 1 ? 0 : index + 1];
		}
	},
});

export const { updatePlayingMusic, updatePlayingList, updateMode, switchMusic, updatePlayingAlbum } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const playingMusic = (state: RootState) => state.controller.playingMusic;
export const playingList = (state: RootState) => state.controller.playingList;
export const playingAlbum = (state: RootState) => state.controller.playingAlbum;
export const mode = (state: RootState) => state.controller.mode;

export default userSlice.reducer;
