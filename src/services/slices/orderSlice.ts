/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi } from '../../utils/burger-api';

export interface OrderState {
  order: TOrder | undefined;
  data: string[];
  orders: TOrder[];

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
      return { ...state, order: action.payload };
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
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order;
        // state.requestStatus = RequestStatus.Success;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          // state.requestStatus = RequestStatus.Success;
        }
      );
  }
});

export const { addOrder, getOrders } = orderSlice.actions;

export default orderSlice.reducer;
