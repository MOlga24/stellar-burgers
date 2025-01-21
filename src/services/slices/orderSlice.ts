/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';
import uuid from 'react-uuid';

export interface OrderState {
  basket: { bun: TIngredient | null; ingredients: TIngredient[] };
  order: TOrder | null;
  orders: TOrder[];
  requestStatus: boolean;
  orderRequest: boolean;
  isOrdersLoading: boolean;
  error: string | undefined;
}

export const initialState: OrderState = {
  basket: { bun: null, ingredients: [] },
  order: null,
  requestStatus: false,
  orders: [],
  isOrdersLoading: false,
  error: '',
  orderRequest: false
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
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TIngredient>) => {
        if (payload.type === 'bun') {
          state.basket.bun = payload;
        } else {
          state.basket.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeIngredient: (state, { payload }) => {
      state.basket.ingredients = state.basket.ingredients.filter(
        (b) => state.basket.ingredients.indexOf(b) !== payload
      );
    },

    reorderIngredients: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;

      const ingredients = [...state.basket.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);

      state.basket.ingredients = ingredients;
    },
    getOrders: (state, action) => {
      return { ...state, ordersData: action.payload };
    },
    clearOrder: (state) => {
      state.basket = initialState.basket;
      state.order = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getBasketItemsSelector: (state) => state,
    getOrderRequestSelector: (state) => state.orderRequest,
    isOrderLoadingSelector: (state) => state.isOrdersLoading,
    getOrderModalData: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.pending, (state) => {
        state.isOrdersLoading = true;
        state.orderRequest = true;
        state.error =''
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.orderRequest = false;
        state.isOrdersLoading = false;
        (state.basket.bun = null),
          (state.basket.ingredients = []),
          (state.error = '');
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.error = action.error.message;
        state.isOrdersLoading = false;
        state.orderRequest = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.requestStatus = false;
        state.orders = action.payload;
        state.isOrdersLoading = false;
        state.error = '';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.requestStatus = true;
        state.isOrdersLoading = true;
        state.error ='';
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.orders = [];
        state.requestStatus = false;
        state.isOrdersLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { addIngredient, getOrders, clearOrder, removeIngredient, reorderIngredients } =
  orderSlice.actions;
export const {
  getBasketItemsSelector,
  getOrderRequestSelector,
  isOrderLoadingSelector,
  getOrderModalData
} = orderSlice.selectors;
export default orderSlice.reducer;
