import LikeFill from "@assets/svg/like-fill.svg?react";
import Like from "@assets/svg/like.svg?react";
import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hooks";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { TProduct } from "@types";
import { memo, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import styles from "./styles.module.css";

const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({ img, price, title, id, max, quantity, isLiked }: TProduct) => {
    const dispatch = useAppDispatch();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

    useEffect(() => {
      if (!isBtnDisabled) return;

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };

    const likeToggleHandler = () => {
      if (isLoading) return;

      setIsLoading(true);
      dispatch(actLikeToggle(id))
        .unwrap()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    };

    return (
      <div className={product}>
        <div className={wishlistBtn} onClick={likeToggleHandler}>
          {isLoading ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) : isLiked ? (
            <LikeFill />
          ) : (
            <Like />
          )}
        </div>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2 title={title}>{title}</h2>
        <h3>{price} EGP</h3>
        {quantityReachedToMax && (
          <p className={maximumNotice}>You can't add more items of this item</p>
        )}
        <Button
          variant="info"
          style={{ color: "white" }}
          onClick={addToCartHandler}
          disabled={isBtnDisabled || quantityReachedToMax}
        >
          {isBtnDisabled ? (
            <>
              <Spinner animation="border" size="sm" /> Loading...
            </>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    );
  }
);

export default Product;
