/* eslint-disable */
import { AppDispatch, RootState } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserOrders,
  isOrderLoadingSelector
} from '..//..//services/slices/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);
  const orders = useSelector((state: RootState) => state.order.orders);
  const loading = useSelector(isOrderLoadingSelector);
  if (loading) return <Preloader />;
  return <ProfileOrdersUI orders={orders} />;
};
