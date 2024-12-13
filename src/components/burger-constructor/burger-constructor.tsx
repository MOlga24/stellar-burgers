/* eslint-disable */
import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import {  isLoadingSelector } from '@slices';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

export const BurgerConstructor: FC = () => { const basket = useSelector((state:RootState)=>state.basket)
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

 

  const constructorItems:{bun:TIngredient|undefined, ingredients:TIngredient[]} =  {
    bun:basket.bun,
    ingredients: basket.ingredients
  };

  const orderRequest =false;

  const orderModalData = null;

  const onOrderClick = () => {  
 if (!constructorItems.bun || orderRequest) return
  
    ;
  };
  const closeOrderModal = () => {};

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
