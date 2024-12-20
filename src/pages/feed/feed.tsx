import { AppDispatch, RootState } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '..//..//services/slices/feedSlice';
/* eslint-disable */
export const Feed: FC = () => {const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
      dispatch(fetchOrders());
    }, [dispatch]); 
  /** TODO: взять переменную из стора */
  const orders= useSelector((state:RootState)=>state.feed.ordersData.orders)
  
  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={() => {dispatch(fetchOrders())}} />

};
