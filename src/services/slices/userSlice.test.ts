import {
  userSlice,
  fetchUserApi,
  fetchUserLog,
  fetchUserLogOut,
  fetchUserReg,
  initialState,
  authChecked,
  fetchUserUpdate
} from './userSlice';

const newUser = {
  email: 'om@mail.ru',
  name: 'omtest12'
};

const newUserReg = {
  email: 'om@mail.ru',
  name: 'omtest12',
  password: 'password'
};

const newUserLog = {
  email: 'om@mail.ru',
  password: 'password'
};

const updateUser = {
  email: 'om@mail.ru',
  name: 'omtest123'
};

describe('тестирование экшенов для слайса пользователя', () => {
  test('тест редьюсера authChecked', () => {
    const before = { ...initialState, userCheck: false };
    const after = userSlice.reducer(before, authChecked());
    expect(after).toEqual({ ...before, userCheck: true });
  });
});

describe('тестирование асинхронных экшенов для слайса пользователя', () => {
  test('тест запроса регистрации пользователя ', () => {
    const state = userSlice.reducer(
      { ...initialState, error: 'test error' },
      fetchUserReg.pending('', { email: '', name: '', password: '' })
    );
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });

  test('тест выполненного запроса регистрации пользователя ', () => {
    const state = userSlice.reducer(
      initialState,
      fetchUserReg.fulfilled(newUser, '', newUserReg)
    );
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toBe(newUser);
    expect(state.isLoading).toBe(false);
  });

  test('тест реджекта запроса регистрации пользователя', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const newState = userSlice.reducer(
      { ...initialState, error: '' },
      fetchUserReg.rejected(mockAnswer, '', newUserReg)
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.error).toBe(mockAnswer.message);
  });

  test('тест запроса api пользователя ', () => {
    const newState = userSlice.reducer(
      { ...initialState, error: 'test error' },
      fetchUserApi.pending('')
    );
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.user).toBe(null);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe('');
  });

  test('тест выполненного запроса api пользователя ', () => {
    const newState = userSlice.reducer(
      { ...initialState, error: 'test error' },
      fetchUserApi.fulfilled({ success: true, user: newUser }, '')
    );
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user).toBe(newUser);
    expect(newState.userCheck).toBe(true);
    expect(newState.isLoading).toBe(false);
  });

  test('тест реджекта запроса api пользователя', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const newState = userSlice.reducer(
      { ...initialState, error: '' },
      fetchUserApi.rejected(mockAnswer, '')
    );
    expect(newState.user).toBe(null);
    expect(newState.isLoading).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.error).toBe(mockAnswer.message);
  });

  test('тест запроса логина пользователя ', () => {
    const newState = userSlice.reducer(
      { ...initialState, error: 'test error' },
      fetchUserLog.pending('', newUserLog)
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe('');
  });

  test('тест выполненного запроса логина пользователя ', () => {
    const newState = userSlice.reducer(
      initialState,
      fetchUserLog.fulfilled(
        {
          success: true,
          refreshToken: 'testRefreshToken',
          accessToken: 'testAccessToken',
          user: newUser
        },
        '',
        newUserReg
      )
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user).toBe(newUser);
    expect(newState.userCheck).toBe(true);
  });

  test('тест реджекта запроса логина пользователя', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const newState = userSlice.reducer(
      { ...initialState, error: '' },
      fetchUserLog.rejected(mockAnswer, '', newUserLog)
    );
    expect(newState.userCheck).toBe(true);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockAnswer.message);
  });

  test('тест запроса апдейта пользователя ', () => {
    const newState = userSlice.reducer(
      initialState,
      fetchUserUpdate.pending('', updateUser)
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.isAuthenticated).toBe(true);
  });

  test('тест выполненного запроса апдейта пользователя ', () => {
    const newState = userSlice.reducer(
      initialState,
      fetchUserUpdate.fulfilled(
        { success: true, user: updateUser },
        '',
        newUser
      )
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user).toBe(updateUser);
    expect(newState.userCheck).toBe(false);
    expect(newState.error).toBe('');
  });

  test('тест реджекта запроса апдейта  пользователя', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const newState = userSlice.reducer(
      { ...initialState, error: '' },
      fetchUserUpdate.rejected(mockAnswer, '', newUser)
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockAnswer.message);
  });

  test('тест запроса логаута пользователя ', () => {
    const newState = userSlice.reducer(
      {
        ...initialState,
        user: newUser,
        isAuthenticated: true,
        error: 'test error'
      },
      fetchUserLogOut.pending('test')
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.error).toBe('');
  });

  test('тест выполненного запроса логаута пользователя ', () => {
    const newState = userSlice.reducer(
      initialState,
      fetchUserLogOut.fulfilled(undefined, '')
    );
    expect(newState.user).toBe(null);
    expect(newState.userCheck).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.isLoading).toBe(false);
  });

  test('тест реджекта запроса логаута пользователя', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const newState = userSlice.reducer(
      { ...initialState, isAuthenticated: true, user: newUser, error: '' },
      fetchUserLogOut.rejected(mockAnswer, '')
    );
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockAnswer.message);
  });
});
