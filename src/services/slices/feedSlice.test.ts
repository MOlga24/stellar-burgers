import feedSlice, { fetchOrders, initialState } from './feedSlice';
import { mockStore } from './mockData';
import { getOrderByNumber } from './orderSlice';

describe('тестирование асинхронных экшенов', () => {
  test('Тест запроса ленты заказов', () => {
    const state = feedSlice(initialState, fetchOrders.pending(''));
    expect(state.isLoading).toBe(true);
  });
  test('Тест реджекта запроса ленты заказов', () => {
    const mockAnswer = { name: 'test', message: 'error' };    
    const state = feedSlice(initialState, fetchOrders.rejected(mockAnswer, ''));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });
  test('Тест запроса заказа по номеру', () => {
    const state = feedSlice(initialState, getOrderByNumber.pending('', 1));
    expect(state.isLoading).toBe(false);
  });
  test('Тест реджекта запроса заказа по номеру', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const before = {
      ...initialState,
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
