import { TProduct } from "@types";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import actPlaceOrder from "@store/orders/act/actPlaceOrder";
import { clearCartAfterPlaceOrder } from "@store/cart/cartSlice";

type TCartSubTotal = {
  products: TProduct[];
  userAccessToken: string | null;
};

const CartSubTotal = ({ products, userAccessToken }: TCartSubTotal) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const modalHandler = () => {
    setShowModal(!showModal);
    setError(null);
  };

  const subtotal = products.reduce((acc, el) => {
    const price = el.price;
    const quantity = el.quantity;

    if (quantity && typeof quantity === "number") {
      return acc + price * quantity;
    } else {
      return acc;
    }
  }, 0);

  const placeOrderHandler = () => {
    setLoading(true);

    dispatch(actPlaceOrder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlaceOrder());
        setShowModal(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={modalHandler}
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place this order with subtotal of{" "}
          {subtotal.toFixed(2)} EGP?
          {!loading && error && <p className="text-danger mt-3">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button variant="primary" onClick={placeOrderHandler}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subtotal.toFixed(2)} EGP</span>
      </div>

      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <Button variant="primary" onClick={modalHandler}>
            Place Order
          </Button>
        </div>
      )}
    </>
  );
};
export default CartSubTotal;
