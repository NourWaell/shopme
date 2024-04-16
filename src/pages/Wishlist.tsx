import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/shared";
import { TProduct } from "@customTypes/product";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, cleanupWishlistProductsFullInfo } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

const Wishlist = () => {
  const dispatch = useAppDispatch();

  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: true,
  }));

  useEffect(() => {
    dispatch(actGetWishlist());

    return () => {
      dispatch(cleanupWishlistProductsFullInfo());
    };
  }, [dispatch]);

  return (
    <>
      <Heading>Your Wishlist</Heading>
      <Loading status={loading} error={error}>
        <GridList<TProduct>
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};
export default Wishlist;
