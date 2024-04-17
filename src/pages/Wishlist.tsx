import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/shared";
import useWishlist from "@hooks/useWishlist";
import { TProduct } from "@types";

const Wishlist = () => {
  const { error, loading, records } = useWishlist();

  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          records={records}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="No products found in your wishlist."
        />
      </Loading>
    </>
  );
};
export default Wishlist;
