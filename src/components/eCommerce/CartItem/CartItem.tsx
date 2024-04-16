import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { memo } from "react";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type TCartItem = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    changeQuantityHandler,
    removeItemHandler,
  }: TCartItem) => {
    const renderOptions = Array(max)
      .fill(0)
      .map((_, idx) => {
        const quantity = ++idx;
        return (
          <option key={quantity} value={quantity}>
            {quantity}
          </option>
        );
      });

    const handleQuantityChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const quantity = Number(event.target.value);
      changeQuantityHandler(id, quantity);
    };

    return (
      <div className={cartItem}>
        <div className={product}>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{price} EGP</h3>
            <Button
              variant="secondary"
              style={{ color: "white", width: "100px" }}
              className="mt-auto"
              onClick={() => removeItemHandler(id)}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={handleQuantityChange}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
