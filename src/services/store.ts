import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerSlice } from './slices/burgerSlice';
import { basketSlice } from '../../src/services/slices/basketSlice';
import { orderSlice } from './slices/orderSlice';
import { feedSlice } from './slices/feedSlice';
import { userSlice } from '..//..//src/services/slices/userSlice';

const rootReducer = combineReducers({
  [burgerSlice.name]: burgerSlice.reducer,
  [basketSlice.name]: basketSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [userSlice.name]: userSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useDispatch: () => AppDispatch = () => dispatchHook();

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
