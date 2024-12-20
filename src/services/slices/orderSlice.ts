/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';

export interface OrderState {
  order: TOrder | null;
  data: string[];
  orders: TOrder[];
  requestStatus: boolean;
  isOrdersLoading: boolean;
  error: string | undefined;
}

export const initialState: OrderState = {
  data: [],
  order: null,
  requestStatus: false,
  orders: [],
  isOrdersLoading: false,
  error: ''
};
export const fetchOrderBurger = createAsyncThunk(
  'order/neworder',
  async (data: string[]) => {
    const newOrder = await orderBurgerApi(data);
    return newOrder;
  }
);
export const fetchUserOrders = createAsyncThunk('order/allorders', async () => {
  const allOrders = await getOrdersApi();
  return allOrders;
});
export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNum',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Error feed data');
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      return {
        ...state,
        order: action.payload,
         requestStatus:false
      };
    },
    getOrders: (state, action) => {
      return { ...state, ordersData: action.payload };
    },
    clearOrder: (state, action) => {
      return { ...state, order: null, data: [] };
    }
  },
  selectors: {
    getOrderRequestSelector: (state) => state.requestStatus,

  isOrderLoadingSelector: (state) => state.isOrdersLoading,

    getOrderModalData: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.pending, (state, action) => {
        state.isOrdersLoading = true;
        state.requestStatus = true;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.requestStatus = false;
        state.error = '';
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.error = action.error.message;
        state.isOrdersLoading = false;
        state.requestStatus = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      state.isOrdersLoading = false;
        state.error = '';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.requestStatus= true;
        state.isOrdersLoading = true;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.orders = [];
        state.requestStatus=false
        state.isOrdersLoading= false;
        state.error = action.error.message;
      });
  }
});

export const { addOrder, getOrders, clearOrder } = orderSlice.actions;
export const {
  getOrderRequestSelector,
 isOrderLoadingSelector,
  getOrderModalData
} = orderSlice.selectors;
export default orderSlice.reducer;
