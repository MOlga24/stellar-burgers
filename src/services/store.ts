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
import  {userRegSlice}  from '../../src/services/slices/Regslice';
import { basketSlice } from './slices/baskerslice';

// import { basketSlice } from '../services/slices/Basketslice';


const rootReducer =combineReducers({
[burgerSlice.name]:burgerSlice.reducer,
[userRegSlice.name]:userRegSlice.reducer,
[basketSlice.name]:basketSlice.reducer
});

const store = configureStore({
reducer:rootReducer
,
devTools: process.env.NODE_ENV !== 'production'
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
