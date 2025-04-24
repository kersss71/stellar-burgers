import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { getOrders } from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useAppSelector((state) => state.ordersSlice.orders);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  if (orders.length === 0) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
