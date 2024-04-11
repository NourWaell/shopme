import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList } from "@components/shared";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { error, loading, records } = useAppSelector((state) => state.products);

  const productsFullInfo = records.map((product) => ({
    ...product,
    quantity: cartItems[product.id] || 0,
  }));

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  return (
    <Container>
      <Loading status={loading} error={error}>
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
