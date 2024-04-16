import { CartItemList, CartSubtotal } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { Heading } from "@components/shared";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { changeQuantityHandler, removeItemHandler, error, loading, products } =
    useCart();

  return (
    <>
      <Heading title="Your Cart" />
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
