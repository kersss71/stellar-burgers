import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { makeOrder, resetOrder } from '../../services/slices/orderSlice';
import { resetConstructor } from '../../services/slices/constructorSlice';
export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const constructorItems = useAppSelector((state) => state.constructorSlice);
  const orderRequest = useAppSelector((state) => state.orderSlice.orderRequest);
  const orderModalData = useAppSelector(
    (state) => state.orderSlice.orderModalData
  );

  const user = useAppSelector((state) => state.userSlice.user);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      return navigate('/login');
    }

    const orderData = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];
    dispatch(makeOrder(orderData)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        dispatch(resetConstructor());
      }
    });
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
