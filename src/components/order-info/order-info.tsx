import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { AppDispatch, useSelector } from '..//..//services/store';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  fetchOrders,
  getFeedSelector
} from '..//..//services/slices/feedSlice';
import { getOrderByNumber } from '..//..//services/slices/orderSlice';
import { getIngredientsSelector } from '..//..//services/slices/burgerSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const ingredients = useSelector(getIngredientsSelector);
  /** TODO: взять переменные orderData и ingredients из стора */
  const ordersData = useSelector(getFeedSelector);
  function isOrderNumber(element: TOrder) {
    const num = Number(number);
    return element.number === num;
  }
  const orderNumber = ordersData.findIndex(isOrderNumber);
  const orderData = ordersData[orderNumber];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!orderData) dispatch(getOrderByNumber(Number(number)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
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
