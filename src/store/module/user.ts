import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Profile } from "../../defination/user";


export interface UserState {
	userProfile: Profile
}

const initialState: UserState = {
	userProfile: {} as Profile,
};


export const userSlice = createSlice({
	name: 'user',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		updateUser(state, action: PayloadAction<Profile>) {
			state.userProfile = action.payload;
		}
	},
});

export const { updateUser } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const userProfile = (state: RootState) => state.user.userProfile;

export default userSlice.reducer;
