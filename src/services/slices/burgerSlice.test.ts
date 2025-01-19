import  burgerSlice, { fetchIngredients, initialState } from "./burgerSlice";
import { mockStore } from "./mockData";

describe('тестирование асинхронных экшенов', () => {
    test('тест запроса ингредиентов ', () => {
      const newState = burgerSlice(
        {...initialState,error:'test error'},
        fetchIngredients.pending('')
      );
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe('');
    });
    test('тест выполненного запроса ингредиентов ', () => {
      const newState = burgerSlice(
        {...initialState,isLoading:true},
        fetchIngredients.fulfilled(mockStore.ingredients,'')
      );
      expect(newState).toEqual({
        ingredients:mockStore.ingredients,
        isLoading:false, 
        error:''
      })
    });
    test('тест реджекта запроса ингредиентов ', () => {
      const mockAnswer = { name: 'test', message: 'error' };
      const newState = burgerSlice(
        {...initialState,isLoading:true},
        fetchIngredients.rejected(mockAnswer,'')
      );
      expect(newState).toEqual({
        ingredients:[],
        isLoading:false, 
        error:mockAnswer.message
    });
});
})
