import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


export interface AppState {
  showPanel: boolean
}

const initialState: AppState = {
  showPanel: false
};


export const userSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
   togglePanel(state, action: PayloadAction<boolean>) {
     state.showPanel = action.payload;
   }
  },
});

export const { togglePanel } = userSlice.actions;

export default userSlice.reducer;
