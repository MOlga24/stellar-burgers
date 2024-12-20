/* eslint-disable */
import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { getIngredientsSelector } from '..//..//services/slices/burgerSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(getIngredientsSelector);
  const ingrIndex = useParams();
  /** TODO: взять переменную из стора */
  const ingredientData = ingredients.filter((v) => {
    if (v._id == ingrIndex.id) {
      return v;
    }
  })[0];

  if (!ingredientData) {
    return <Preloader />;
  }
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
