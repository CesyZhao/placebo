import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


export interface AppState {
  showPanel: boolean;
  showSearch: boolean;
}

const initialState: AppState = {
  showPanel: false,
  showSearch: true
};


export const userSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    togglePanel(state, action: PayloadAction<boolean>) {
      state.showPanel = action.payload;
    },

    toggleSearch(state, action: PayloadAction<boolean>) {
      state.showSearch = action.payload;
    }
  },
});

export const { togglePanel, toggleSearch } = userSlice.actions;

export default userSlice.reducer;
