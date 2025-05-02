import reducer, { makeOrder } from '../orderSlice';

const initialState = {
  order: null,
  orderModalData: null,
  isLoading: false,
  error: null,
  orderRequest: false
};

const mockResponse = {
  success: true,
  name: 'Флюоресцентный бургер',
  order: {
    createdAt: '2025-04-19T09:03:52.748Z',
    updatedAt: '2025-04-19T09:03:58.057Z',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
    _id: '6622337897ede0001d0666b5',
    name: 'Флюоресцентный бургер',
    status: 'done',
    number: 75043
  }
};

describe('Тесты редюсера orderReducer', () => {
  describe('Тесты makeOrder asyncThunk', () => {
    it('makeOrder.pending', () => {
      const state = reducer(initialState, makeOrder.pending('pending', []));

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
      expect(state.orderRequest).toBeTruthy();
    });

    it('makeOrder.fulfilled', () => {
      const state = reducer(
        initialState,
        makeOrder.fulfilled(mockResponse, 'fulfilled', [])
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.order).toEqual(mockResponse.order);
      expect(state.orderModalData).toEqual(mockResponse.order);
      expect(state.orderRequest).toBeFalsy();
    });

    it('makeOrder.rejected', () => {
      const errorMessage = 'Ошибка выполнения запроса';

      const state = reducer(
        initialState,
        makeOrder.rejected(new Error(errorMessage), 'rejected', [])
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBe(errorMessage);
      expect(state.orderRequest).toBeFalsy();
    });
  });
});
