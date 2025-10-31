import feedReducer, { fetchFeeds, initialState } from './feed-slice';
import orderFeed from './fixtures/orderFeed';

describe('тесты редьюсера feed', () => {
  test('должен обрабатывать fetchFeeds.pending', () => {
    const newState = feedReducer(
      initialState,
      fetchFeeds.pending('', undefined)
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull;
  });

  test('должен обрабатывать fetchFeeds.fulfilled', () => {
    const mockIngredients = orderFeed;
    const newState = feedReducer(
      initialState,
      fetchFeeds.fulfilled(mockIngredients, '', undefined)
    );

    expect(newState.loading).toBe(false);
    expect(newState.orders).toEqual(mockIngredients.orders);
    expect(newState.total).toBe(mockIngredients.total);
    expect(newState.totalToday).toBe(mockIngredients.totalToday);
  });

  test('должен обрабатывать fetchFeeds.rejected', () => {
    const error = new Error('Ошибка загрузки ленты заказов');
    const newState = feedReducer(
      initialState,
      fetchFeeds.rejected(error, '', undefined)
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка загрузки ленты заказов');
  });
});
