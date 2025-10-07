import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch, RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { createOrder, closeOrder } from '../../services/slices/order-slice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { constructorItems, loading, orderModalData } = useSelector(
    (state: RootState) => state.order
  );
  const { user } = useSelector((state) => state.user);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || loading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredients));
  };

  const closeOrderModal = () => {
    dispatch(closeOrder());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={loading}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
