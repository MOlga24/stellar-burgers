import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getFeedsApi, getOrderByNumberApi } from '..//..//utils/burger-api';

export interface OrdersListState {
  ordersData: TOrdersData;
  isLoading: boolean;
  order: TOrder | null;
  error: string | undefined;
}
export const initialState: OrdersListState = {
  ordersData: { orders: [], total: 0, totalToday: 0 },
  isLoading: false,
  order: null,
  error: ''
};

export const fetchOrders = createAsyncThunk('api/orders.ts', async () => {
  const newOrders = await getFeedsApi();
  return newOrders;
});

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => state.ordersData.orders,

    isFeedLoadingSelector: (state) => state.isLoading,

    selectFeedOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersData = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.orders[0];
        state.error = '';
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { getFeedSelector, isFeedLoadingSelector, selectFeedOrder } =
  feedSlice.selectors;
export default feedSlice.reducer;
