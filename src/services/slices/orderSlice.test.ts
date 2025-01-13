import { configureStore } from '@reduxjs/toolkit';
import { burgerSlice } from './burgerSlice';
import { mockBun, mockIngredient, mockStore } from './mockData';
import orderSlice, {
  addIngredient,
  clearOrder,
  fetchOrderBurger,
  fetchUserOrders,
  getBasketItemsSelector,
  getOrderModalData,
  getOrders,
  initialState,
  removeIngredient,
  reorderIngredients
} from './orderSlice';
import { error } from 'console';
import uuid from 'react-uuid';

function initStore() {
  return configureStore({
    reducer: orderSlice,
    preloadedState: {
      basket: {
        bun: mockStore.constructorItems.bun,
        ingredients: mockStore.constructorItems.ingredients
      },
      order: null,
      requestStatus: mockStore.orderRequest,
      isOrdersLoading: mockStore.isLoading,
      orders: mockStore.orders,
      error: mockStore.error,
      orderRequest: false
    }
  });
}
describe('тестирование экшенов', () => {
  test('тест добавления булки', () => {
    const newState = orderSlice(initialState, addIngredient(mockBun));
    expect(newState.basket.bun).toEqual({ ...mockBun, id: expect.any(String) });
  });
  test('тест добавления ингредиентов', () => {
    const newState = orderSlice(initialState, addIngredient(mockIngredient));
    expect(newState.basket.ingredients.length).toEqual(1);
    expect(newState.basket.ingredients[0]).toEqual({
      ...mockIngredient,
      id: expect.any(String)
    });
  });
});

test('тест удаления ингредиента', () => {
  const before = {
    ...initialState,
    basket: { bun: null, ingredients: mockStore.constructorItems.ingredients }
  };
  const after = orderSlice(before, removeIngredient(0));
  expect(before.basket.ingredients.length).toBe(3);
  expect(after.basket.ingredients.length).toBe(2);
  expect(after.basket.ingredients[0]).toEqual(
    mockStore.constructorItems.ingredients[1]
  );
});

test('тест передвинуть ингредиент вверх', () => {
  const before = {
    ...initialState,
    basket: { bun: null, ingredients: mockStore.constructorItems.ingredients }
  };
  let ingredients = before.basket.ingredients;
  const index = ingredients.length - 1;
  const lastIngredient = ingredients[index];
  const after = orderSlice(
    before,
    reorderIngredients({ from: index, to: index - 1 })
  );
  expect(after.basket.ingredients[index - 1]).toEqual(lastIngredient);
});

test('тест передвинуть ингредиент вниз', () => {
  const before = {
    ...initialState,
    basket: { bun: null, ingredients: mockStore.constructorItems.ingredients }
  };
  let ingredients = before.basket.ingredients;
  const index = ingredients.length - 1;
  const firstIngredient = ingredients[index - 2];
  const after = orderSlice(
    before,
    reorderIngredients({ from: index - 2, to: index - 1 })
  );
  expect(after.basket.ingredients[index - 1]).toEqual(firstIngredient);
});
describe('тестирование асинхронных экшенов', () => {
  test('Test запроса заказа бургера ', () => {
    const state = orderSlice(
      initialState,
      fetchOrderBurger.pending('', [], '')
    );
    expect(state.orderRequest).toBe(true);
  });
  test('Test реджекта запроса заказа бургера ', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const store = initStore();
    const state = orderSlice(
      initialState,
      fetchOrderBurger.rejected(mockAnswer, '', [])
    );
    const error = store.getState().error;
    expect(state.orderRequest).toBe(false);
    expect(error).toBe('test error text');
  });
});
describe('тестирование асинхронных экшенов для заказов пользователя', () => {
  test('Test запроса заказов пользователя ', () => {
    const state = orderSlice(initialState, fetchUserOrders.pending(''));
    expect(state.requestStatus).toBe(true);
    expect(state.isOrdersLoading).toBe(true);
  });
  test('тест реджекта запроса заказов пользователя', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = orderSlice(
      initialState,
      fetchUserOrders.rejected(mockAnswer, '')
    );
    expect(state.orderRequest).toBe(false);
    expect(state.isOrdersLoading).toBe(false);
    return expect(fetchUserOrders()).rejects.toThrow();
  });
});
test('тест удаления данных заказа и очистки корзины', () => {
  const before = {    
    basket: {
      bun: mockStore.constructorItems.bun,
      ingredients: mockStore.constructorItems.ingredients
    },
    order: mockStore.orderModalData,
    requestStatus: true,
    orders: [],
    isOrdersLoading: false,
    error: '',
    orderRequest: true
  };
const after=orderSlice(before,clearOrder());
expect(after.basket).toEqual(initialState.basket);
expect(after.order).toEqual(initialState.order);
expect(after.orderRequest).toEqual(initialState.orderRequest);
});

// test('получение заказов', () => {
//   const after =orderSlice(initialState,getOrders(initialState.orders)) 
// //   const store = initStore();
// //   const initialOrders = selectOrders(store.getState()).length;
// //   store.dispatch(removeOrders());
// //   const orders = selectOrders(store.getState()).length;
// //   expect(initialOrders).toBe(2);
//  expect(after.orders).toBe(0);
// });

test('тест удаления заказа', () => {
  const store = initStore();
  store.dispatch(clearOrder());
  const order = store.getState().order;
  expect(order).toBe(null);
});

// test('Test setErrorText', () => {
//   const store = initStore();
//   store.dispatch(setErrorText('my test error'));
//   const errorText = selectErrorText(store.getState());
//   expect(errorText).toBe('my test error');
// });

// test('Test removeErrorText', () => {
//   const store = initStore();
//   store.dispatch(setErrorText('Error here!'));
//   store.dispatch(removeErrorText());
//   const errorText = selectErrorText(store.getState());
//   expect(errorText).toBe('');
// });

// });
