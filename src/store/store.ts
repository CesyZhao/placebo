import { configureStore, type ThunkAction, type Action, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './module/user';
import controllerReducer from './module/controller';
import appReducer from './module/app';

const config = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(
	config,
	combineReducers({
		user: userReducer,
		controller: controllerReducer,
		app: appReducer,
	})
);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
	>;
