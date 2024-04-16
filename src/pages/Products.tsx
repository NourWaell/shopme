import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/shared";
import useProducts from "@hooks/useProducts";

const Products = () => {
  const { error, loading, productPrefix, productsFullInfo } = useProducts();

  return (
    <>
      <Heading title={`${productPrefix?.toUpperCase()} Products`} />

      <Loading status={loading} error={error}>
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;
