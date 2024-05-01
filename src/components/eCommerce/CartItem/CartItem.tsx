import { memo } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";
import { TProduct } from "@types";
import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";

const { cartItem, cartItemSelection } = styles;

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
        <ProductInfo title={title} price={price} img={img} direction="column">
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={() => removeItemHandler(id)}
          >
            Remove
          </Button>
        </ProductInfo>

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
