import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { getFeed } from '../../services/slices/feedSlice';
import { useEffect } from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, []);
  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  const orders: TOrder[] = useAppSelector((state) => state.feedSlice.feed);

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
