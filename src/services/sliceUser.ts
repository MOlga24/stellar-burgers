/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi, getUserApi } from '@api';
import { TUser } from '@utils-types';

export interface UserState {
  user: TUser;
  isLoading: boolean;
  error: null | undefined;
}



export const fetchUserApi =createAsyncThunk('api/burger-api.ts', async ()=>{const newUser= await   getUserApi();
return newUser});
export const initialState: UserState= {
  user:{
  email: '',
  name: ''},
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  selectors: {
    getUserSelectors: (state) => {
      return state;
    },
    isLoadingSelector: (state) => {
      return state.isLoading;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserApi.fulfilled, (state, action) => {
      state.user= action.payload.user;
      state.isLoading = false;
    });
  }
});

export const { getUserSelectors,isLoadingSelector } = userSlice.selectors;
export default userSlice.reducer;
