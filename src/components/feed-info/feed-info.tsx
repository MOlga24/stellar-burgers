import { FC } from 'react';
/* eslint-disable */
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from 'react-redux';
import { RootState } from '@store';


const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {

  const total=useSelector((state:RootState)=>state.feed.ordersData.total)
  const totalToday=useSelector((state:RootState)=>state.feed.ordersData.totalToday)
  /** TODO: взять переменные из стора */
  const orders = useSelector((state:RootState)=>state.feed.ordersData.orders);
  const feed = {total,totalToday}

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
