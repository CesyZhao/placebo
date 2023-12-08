import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


export interface AppState {
  showPanel: boolean;
  showSearch: boolean;
  backwardsStatus: boolean;
}

const initialState: AppState = {
  showPanel: false,
  showSearch: false,
  backwardsStatus: false,
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    togglePanel(state, action: PayloadAction<boolean>) {
      state.showPanel = action.payload;
    },

    toggleSearch(state, action: PayloadAction<boolean>) {
      state.showSearch = action.payload;
    },

    setBackwardsStatus(state, action: PayloadAction<boolean>) {
      state.backwardsStatus = action.payload;
    }
  },
});

export const { togglePanel, toggleSearch, setBackwardsStatus } = appSlice.actions;

export default appSlice.reducer;
