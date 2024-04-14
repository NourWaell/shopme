import { TProduct } from "@customTypes/product";
import styles from "./styles.module.css";

type TCartSubTotal = {
  products: TProduct[];
};

const CartSubTotal = ({ products }: TCartSubTotal) => {
  const subtotal = products.reduce((acc, el) => {
    const price = el.price;
    const quantity = el.quantity;

    if (quantity && typeof quantity === "number") {
      return acc + price * quantity;
    } else {
      return acc;
    }
  }, 0);
  return (
    <div className={styles.container}>
      <span>Subtotal:</span>
      <span>{subtotal.toFixed(2)} EGP</span>
    </div>
  );
};
export default CartSubTotal;
