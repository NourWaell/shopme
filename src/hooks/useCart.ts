import {
  actGetProductsByItem,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanupCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetOrderState } from "@store/orders/OrdersSlice";
import { useCallback, useEffect } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();

  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const placeOrderStatus = useAppSelector((state) => state.orders.loading);

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
    const promise = dispatch(actGetProductsByItem());

    return () => {
      dispatch(cleanupCartProductsFullInfo());
      dispatch(resetOrderState());
      promise.abort();
    };
  }, [dispatch]);

  return {
    error,
    loading,
    products,
    userAccessToken,
    removeItemHandler,
    changeQuantityHandler,
    placeOrderStatus,
  };
};
export default useCart;
