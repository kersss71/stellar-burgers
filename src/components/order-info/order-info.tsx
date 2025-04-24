import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrderByNumber, getOrders } from '../../services/slices/ordersSlice';

export const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { number } = useParams<{ number: string }>();
  const numberOrderNum = Number(number);

  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = useAppSelector((state) => state.ordersSlice.order);

  const ingredients: TIngredient[] = useAppSelector(
    (state) => state.ingredientSlice.ingredients
  );

  useEffect(() => {
    if (!isNaN(numberOrderNum)) {
      dispatch(getOrderByNumber(numberOrderNum));
    }
  }, [numberOrderNum, dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
