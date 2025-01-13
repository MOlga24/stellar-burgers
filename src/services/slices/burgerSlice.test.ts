import  burgerSlice, { fetchIngredients, initialState } from "./burgerSlice";

describe('тестирование асинхронных экшенов', () => {
    test('Test запроса заказа бургера ', () => {
      const state = burgerSlice(
        initialState,
        fetchIngredients.pending('')
      );
      expect(state.isLoading).toBe(true);
    });
})
