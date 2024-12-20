/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TIngredient, TOrder, TOrdersData } from '@utils-types';

import { getFeedsApi, getOrderByNumberApi } from '..//..//utils/burger-api';
import { Action } from '@remix-run/router';
import { RootState } from '@store';
export interface OrdersListState {
 ordersData: TOrdersData;  
   isLoading: boolean;
   error: null | undefined;
   order:TOrder |null;

}
export const initialState:  OrdersListState = {
  ordersData: { orders: [],
    total:0,
    totalToday:0}, 
  isLoading: false,
  error: null,
  order: null
};

export const fetchOrders = createAsyncThunk('api/orders.ts', async () => {
  const newOrders = await getFeedsApi();
  return newOrders;
});

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  async (number: number, { rejectWithValue}) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);
export const getOrderByNumberPage=(number:number)=>(state:RootState)=>{
 if (state.feed.ordersData.orders.length || state.order.orders.length)
 {return (
  state.feed.ordersData.orders.find((order)=>order.number ===+number)||
  state.order.orders.find((order)=>order.number ===+number)
);
 }
 if (state.feed.order){
  return state.feed.order.number===+number
  ? state.feed.order: null
 }
}
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => state.ordersData,
    
    isFeedLoadingSelector: (state) => state.isLoading,
  
    selectFeedOrder:(state)=>state.order
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchOrders.fulfilled, (state, action) => {
      state.ordersData= action.payload;
      state.isLoading = false;
    })
    .addCase(fetchOrders.pending, (state) => {
    
      state.isLoading = true;
    })
    .addCase(fetchOrders.rejected, (state) => {
    
      state.isLoading = false;
    })
    .addCase(getOrderByNumber.pending, (state) => {
      state.isLoading = true;
      state.error = null;
     
    })
    .addCase(getOrderByNumber.fulfilled, (state,action) => {
      state.isLoading = false;
      state.error = null; 
      state.order =action.payload.orders[0]
    })
    .addCase(getOrderByNumber.rejected, (state) => {
      state.isLoading = false;
      state.error = null;
    })
  }
});



export const {  getFeedSelector,isFeedLoadingSelector,selectFeedOrder } = feedSlice.selectors;
export default feedSlice.reducer;
