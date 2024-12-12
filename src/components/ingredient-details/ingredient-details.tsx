/* eslint-disable */
import { FC, useContext } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { getBurgsSelector } from '@slices';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { fetchUserApi } from 'src/services/sliceUser';

export const IngredientDetails: FC = () => {
    const val=Object.values(useSelector(getBurgsSelector));
    const ingrIndex = useParams();   
  /** TODO: взять переменную из стора */
  const ingredientData=(val.filter(v=>{if(v._id==ingrIndex.id) {return val}}))[0];

  if (!ingredientData) {
    return <Preloader />;
  }
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
