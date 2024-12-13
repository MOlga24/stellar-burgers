/* eslint-disable */
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  getIngredientsApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { TIngredient } from '@utils-types';

export interface BasketState {
  bun: TIngredient | undefined;
  ingredients: TIngredient[];
}

export const initialState: BasketState = {
  bun: undefined,
  ingredients: []
};
export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addBun: (state, action) => {
      if (action.payload.type === 'bun') {
        return { ...state, bun: action.payload };
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload]
        };
      }
    },
    removeBun: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (b) => b._id !== action.payload._id
      );
    }
  }
});

export const { addBun, removeBun } = basketSlice.actions;

export default basketSlice.reducer;
