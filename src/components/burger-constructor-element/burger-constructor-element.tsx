/* eslint-disable */
import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '..//..//services/store';
import { removeIngredient, reorderIngredients } from '..//..//services/slices/orderSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(reorderIngredients({ from: index, to: index + 1 }));
    };
    const handleMoveUp = () => {
      dispatch(reorderIngredients({ from: index, to: index - 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(index));
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
