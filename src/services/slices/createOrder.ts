/* eslint-disable */
import {
  createSlice 
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';



export interface OrderState {
data:TOrder| null;
}

export const initialState: OrderState= {
  data:  null
};
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
     
       return{...state,data:action.payload}
      
      }
    },
    // removeBun: (state, action) => {
    //   state.ingredients = state.ingredients.filter(
    //     (b) => b._id !== action.payload._id
    //   );
    // }
  }
);

export const {   addOrder} = orderSlice.actions;

export default orderSlice.reducer;
