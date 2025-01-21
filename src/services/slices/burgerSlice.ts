/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';
export interface IngredientsListState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | undefined;
}
export const initialState: IngredientsListState = {
  ingredients: [],
  isLoading: false,
  error: ''
};

export const fetchIngredients = createAsyncThunk(
  'api/burger-api.ts',
  async () => {
    const newIngredient = await getIngredientsApi();
    return newIngredient;
  }
);

export const burgerSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => {
      return state.ingredients;
    },
    isLoadingSelector: (state) => {
      return state.isLoading;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state, action) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;      
      });
  }
});

export const { getIngredientsSelector, isLoadingSelector } =
  burgerSlice.selectors;
export default burgerSlice.reducer;
