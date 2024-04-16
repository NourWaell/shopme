import { TLoading } from "@types";

type ILoading = {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
};

const Loading = ({ status, error, children }: ILoading) => {
  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return <>{children}</>;
};
export default Loading;
