import React, { FC, memo } from 'react';
import { OrderStatusUIProps } from './type';
/* eslint-disable */
export const OrderStatusUI: FC<OrderStatusUIProps> = ({ textStyle, text }) => {return(

  <span
    className='text text_type_main-default pt-2'
    style={{ color: textStyle }}
  >
    {text}
  </span>
)};
