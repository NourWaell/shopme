import { TLoading } from "@types";

import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";

const skeletonsTypes = {
  cart: <CartSkeleton />,
  category: <CategorySkeleton />,
  product: <ProductSkeleton />,
};

type ILoading = {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonsTypes;
};

const Loading = ({ status, error, children, type = "category" }: ILoading) => {
  const Component = () => skeletonsTypes[type];

  if (status === "pending") {
    return <Component />;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return <>{children}</>;
};
export default Loading;
