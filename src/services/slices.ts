/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi, getUserApi } from '@api';
import { TIngredient } from '@utils-types';
import axios from 'axios';
export interface BurgerListState {
  burgs: TIngredient[];
  isLoading: boolean;
  error: null | undefined;
}
export const initialState: BurgerListState = {
  burgs: [],
  isLoading: false,
  error: null
};

export const fetchBurgs = createAsyncThunk('api/burger-api.ts', async () => {
  const newBurgs = await getIngredientsApi();
  return newBurgs;
});


export const burgerSlice = createSlice({
  name: 'burgs',
  initialState,
  reducers: {},
  selectors: {
    getBurgsSelector: (state) => {
      return state;
    },
    isLoadingSelector: (state) => {
      return state.isLoading;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBurgs.fulfilled, (state, action) => {
      state.burgs = action.payload;
      state.isLoading = false;
    });
  }
});

export const { getBurgsSelector,isLoadingSelector } = burgerSlice.selectors;
export default burgerSlice.reducer;
