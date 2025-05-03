import reducer, { getOrders, getOrderByNumber } from '../ordersSlice';

const initialState = {
  orders: [],
  order: null,
  isLoading: false,
  error: null
};

const mockOrder = [
  {
    name: 'Флюоресцентный бургер',
    createdAt: '2025-04-19T09:03:52.748Z',
    updatedAt: '2025-04-19T09:03:58.057Z',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
    _id: '6622337897ede0001d0666b5',
    status: 'done',
    number: 75043
  }
];

describe('Тесты редюсера ordersSlice', () => {
  describe('Тесты getOrderByNumber asyncThunk', () => {
    it('getOrderByNumber.pending', () => {
      const state = reducer(
        initialState,
        getOrderByNumber.pending('pending', mockOrder[0].number)
      );

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('getOrderByNumber.fulfilled', () => {
      const state = reducer(
        initialState,
        getOrderByNumber.fulfilled(
          mockOrder[0],
          'fulfilled',
          mockOrder[0].number
        )
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.order).toEqual(mockOrder[0]);
      expect(state.error).toBeNull();
    });

    it('getOrderByNumber.rejected', () => {
      const state = reducer(
        initialState,
        getOrderByNumber.rejected(
          new Error('error'),
          'rejected',
          mockOrder[0].number
        )
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeTruthy();
    });
  });

  describe('Тесты getOrders asyncThunk', () => {
    it('getOrders.pending', () => {
      const state = reducer(initialState, getOrders.pending('pending'));

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('getOrders.fulfilled', () => {
      const state = reducer(
        initialState,
        getOrders.fulfilled(mockOrder, 'fulfilled')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.orders).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    it('getOrders.rejected', () => {
      const state = reducer(
        initialState,
        getOrderByNumber.rejected(
          new Error('error'),
          'rejected',
          mockOrder[0].number
        )
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeTruthy();
    });
  });
});
