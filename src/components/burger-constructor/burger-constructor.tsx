/* eslint-disable */
import { FC, useMemo, useState } from 'react';
import { TIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import {  
  clearOrder,
  fetchOrderBurger, 
} from '../../services/slices/orderSlice';
import { TNewOrderResponse } from 'src/utils/burger-api';
import { clearBasket } from '..//..//services/slices/basketSlice';
import { selectIsAuthenticated } from '..//..//services/slices/Regslice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const basket = useSelector((state: RootState) => state.basket);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch<AppDispatch>();
const isAuthenticated= useSelector(selectIsAuthenticated);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);
const navigate=useNavigate();
  const onChange = (value: TNewOrderResponse) => {
    setOrderModalData(value.order);
    setOrderRequest(!value.success);
  };
 
  const orderRequestinit = useSelector(
    (state: RootState) => state.order.requestStatus
  );
  const [orderRequest, setOrderRequest] = useState(orderRequestinit);
  const constructorItems: {
    bun: TIngredient | undefined;
    ingredients: TIngredient[];
  } = {
    bun: basket.bun,
    ingredients: basket.ingredients
  };
  const order = useSelector((state: RootState) => state.basket.id);
  const closeOrderModal = () => {    
  dispatch(clearOrder(order));
  setOrderRequest(false);
  setOrderModalData(null);   
  dispatch(clearBasket(basket));
  };
  const onOrderClick = () => {
    if(!isAuthenticated){return navigate('/login'); }
    if (order.length) {
      setOrderRequest(true);
      dispatch(fetchOrderBurger(order))
        .unwrap()
        .then((payload) => onChange(payload));
    } else {
      alert('добавьте заказ');
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
