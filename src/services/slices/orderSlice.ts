import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const makeOrder = createAsyncThunk(
  'orderSlice/setOrder',
  orderBurgerApi
);

interface IOrderState {
  order: TOrder | null;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
  orderRequest: boolean;
}

const initialState: IOrderState = {
  order: null,
  orderModalData: null,
  isLoading: false,
  error: null,
  orderRequest: false
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<TOrder>) => {
      state.order = action.payload;
    },
    resetOrder: (state) => {
      state.order = null;
      state.orderModalData = null;
      state.isLoading = false;
      state.error = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        console.log('order', action.payload); // УДАЛИТЬ КОНСОЛЬ УДАЛИТЬ КОНСОЛЬ УДАЛИТЬ КОНСОЛЬ УДАЛИТЬ КОНСОЛЬ УДАЛИТЬ КОНСОЛЬ УДАЛИТЬ КОНСОЛЬ УДАЛИТЬ КОНСОЛЬ УДАЛИТЬ КОНСОЛЬ
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка';
        state.orderRequest = false;
      });
  }
});

export const { resetOrder, setOrder } = orderSlice.actions;
export default orderSlice.reducer;
