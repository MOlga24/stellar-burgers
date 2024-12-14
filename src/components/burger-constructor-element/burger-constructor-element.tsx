/* eslint-disable */
import { FC, memo, useEffect, useRef, useState } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store';
import { removeBun } from '..//..//services/slices/baskerslice';
import { useSearchParams } from 'react-router-dom';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    
    const [searchParams, setSearchParams] = useSearchParams();
   
    
   
    const handleMoveDown = () => {};
    const handleMoveUp  = () => {
   
  };
   
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
