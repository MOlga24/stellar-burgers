/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TIngredient, TOrder, TOrdersData } from '@utils-types';

import { getFeedsApi } from '..//..//utils/burger-api';
export interface OrdersListState {
 ordersData: TOrdersData;  
   isLoading: boolean;
   error: null | undefined;

}
export const initialState:  OrdersListState = {
  ordersData: { orders: [],
    total:0,
    totalToday:0}, 
  isLoading: false,
  error: null
};

export const fetchOrders = createAsyncThunk('api/orders.ts', async () => {
  const newOrders = await getFeedsApi();
  return newOrders;
});


export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => {
      return state;
    },
    isLoadingSelector: (state) => {
      return state.isLoading;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.ordersData= action.payload;
      state.isLoading = false;
    });
  }
});



export const {  getFeedSelector,isLoadingSelector } = feedSlice.selectors;
export default feedSlice.reducer;
