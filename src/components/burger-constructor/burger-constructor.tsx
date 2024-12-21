/* eslint-disable */
import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '..//..//services/store';
import {
  clearOrder,
  fetchOrderBurger,
  getOrderModalData,
  getOrderRequestSelector
} from '../../services/slices/orderSlice';
import { getBasketItemsSelector } from '..//..//services/slices/orderSlice';
import { selectIsAuthenticated } from '..//..//services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { getIconColor } from '@zlden/react-developer-burger-ui-components/dist/ui/icons/utils';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const basket = useSelector(getBasketItemsSelector);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const orderModalData = useSelector(getOrderModalData);
  const orderRequest = useSelector(getOrderRequestSelector);
  const constructorItems: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
  } = {
    bun: basket.basket.bun,
    ingredients: basket.basket.ingredients
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };
  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    if (constructorItems.bun._id) {
      const basketIngresientsId = constructorItems.ingredients.map(
        (item) => item._id
      );
      const order = [
        constructorItems.bun._id,
        ...basketIngresientsId,
        constructorItems.bun._id
      ];
      dispatch(fetchOrderBurger(order));
    }
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
