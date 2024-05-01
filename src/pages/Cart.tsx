import { CartItemList, CartSubtotal } from "@components/eCommerce";
import { Loading, LottieHandler } from "@components/feedback";
import { Heading } from "@components/shared";
import useCart from "@hooks/useCart";

const Cart = () => {
  const {
    changeQuantityHandler,
    removeItemHandler,
    error,
    loading,
    products,
    userAccessToken,
    placeOrderStatus,
  } = useCart();

  return (
    <>
      <Heading title="Your Cart" />
      <Loading status={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotal
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHandler
            type="success"
            message="Your order has been placed successfully"
          />
        ) : (
          <LottieHandler type="empty" message="Your cart is empty" />
        )}
      </Loading>
    </>
  );
};
export default Cart;
