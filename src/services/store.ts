/* eslint-disable */

import {
  applyMiddleware,
  combineReducers,
  configureStore,
  createStore, 
} from '@reduxjs/toolkit';




import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import  {burgerSlice} from '@slices';
import  {userSlice} from '../../src/services/sliceUser';


// Заменить на импорт настоящего редьюсера
const rootReducer =combineReducers({

[userSlice.name]:userSlice.reducer,
[burgerSlice.name]:burgerSlice.reducer,
})

const store = configureStore({
  reducer:rootReducer,
// {burgs: burgerSlice},
//userSlice.reducer,
  devTools: process.env.NODE_ENV !== 'production'
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
