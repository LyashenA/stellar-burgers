import userOrdersReducer, { fetchUserOrders } from './user-orders-slice';
import userOrdersData from './fixtures/userOrdersData';

describe('тесты редьюсера userOrders', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  test('должен обрабатывать fetchUserOrders.pending', () => {
    const newState = userOrdersReducer(
      initialState,
      fetchUserOrders.pending('')
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull;
  });

  test('должен обрабатывать fetchUserOrders.fulfilled', () => {
    const orders = userOrdersData.orders;
    const newState = userOrdersReducer(
      initialState,
      fetchUserOrders.fulfilled(orders, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.orders).toEqual(orders);
  });

  test('должен обрабатывать fetchUserOrders.rejected', () => {
    const error = new Error('Не удалось загрузить заказы');
    const newState = userOrdersReducer(
      initialState,
      fetchUserOrders.rejected(error, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Не удалось загрузить заказы');
  });
});
