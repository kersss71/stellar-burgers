import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeed = createAsyncThunk('feedSlice/getFeed', getFeedsApi);

interface IFeedState {
  feed: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: IFeedState = {
  feed: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки данных';
      });
  }
});

export default feedSlice.reducer;
