import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.ingredients);
  const { id } = useParams<{ id: string }>();

  if (loading) return <Preloader />;
  if (error) return <div>Ошибка загрузки ингредиента</div>;

  const ingredientData = items.find((item) => item._id === id);

  if (!ingredientData) return <div>Ингредиент не найден</div>;

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
