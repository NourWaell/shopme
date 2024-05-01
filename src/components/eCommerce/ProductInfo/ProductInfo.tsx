import styles from "./styles.module.css";

type TProductInfo = {
  title: string;
  price: number;
  img: string;
  direction?: "row" | "column";
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const ProductInfo = ({
  img,
  price,
  title,
  children,
  direction = "row",
  style,
}: TProductInfo) => {
  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
      <div className={`${styles[`productImg-${direction}`]}`}>
        <img src={img} alt={title} />
      </div>
      <div className={`${styles[`productInfo-${direction}`]}`}>
        <h2 title={title}>{title}</h2>
        <h3>{price} EGP</h3>
        {children}
      </div>
    </div>
  );
};
export default ProductInfo;
