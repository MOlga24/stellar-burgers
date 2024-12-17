import { RootState } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from 'react-redux';
/* eslint-disable */
export const Feed: FC = () => {
  
  /** TODO: взять переменную из стора */
  const orders= useSelector((state:RootState)=>state.feed.ordersData.orders)

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={() => {}} />

};
