/* eslint-disable */
import { FC, memo, useEffect, useRef, useState } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import { removeBun, reorderBasket } from '..//..//services/slices/basketSlice';
import { useSearchParams } from 'react-router-dom';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const r = useSelector((state: RootState) => state.basket.ingredients);

    const handleMoveDown = () => {
      dispatch(reorderBasket({ from: index, to: index + 1 }));
    };
    const handleMoveUp = () => {
      dispatch(reorderBasket({ from: index, to: index - 1 }));
      console.log(r);
    };

    const dispatch = useDispatch<AppDispatch>();
    const handleClose = () => {
      dispatch(removeBun(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
