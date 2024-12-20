/* eslint-disable */
import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import {  AppDispatch, useSelector  } from '..//..//services/store';
import {  useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchOrders, getOrderByNumberPage } from '..//..//services/slices/feedSlice';
import { getOrderByNumber, orderDataSelector } from '..//..//services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const {number}= useParams()
  const number1=Number(number);
  const ingredients= useSelector ((state)=>state.ingredients.ingredients); 
  /** TODO: взять переменные orderData и ingredients из стора */ 
//   const ordersData=
//  useSelector ((state)=>state.feed.ordersData.orders);
// function isOrderNumber(element:TOrder){const num=number1; return element.number===num}
// const orderNumber= ordersData.findIndex(isOrderNumber)
const orderData = useSelector(orderDataSelector(Number(number)))
    //const orderData= ordersData[orderNumber];
  console.log(orderData, number1)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {if(!orderData)
    dispatch(getOrderByNumber(Number(number)))  
    }, [dispatch]); 
  // useEffect(() => {
  //   if (!orderData) {
  //  dispatch(getOrderByNumber(number1));
  //   }
  // }, [dispatch]);
useEffect(() => {
dispatch(fetchOrders())  
}, [dispatch]); 
 

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => { 
   if (!orderData || !ingredients.length)     
      return null;
   const date = new Date(orderData.createdAt);
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {  
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
