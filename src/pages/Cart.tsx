import { CartItemList, CartSubtotal } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { Heading } from "@components/shared";
import {
  actGetProductsByItem,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanupCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";

const Cart = () => {
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

  return (
    <>
      <Heading>Your Cart</Heading>
      <Loading status={loading} error={error}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotal products={products} />
          </>
        ) : (
          <h5>Your cart is empty</h5>
        )}
      </Loading>
    </>
  );
};
export default Cart;
