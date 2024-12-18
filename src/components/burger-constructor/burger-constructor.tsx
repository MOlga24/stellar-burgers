/* eslint-disable */
import { FC, useEffect, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
const _ = require('lodash');
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';

import { useNavigate } from 'react-router-dom';
import { addOrder, fetchOrderBurger } from '../../services/slices/orderSlice';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';

export const BurgerConstructor: FC = () => {
  const basket = useSelector((state: RootState) => state.basket);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(addOrder(orderModalData));
  }, []);

  const constructorItems: {
    bun: TIngredient | undefined;
    ingredients: TIngredient[];
  } = {
    bun: basket.bun,
    ingredients: basket.ingredients
  };



  const navigate = useNavigate();

  const onClose = () => {
  const  orderModalData=null;
    const orderRequest = !orderSuccess;
  };
 const order = useSelector((state: RootState) => state.basket.id);
 const orderModalData = useSelector((state: RootState) => state.order.order);
  const orderSuccess = useSelector(
    (state: RootState) => state.order.requestStatus
  );  
  const orderRequest = orderSuccess;
  const closeOrderModal = () => {
    
    const orderRequest =!orderSuccess;
    const orderModalData=null
  window.location.href = '/';
  };

 
  const onOrderClick = () => {

    const orderRequest = true;

    if (order) 
    {   
      dispatch(fetchOrderBurger(order))
    if (orderModalData) { console.log(orderModalData);const orderRequest = false;}
    // dispatch(addOrder(order))      
    }
    if (!constructorItems.bun || orderRequest) return;
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
