/* eslint-disable */

import {
  combineReducers,
  configureStore,

} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import  {burgerSlice} from '../../src/services/slices'

import { basketSlice } from './slices/baskerslice';

import burgerApi from '..//..//src/utils/userapi'
import { userSlice } from '../../src/services/slices/user'
import { orderSlice } from './slices/createOrder';
import { feedSlice } from './slices/feedSlice';



const rootReducer =combineReducers({
[burgerSlice.name]:burgerSlice.reducer,
[userSlice.name]: userSlice.reducer,
[basketSlice.name]:basketSlice.reducer,
[orderSlice.name]: orderSlice.reducer,
[feedSlice.name]:feedSlice.reducer
});

// const store = configureStore({
// reducer:rootReducer
// ,
// devTools: process.env.NODE_ENV !== 'production'
// });
export type RootState = ReturnType<typeof rootReducer>;

// export const useDispatch: () => AppDispatch = () => dispatchHook();




export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: burgerApi,
			},
		}),
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
