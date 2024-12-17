/* eslint-disable */
import { AppDispatch, RootState } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '..//..//services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
   useEffect(() => {
      dispatch(fetchUserOrders());
     
    }, []);
  const orders = useSelector(
    (state: RootState) => state.order.orders
  );
console.log(orders);
  /** TODO: взять переменную из стора  */
  return <ProfileOrdersUI orders={orders} />;
};
