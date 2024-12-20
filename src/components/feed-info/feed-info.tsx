import { FC, useEffect } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import { fetchOrders } from '..//..//services/slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  const total = useSelector((state: RootState) => state.feed.ordersData.total);
  const totalToday = useSelector(
    (state: RootState) => state.feed.ordersData.totalToday
  );
  /** TODO: взять переменные из стора */
  const orders = useSelector(
    (state: RootState) => state.feed.ordersData.orders
  );
  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
