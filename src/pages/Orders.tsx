import { ProductInfo } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { Heading } from "@components/shared";
import useOrders from "@hooks/useOrders";
import { Modal, Table } from "react-bootstrap";

const Orders = () => {
  const {
    error,
    loading,
    orderList,
    handleCloseModal,
    viewDetailsHandler,
    showModal,
    selectedProduct,
  } = useOrders();

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((product) => (
            <ProductInfo
              key={product.id}
              title={product.title}
              img={product.img}
              price={product.price}
              quantity={product.quantity}
              direction="column"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Heading title="Your Orders" />
      <Loading status={loading} error={error} type="category">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>
                  {order.items.length} item(s)
                  {" / "}
                  <span
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "blue",
                    }}
                    onClick={() => viewDetailsHandler(order.id)}
                  >
                    Order Details
                  </span>
                </td>
                <td>{order.subtotal.toFixed(2)} EGP</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};
export default Orders;
