import ingredientsReducer, {
  fetchIngredients,
  initialState
} from './ingredients-slice';
import ingredientsData from '../../../../cypress/fixtures/ingredients.json';

describe('тесты редьюсера ingredients', () => {
  test('должен обрабатывать fetchIngredients.pending', () => {
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.pending('')
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull;
  });

  test('должен обрабатывать fetchIngredients.fulfilled', () => {
    const mockIngredients = ingredientsData.data;
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.items).toEqual(mockIngredients);
  });

  test('должен обрабатывать fetchIngredients.rejected', () => {
    const error = new Error('Ошибка загрузки ингридиентов');
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(error, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка загрузки ингридиентов');
  });
});
