/* eslint-disable */
import { createAsyncThunk as createAsyncThunkRedux } from '@reduxjs/toolkit';
import { AppDispatch, RootStore } from '@store';
import {
	TypedUseSelectorHook,
	useDispatch as useDispatchRedux,
	useSelector as useSelectorRedux,
} from 'react-redux';

import { BurgerApi } from 'src/utils/userapi';


export const useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootStore> = useSelectorRedux;

export const createAppAsyncThunk = createAsyncThunkRedux.withTypes<{
	state: RootStore;
	dispatch: AppDispatch;
	extra: BurgerApi;
}>();
