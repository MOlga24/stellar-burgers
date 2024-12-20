/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi, TNewOrderResponse } from '../../utils/burger-api';
import { RootState } from '@store';

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
export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNum',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue('Error feed data');
    }
  }
);
export const orderDataSelector =
(number:number)=>(state:RootState)=>{
  if (state.feed.ordersData.orders.length){
    const data=state.feed.ordersData.orders.find((item)=>item.number=== number);
    if (data) return data;
  }
  if (state.order.orders.length){
    const data=state.order.orders.find((item)=>item.number=== +number);
    if (data) return data;
  }
  // if (state.order.orderByNumber?.number ===+number){
  //   return state.order.orderByNumber
  // }
    return null
}
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      return { ...state, order: action.payload,
        // requestStatus:false
         };
    },
    getOrders: (state, action) => {
      return { ...state, ordersData: action.payload };
    },
    clearOrder: (state, action) => {
      return { ...state, order:null, data:[]     
    
 } }},
  selectors: {
    getOrderSelector: (state) => {
      return state.order;
    },
    isOrderLoadingSelector: (state) => {
      return state.isLoading;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order
       state.requestStatus = action.payload.success
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action) => {
          state.orders = action.payload;   
          state.isLoading=false;       
        }
      )
      .addCase(
        fetchUserOrders.pending,
        (state) => {           
          state.isLoading=true;       
        }
      )
      .addCase(
        fetchUserOrders.rejected,
        (state) => {
          state.orders = [] 
          state.isLoading=false;       
        }
      );
  }
});

export const { addOrder, getOrders,clearOrder } = orderSlice.actions;
export const {getOrderSelector,isOrderLoadingSelector} =orderSlice.selectors
export default orderSlice.reducer;
