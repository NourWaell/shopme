import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix, cleanupProductsRecords } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useProducts = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const productPrefix = params.prefix;

  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const { error, loading, records } = useAppSelector((state) => state.products);

  const productsFullInfo = records.map((product) => ({
    ...product,
    quantity: cartItems[product.id],
    isLiked: wishlistItemsId.includes(product.id),
  }));

  useEffect(() => {
    const promise = dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(cleanupProductsRecords());
      promise.abort();
    };
  }, [dispatch, params]);

  return { error, loading, productsFullInfo, productPrefix };
};
export default useProducts;
