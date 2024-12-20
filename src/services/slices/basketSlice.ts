/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-uuid';
import { TIngredient } from '@utils-types';

export interface BasketState {
  bun: TIngredient | undefined;
  ingredients: TIngredient[];
  id: string[];
}

export const initialState: BasketState = {
  bun: undefined,
  ingredients: [],
  id: []
};
export const basketSlice = createSlice({
  name: 'basket',
  initialState,

  reducers: {
    addBun: {
      reducer: (state, { payload }: PayloadAction<TIngredient>) => {
        state.id.push(payload._id);
        if (payload.type === 'bun') {
          state.bun = payload;
          state.id.push(payload._id);
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeBun: (state, { payload }) => {
      state.ingredients = state.ingredients.filter(
        (b) => state.ingredients.indexOf(b) !== payload
      );
    },
    clearBasket: (state, action) => {
      (state.bun = undefined), (state.ingredients = []), (state.id = []);
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
  },
  selectors: {
    getItems: (state) => state
  }
});

export const { addBun, removeBun, reorderBasket, clearBasket } =
  basketSlice.actions;
export const { getItems } = basketSlice.selectors;
export default basketSlice.reducer;
