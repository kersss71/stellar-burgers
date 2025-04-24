import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredients = useAppSelector(
    (state) => state.ingredientSlice.ingredients
  );

  let { id } = useParams();

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
