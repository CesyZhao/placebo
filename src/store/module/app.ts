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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const showPanel = (state: RootState) => state.app.showPanel;

export default userSlice.reducer;
