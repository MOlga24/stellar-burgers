/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi, TNewOrderResponse } from '../../utils/burger-api';

export interface OrderState {
  order: TOrder | null;
  data: string[];
  orders: TOrder[];
  requestStatus :boolean;
  isLoading: boolean;
  error: null | undefined;
}

export const initialState: OrderState = {
  data: [],
  order: {
    createdAt: '',
    ingredients: [''],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  },
  requestStatus :false,
  orders: [],
  isLoading: false,
  error: null
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

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      return { ...state, order: action.payload, requestStatus:action.payload.requestStatus };
    },
    getOrders: (state, action) => {
      return { ...state, ordersData: action.payload };
    }
  },
  selectors: {
    getOrderSelector: (state) => {
      return state;
    },
    isLoadingSelector: (state) => {
      return state.isLoading;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.fulfilled, (state, action: PayloadAction<TNewOrderResponse>) => {
        state.order = action.payload.order;
         state.requestStatus = action.payload.success
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;          
        }
      );
  }
});

export const { addOrder, getOrders } = orderSlice.actions;

export default orderSlice.reducer;
