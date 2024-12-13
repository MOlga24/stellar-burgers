/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi} from '@api';
import { TIngredient } from '@utils-types';
import { userRegSlice } from './slices/Regslice';
export interface IngredientsListState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: null | undefined;
}
export const initialState: IngredientsListState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk('api/burger-api.ts', async () => {
  const newIngredient = await getIngredientsApi();
  return newIngredient;
});


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
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    });
  }
});



export const { getIngredientsSelector,isLoadingSelector } = burgerSlice.selectors;
export default burgerSlice.reducer;
