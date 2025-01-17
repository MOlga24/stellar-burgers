import userSlice, {
  fetchUserApi,
  fetchUserLog,
  fetchUserLogOut,
  fetchUserReg,
  initialState
} from './userSlice';
describe('тестирование асинхронных экшенов для слайса пользователя', () => {
  test('тест запроса регистрации пользователя ', () => {
    const state = userSlice(
      initialState,
      fetchUserReg.pending('', { email: '', name: '', password: '' })
    );
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
    expect(state.isLoading).toBe(true);
  });
  test('тест реджекта запроса регистрации пользователя', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = userSlice(
      initialState,
      fetchUserReg.rejected(mockAnswer, '', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(state.isLoading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    return expect(
      fetchUserReg.rejected(mockAnswer, '', {
        email: '',
        name: '',
        password: ''
      }).error.message
    ).toBe('error');
  });
  test('тест запроса api пользователя ', () => {
    const state = userSlice(initialState, fetchUserApi.pending(''));
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
    expect(state.isLoading).toBe(true);
  });
  test('тест реджекта запроса api пользователя', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = userSlice(
      initialState,
      fetchUserApi.rejected(mockAnswer, '')
    );
    expect(state.user).toBe(null);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    return expect(fetchUserApi.rejected(mockAnswer, '').error.message).toBe(
      'error'
    );
  });
  test('тест запроса логина пользователя ', () => {
    const state = userSlice(
      initialState,
      fetchUserLog.pending('', { email: '', password: '' })
    );
    expect(state.isLoading).toBe(true);
  });
  test('тест реджекта запроса логина пользователя', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = userSlice(
      initialState,
      fetchUserLog.rejected(mockAnswer, '', { email: '', password: '' })
    );
    expect(state.userCheck).toBe(true);
    expect(state.isLoading).toBe(false);
    return expect(
      fetchUserLog.rejected(mockAnswer, '', { email: '', password: '' }).error
        .message
    ).toBe('error');
  });
  test('тест запроса логаута пользователя ', () => {
    const state = userSlice(initialState, fetchUserLogOut.pending('test'));
    expect(state.isLoading).toBe(true);
    expect(state.isAuthenticated).toBe(true);
  });
  test('тест реджекта запроса логаута пользователя', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = userSlice(
      initialState,
      fetchUserLogOut.rejected(mockAnswer, '')
    );
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toBe(null);
    return expect(fetchUserLogOut.rejected(mockAnswer, '').error.message).toBe(
      'error'
    );
  });
});
