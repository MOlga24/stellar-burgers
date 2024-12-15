/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    removeBun: (state, { payload }) => {
      state.ingredients = state.ingredients.filter(
        (b) => state.ingredients.indexOf(b) !== payload
      );
    },
    reorderBasket: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;

      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);

      state.ingredients = ingredients;
    }
  }
});

export const { addBun, removeBun, reorderBasket } = basketSlice.actions;

export default basketSlice.reducer;
