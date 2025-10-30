import userReducer, {
  getUser,
  login,
  logout,
  register,
  updateUser
} from './user-slice';

describe('тесты редьюсера user', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null
  };
  const user = { email: 'test@mail.com', name: 'Test' };

  // Тесты асинхронного экшена register
  test('должен обрабатывать register.pending', () => {
    const newState = userReducer(
      initialState,
      register.pending('', { email: '', password: '', name: '' })
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull;
  });

  test('должен обрабатывать register.fulfilled', () => {
    const data = { email: 'test@mail.com', password: '12345', name: 'Test' };
    const newState = userReducer(
      initialState,
      register.fulfilled(user, '', data)
    );

    expect(newState.user).toEqual(user);
    expect(newState.loading).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать register.rejected', () => {
    const error = new Error('Ошибка регистрации');
    const newState = userReducer(
      initialState,
      register.rejected(error, '', { email: '', password: '', name: '' })
    );

    expect(newState.loading).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.error).toBe('Ошибка регистрации');
  });

  // Тесты асинхронного экшена login
  test('должен обрабатывать login.pending', () => {
    const newState = userReducer(
      initialState,
      login.pending('', { email: '', password: '' })
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull;
  });

  test('должен обрабатывать login.fulfilled', () => {
    const data = { email: 'test@mail.com', password: '12345' };
    const newState = userReducer(initialState, login.fulfilled(user, '', data));

    expect(newState.user).toEqual(user);
    expect(newState.loading).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать login.rejected', () => {
    const error = new Error('Ошибка входа');
    const newState = userReducer(
      initialState,
      login.rejected(error, '', { email: '', password: '' })
    );

    expect(newState.loading).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.error).toBe('Ошибка входа');
  });

  // Тесты асинхронного экшена getUser
  test('должен обрабатывать getUser.pending', () => {
    const newState = userReducer(initialState, getUser.pending(''));

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull;
  });

  test('должен обрабатывать getUser.fulfilled', () => {
    const newState = userReducer(initialState, getUser.fulfilled(user, ''));

    expect(newState.user).toEqual(user);
    expect(newState.loading).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать getUser.rejected', () => {
    const error = new Error('Не удалось получить данные пользователя');
    const newState = userReducer(initialState, getUser.rejected(error, ''));

    expect(newState.loading).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.error).toBe('Не удалось получить данные пользователя');
  });

  // Тесты асинхронного экшена updateUser
  test('должен обрабатывать updateUser.pending', () => {
    const newState = userReducer(
      initialState,
      updateUser.pending('', { email: '', password: '', name: '' })
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull;
  });

  test('должен обрабатывать updateUser.fulfilled', () => {
    const data = { email: 'test@mail.com', password: '12345', name: 'Test' };
    const newState = userReducer(
      initialState,
      updateUser.fulfilled(user, '', data)
    );

    expect(newState.user).toEqual(user);
    expect(newState.loading).toBe(false);
  });

  test('должен обрабатывать updateUser.rejected', () => {
    const error = new Error('Ошибка обновления данных');
    const newState = userReducer(
      initialState,
      updateUser.rejected(error, '', { email: '', password: '', name: '' })
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка обновления данных');
  });

  // Тесты асинхронного экшена logout
  test('должен обрабатывать logout.pending', () => {
    const newState = userReducer(initialState, logout.pending(''));

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull;
  });

  test('должен обрабатывать logout.fulfilled', () => {
    const newState = userReducer(initialState, logout.fulfilled(null, ''));

    expect(newState.user).toBeNull;
    expect(newState.loading).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать logout.rejected', () => {
    const error = new Error('Ошибка выхода');
    const newState = userReducer(initialState, logout.rejected(error, ''));

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка выхода');
  });
});
