import reducer, { getFeed } from '../feedSlice';

const mockFeedResponse = {
  success: true,
  orders: [
    {
      _id: 'order-id-1',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0942'],
      status: 'done',
      name: 'Бургер 1',
      createdAt: '2023-05-01T12:00:00.000Z',
      updatedAt: '2023-05-01T12:30:00.000Z',
      number: 1
    }
  ],
  total: 100,
  totalToday: 10
};

const initialState = {
  feed: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

describe('Тесты редюсера feedsReducer', () => {
  describe('Тесты getFeed asyncThunk', () => {
    it('getFeed.pending', () => {
      const state = reducer(initialState, getFeed.pending('pending'));

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('getFeed.fulfilled', () => {
      const state = reducer(
        initialState,
        getFeed.fulfilled(mockFeedResponse, 'fulfilled')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.feed).toEqual(mockFeedResponse.orders);
      expect(state.total).toBe(mockFeedResponse.total);
      expect(state.totalToday).toBe(mockFeedResponse.totalToday);
    });

    it('getFeed.rejected', () => {
      const error = 'fetchFeeds.rejected';

      const state = reducer(
        initialState,
        getFeed.rejected(new Error(error), 'rejected')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeTruthy();
    });
  });
});
