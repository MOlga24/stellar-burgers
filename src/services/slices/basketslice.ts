/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction, UnknownAction } from '@reduxjs/toolkit';
import { getIngredientsApi, loginUserApi, registerUserApi, TLoginData, TRegisterData} from '@api';
import { TConstructorIngredient, TIngredient } from '@utils-types';
export type TBasketIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  count:number;
};
export interface BasketState{
    items: TBasketIngredient [],

}
// type TIngredientsWithCount = {
//   [key: string]: TIngredient & { count: number };
// };
export const initialState: BasketState = {
  items:[],

};
const cartReducer = (state:BasketState, action:any) => {
  let cart = state.items;

  switch (action.type) {
     case 'ADD_TO_CART':
        cart.push(action.payload);
        return {
           ...state, cart: cart
        };

     case 'UPDATE_CART_QUANTITY':
        let item = cart.find(item => item._id === action.payload._id);
        let newCart = cart.filter(item => item._id !== action.payload.payload._id);
        if(item)
       {item.count = action.payload.count;
        newCart.push(item);}
        return {
           ...state, cart: newCart
        };

     case 'REMOVE_FROM_CART':
        return {
           ...state, cart: cart.filter(item => item._id !== action.payload._id)
        };

     default:
        return state;
  }
};

export default cartReducer;

