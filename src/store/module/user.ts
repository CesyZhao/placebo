import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {Profile, UnionProfile} from "../../defination/user";


export interface UserState {
	userProfile: Profile,
	test: Record<string, any>
}

const initialState: UserState = {
	userProfile: {} as Profile,
	test: {}
};


export const userSlice = createSlice({
	name: 'user',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		updateUser(state, action: PayloadAction<UnionProfile>) {
			state.userProfile = action.payload;
		},
		testReducer(state, action: PayloadAction<any>) {
			const { payload } = action
			console.log(payload, '-------')
			state.test = payload
		},
		testReducer2(state, action: PayloadAction<any>) {
			const { payload } = action
			state.test.abc = payload
			console.log(state.test.abc)
		}
	},
});

export const { updateUser, testReducer, testReducer2 } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const userProfile = (state: RootState) => state.user.userProfile;

export const userAvatar  = (state: RootState) => state.user.userProfile?.avatarUrl;

export default userSlice.reducer;
