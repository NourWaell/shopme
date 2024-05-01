import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetOrders from "@store/orders/act/actGetOrders";
import { resetOrderState } from "@store/orders/OrdersSlice";
import { TProduct } from "@types";
import { useEffect, useState } from "react";

const useOrders = () => {
  const dispatch = useAppDispatch();

  const { loading, error, orderList } = useAppSelector((state) => state.orders);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const viewDetailsHandler = (id: number) => {
    const orderDetails = orderList.find((order) => order.id === id);
    const orderItems = orderDetails?.items ?? [];

    if (orderItems) {
      setSelectedProduct((prev) => [...prev, ...orderItems]);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct([]);
    setShowModal(false);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      dispatch(resetOrderState());
      promise.abort();
    };
  }, [dispatch]);

  return {
    error,
    loading,
    orderList,
    handleCloseModal,
    viewDetailsHandler,
    showModal,
    selectedProduct,
  };
};

export default useOrders;
