import { FC } from 'react';
/* eslint-disable */
import styles from './orders-list.module.css';

import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => {
  return (
    <div className={`${styles.content}`}>
      {orderByDate.map((order) => (
        <OrderCard order={order} key={order._id} />
      ))}
    </div>
  );
};
