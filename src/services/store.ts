import { combineReducers, configureStore } from '@reduxjs/toolkit';
import constructorSlice from './slices/constructorSlice';
import ingredientSlice from './slices/ingredientsSlice';
import orderSlice from './slices/orderSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import feedSlice from './slices/feedSlice';
import userSlice from './slices/userSlice';
import ordersSlice from './slices/ordersSlice';

const rootReducer = combineReducers({
  constructorSlice,
  ingredientSlice,
  orderSlice,
  feedSlice,
  userSlice,
  ordersSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
