import feedSlice, { fetchOrders, initialState } from './feedSlice';
import { mockStore } from './mockData';
import { getOrderByNumber } from './feedSlice';

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
describe('тестирование асинхронных экшенов', () => {
  test('Тест запроса ленты заказов', () => {
    const newState = feedSlice(
      { ...initialState, error: 'testError' },
      fetchOrders.pending('')
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe('');
  });
  test('Тест выполненного запроса ленты заказов', () => {
    const newState = feedSlice(
      { ...initialState, isLoading: true },
      fetchOrders.fulfilled(testOrders, '')
    );
    expect(newState).toEqual({
      ordersData: {
        orders: testOrders.orders,
        success: true,
        total: testOrders.total,
        totalToday: testOrders.totalToday
      },
      isLoading: false,
      order: null,
      error: ''
    });
  });
  test('Тест реджекта запроса ленты заказов', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = feedSlice(initialState, fetchOrders.rejected(mockAnswer, ''));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });
  test('Тест запроса заказа по номеру', () => {
    const state = feedSlice(
      { ...initialState, error: 'testError' },
      getOrderByNumber.pending('', 1)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });
  test('Тест выполненного запроса по номеру заказа', () => {
    const newState = feedSlice(
      { ...initialState, isLoading: true },
      getOrderByNumber.fulfilled(testOrders, '', 1)
    );
    expect(newState).toEqual({
      ordersData: {
        orders: [],
        total: 0,
        totalToday: 0
      },
      isLoading: false,
      order: testOrders.orders[0],
      error: ''
    });
  });
  test('Тест реджекта запроса заказа по номеру', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const before = {
      ...initialState,
      error: '',
      ordersData: { orders: mockStore.orders, total: 2, totalToday: 0 }
    };
    const state = feedSlice(
      before,
      getOrderByNumber.rejected(mockAnswer, mockAnswer.message, 1)
    );
    expect(state.isLoading).toBe(false);
    return expect(
      getOrderByNumber.rejected(mockAnswer, '', 0).error.message
    ).toBe('error');
  });
});
