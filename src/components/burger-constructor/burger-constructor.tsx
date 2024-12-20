/* eslint-disable */
import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@store';
import {
  clearOrder,
  fetchOrderBurger,
  getOrderModalData,
  getOrderRequestSelector
} from '../../services/slices/orderSlice';
import { clearBasket, getItems } from '..//..//services/slices/basketSlice';
import { selectIsAuthenticated } from '..//..//services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const basket = useSelector(getItems);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const orderModalData = useSelector(getOrderModalData);
  const orderRequest = useSelector(getOrderRequestSelector);
  const constructorItems: {
    bun: TIngredient | undefined;
    ingredients: TIngredient[];
  } = {
    bun: basket.bun,
    ingredients: basket.ingredients
  };
  const order = basket.id;
  const closeOrderModal = () => {
    dispatch(clearOrder(order));
    const orderModalData = null;
    dispatch(clearBasket(basket));
  };
  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    dispatch(fetchOrderBurger(order));
    dispatch(clearBasket(basket));
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
