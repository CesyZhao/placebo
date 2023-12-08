import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import {type Profile, type UnionProfile} from "../../defination/user";


export interface UserState {
	userProfile: Profile,
	userFavorites: number[],
}

const initialState: UserState = {
	userProfile: {} as Profile,
	userFavorites: [],
};


export const userSlice = createSlice({
	name: 'user',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		updateUser(state, action: PayloadAction<UnionProfile>) {
			state.userProfile = action.payload;
		},
		updateUserFavorites(state, action: PayloadAction<number[]>) {
			state.userFavorites = action.payload;
		}
	},
});

export const { updateUser, updateUserFavorites } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const userProfile = (state: RootState) => state.user.userProfile;

export const userAvatar  = (state: RootState) => state.user.userProfile?.avatarUrl;

export const userFavorites  = (state: RootState) => state.user.userFavorites;

export default userSlice.reducer;
