import empty from "@assets/lottieFiles/empty.json";
import error from "@assets/lottieFiles/error.json";
import loading from "@assets/lottieFiles/loading.json";
import notFound from "@assets/lottieFiles/notFound.json";
import success from "@assets/lottieFiles/success.json";
import Lottie from "lottie-react";

const lottieFilesMap = {
  notFound,
  empty,
  loading,
  error,
  success,
};

type TLottieHandler = {
  type: keyof typeof lottieFilesMap;
  message?: string;
  className?: string;
};

const LottieHandler = ({ type, className, message }: TLottieHandler) => {
  const lottie = lottieFilesMap[type];
  const messageStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px", marginTop: "30px" };

  return (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie animationData={lottie} style={{ width: "400px" }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};
export default LottieHandler;
