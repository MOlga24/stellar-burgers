import store, { rootReducer } from './store';
// check that initial state of the root reducer matches
// what child reducers return given an empty action
describe('тест rootReducer', () => {
  test('тест возвращает корректное начальное состояние хранилища', () => {
    const newAction = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, newAction);
    expect(initialState).toEqual(store.getState());
  });
});
