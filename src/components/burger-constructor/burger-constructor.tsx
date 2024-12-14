/* eslint-disable */
import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import {  isLoadingSelector } from '@slices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';

import { Link, useNavigate } from 'react-router-dom';
import { addOrder } from '..//..//services/slices/createOrder';
import { OrderInfo } from '../order-info';

export const BurgerConstructor: FC = () => { const basket = useSelector((state:RootState)=>state.basket)
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch=useDispatch<AppDispatch>();
    useEffect(() => {
      dispatch((addOrder(OrderInfo)));
    }, [dispatch]);
  

  const constructorItems:{bun:TIngredient|undefined, ingredients:TIngredient[]} =  {
    bun:basket.bun,
    ingredients: basket.ingredients
  };

  const orderRequest =false;

 const navigate = useNavigate();

   const onClose = () => {
    navigate(-1);
  };
  const orderModalData = null
 const closeOrderModal = () => { onClose};
const orderModalData1 = useSelector((state:RootState)=>state.basket.ingredients);
const orderModalData2 = useSelector((state:RootState)=>state.order);
const d=useSelector((state:RootState)=>state.feed.ordersData.orders)
  const onOrderClick = () => {   
  
   
const orderRequest=true;   
 
 if (!constructorItems.bun || orderRequest)
  return
   
  };
 

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0)
    +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      )
      ,
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
