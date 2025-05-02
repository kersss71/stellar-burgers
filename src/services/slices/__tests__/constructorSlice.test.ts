import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../constructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { mockIngredient1, mockIngredient2 } from '../mockIngredients';

jest.mock('@reduxjs/toolkit', () => {
  const originalModule = jest.requireActual('@reduxjs/toolkit');
  return {
    ...originalModule,
    nanoid: () => 'test-id'
  };
});

describe('Тесты редюсера constructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('Проверка добавления ингредиента', () => {
    const state = reducer(initialState, addIngredient(mockIngredient2));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(mockIngredient2);
  });

  it('Проверка удаления ингредиента', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient1, id: 'unique-id-1' },
        { ...mockIngredient2, id: 'unique-id-2' }
      ]
    };

    const action = removeIngredient('unique-id-1');
    const state = reducer(stateWithIngredients, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].id).toEqual('unique-id-2');
  });

  it('Проверка передвижения вниз', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [mockIngredient1, mockIngredient2]
    };

    const action = moveIngredient({ index: 0, type: 'down' });
    const state = reducer(stateWithIngredients, action);

    expect(state.ingredients[0]).toEqual(mockIngredient2);
    expect(state.ingredients[1]).toEqual(mockIngredient1);
  });

  it('Проверка передвижения наверх', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [mockIngredient1, mockIngredient2]
    };

    const action = moveIngredient({ index: 1, type: 'up' });
    const state = reducer(stateWithIngredients, action);

    expect(state.ingredients[0]).toEqual(mockIngredient2);
    expect(state.ingredients[1]).toEqual(mockIngredient1);
  });
});
