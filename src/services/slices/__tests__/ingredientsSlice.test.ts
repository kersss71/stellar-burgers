import reducer, { getIngredients } from '../ingredientsSlice';

import { mockIngredient3 } from '../mockIngredients';

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null
};

describe('Тесты редюсера ingredientsReducer', () => {
  describe('Тесты getIngredients asyncThunk', () => {
    it('getIngredients.pending', () => {
      const state = reducer(initialState, getIngredients.pending('pending'));

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('getIngredients.fulfilled', () => {
      const state = reducer(
        initialState,
        getIngredients.fulfilled(mockIngredient3, 'fulfilled')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(mockIngredient3);
      expect(state.ingredients).toHaveLength(1);
    });

    it('getIngredients.rejected', () => {
      const error = 'fetchFeeds.rejected';

      const state = reducer(
        initialState,
        getIngredients.rejected(new Error(error), 'rejected')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeTruthy();
    });
  });
});
