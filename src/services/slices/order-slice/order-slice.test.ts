import orderSliceReducer, { addIngredient, moveIngredient, removeIngredient } from './order-slice';
import { bun, salad, cheese, meat } from './fixtures/ingredients';

describe('тесты синхронных экшенов', () => {
  const initialOrderState = {
    constructorItems: {
      bun: bun,
      ingredients: [
        { ...salad, id: '1' },
        { ...cheese, id: '2' }
      ]
    },
    loading: false,
    orderModalData: null,
    error: null,
    currentOrder: null
  };

  test('обработка экшена добавления ингредиента', () => {
    const newState = orderSliceReducer(
      initialOrderState,
      addIngredient({ ...meat, id: '3' })
    );

    expect(newState.constructorItems.ingredients).toHaveLength(3);
    expect(newState.constructorItems.ingredients[2]).toEqual({
      ...meat,
      id: '3'
    });
  });

  test('обработка экшена удаления ингредиента', () => {
    const newState = orderSliceReducer(initialOrderState, removeIngredient(0));

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients).toEqual([
      { ...cheese, id: '2' }
    ]);
  });

  test('обработка экшена изменения порядка ингредиентов в начинке', () => {
    const newState = orderSliceReducer(
      initialOrderState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(newState.constructorItems.ingredients).toHaveLength(2);
    expect(newState.constructorItems.ingredients).toEqual([
      { ...cheese, id: '2' },
      { ...salad, id: '1' }
    ]);
  });
});
