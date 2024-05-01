import { TProduct } from "@types";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";

type TCartSubTotal = {
  products: TProduct[];
  userAccessToken: string | null;
};

const CartSubTotal = ({ products, userAccessToken }: TCartSubTotal) => {
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
    <>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subtotal.toFixed(2)} EGP</span>
      </div>

      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <Button variant="info" style={{ color: "white" }}>
            Place Order
          </Button>
        </div>
      )}
    </>
  );
};
export default CartSubTotal;
