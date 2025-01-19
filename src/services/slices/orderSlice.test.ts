import { configureStore } from '@reduxjs/toolkit';
import { mockBun, mockIngredient, mockStore } from './mockData';
import orderSlice, {
  addIngredient,
  clearOrder,
  fetchOrderBurger,
  fetchUserOrders,
  initialState,
  removeIngredient,
  reorderIngredients
} from './orderSlice';
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
const testOrders = {
  orders: [
    {
      _id: '664e927097ede0001d06bdb9',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-05-23T00:48:48.039Z',
      updatedAt: '2024-05-23T00:48:48.410Z',
      number: 40680
    },
    {
      _id: '664e85e497ede0001d06bda7',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-05-22T23:55:16.472Z',
      updatedAt: '2024-05-22T23:55:16.866Z',
      number: 40679
    }
  ],
  success: true,
  total: 2,
  totalToday: 2
};
describe('тестирование экшенов конструктора заказа', () => {
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
const newOrder = {
  success: true,
  name: 'Флюоресцентный люминесцентный бургер',
  order: {
    _id: '6627770797ede0001d067400',
    status: 'done',
    createdAt: '2024-04-23T08:53:27.817Z',
    updatedAt: '2024-04-23T08:53:28.481Z',
    number: 38671,
    name: 'Флюоресцентный люминесцентный бургер',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ]
  }
};

describe('тестирование асинхронных экшенов', () => {
  test('тест запроса заказа бургера ', () => {
    const newState = orderSlice(
      { ...initialState, error: 'test error text' },
      fetchOrderBurger.fulfilled(newOrder, '', [])
    );
    expect(newState.order).toBe(newOrder.order);
    expect(newState.orderRequest).toBe(false);
    expect(newState.isOrdersLoading).toBe(false);
    expect(newState.basket).toStrictEqual({ bun: null, ingredients: [] });
    expect(newState.error).toBe('');
  });

  test('тест запроса заказа бургера ', () => {
    const newState = orderSlice(
      { ...initialState, error: 'test error text' },
      fetchOrderBurger.pending('', [], '')
    );
    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBe('');
  });

  test('тест реджекта запроса заказа бургера ', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const newState = orderSlice(
      { ...initialState, error: '' },
      fetchOrderBurger.rejected(mockAnswer, '', [])
    );
    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe(mockAnswer.message);
  });
});

describe('тестирование асинхронных экшенов для заказов пользователя', () => {
  test('тест запроса заказов пользователя ', () => {
    const newState = orderSlice(
      { ...initialState, error: 'test error text' },
      fetchUserOrders.pending('')
    );
    expect(newState.requestStatus).toBe(true);
    expect(newState.isOrdersLoading).toBe(true);
    expect(newState.error).toBe('');
  });

  test('тест выполненного запроса заказов пользователя ', () => {
    const newState = orderSlice(
      initialState,
      fetchUserOrders.fulfilled(testOrders.orders, '')
    );
    expect(newState.requestStatus).toBe(false);
    expect(newState.isOrdersLoading).toBe(false);
    expect(newState.orders).toBe(testOrders.orders);
  });

  test('тест реджекта запроса заказов пользователя', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const newState = orderSlice(
      { ...initialState, error: '' },
      fetchUserOrders.rejected(mockAnswer, '')
    );
    expect(newState.orderRequest).toBe(false);
    expect(newState.isOrdersLoading).toBe(false);
    expect(newState.error).toBe(mockAnswer.message);
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
  const after = orderSlice(before, clearOrder());
  expect(after.basket).toEqual(initialState.basket);
  expect(after.order).toEqual(initialState.order);
  expect(after.orderRequest).toEqual(initialState.orderRequest);
});
