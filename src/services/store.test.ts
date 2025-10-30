import { rootReducer } from './store';
import ingredientsReducer from './slices/ingredients-slice/ingredients-slice';
import orderReducer from './slices/order-slice/order-slice';
import feedReducer from './slices/feed-slice/feed-slice';
import userReducer from './slices/user-slice/user-slice';
import userOrdersReducer from './slices/user-orders-slice/user-orders-slice';

describe('rootReducer', () => {
  test('должен корректно инициализировать стор', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, { type: '' }),
      order: orderReducer(undefined, { type: '' }),
      feed: feedReducer(undefined, { type: '' }),
      user: userReducer(undefined, { type: '' }),
      userOrders: userOrdersReducer(undefined, { type: '' })
    });
  });
});
