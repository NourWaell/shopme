import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  cleanupWishlistProductsFullInfo,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

const useWishlist = () => {
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

  return { error, loading, records };
};
export default useWishlist;
