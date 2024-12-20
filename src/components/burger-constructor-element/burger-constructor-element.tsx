/* eslint-disable */
import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store';
import { removeBun, reorderBasket } from '..//..//services/slices/basketSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleMoveDown = () => {
      dispatch(reorderBasket({ from: index, to: index + 1 }));
    };
    const handleMoveUp = () => {
      dispatch(reorderBasket({ from: index, to: index - 1 }));
    };

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
