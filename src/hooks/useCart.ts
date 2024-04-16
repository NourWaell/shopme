import {
  actGetProductsByItem,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanupCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(actGetProductsByItem());

    return () => {
      dispatch(cleanupCartProductsFullInfo());
    };
  }, [dispatch]);

  return { error, loading, products, removeItemHandler, changeQuantityHandler };
};
export default useCart;
