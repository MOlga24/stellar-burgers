/* eslint-disable */
import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store';
import { removeBun } from '..//..//services/slices/baskerslice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const handleMoveDown = () => {};

    const handleMoveUp = () => {};
    const dispatch = useDispatch<AppDispatch>();  
    const handleClose = () => {dispatch(removeBun(ingredient))};

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
