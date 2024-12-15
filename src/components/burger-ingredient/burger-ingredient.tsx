/* eslint-disable */
import { FC, memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { AppDispatch, RootState } from '@store';
import { useDispatch, useSelector } from 'react-redux';
import { addBun} from '../../services/slices/basketSlice';


export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();  
    const handleAdd = () => {
   let count=0;
      dispatch(
        addBun(
      ingredient
        )
      );

      
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={ count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
