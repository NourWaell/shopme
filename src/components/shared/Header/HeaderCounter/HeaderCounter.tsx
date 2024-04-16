import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

const { container, totalNum, pumpAnimate, iconWrapper } = styles;

type THeaderCounter = {
  totalQuantity: number;
  svgIcon: React.ReactNode;
  pagePath: string;
};

const HeaderCounter = ({
  totalQuantity,
  svgIcon,
  pagePath,
}: THeaderCounter) => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);

  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

  useEffect(() => {
    if (!totalQuantity) return;

    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <div className={container} onClick={() => navigate(pagePath)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </div>
    </div>
  );
};
export default HeaderCounter;
