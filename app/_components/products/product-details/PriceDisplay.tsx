import styles from "./ProductDetails.module.css";

interface PriceDisplayProps {
  price: string;
  discountPrice?: string;
  formatPrice: (price: string) => string;
}

const PriceDisplay = ({
  price,
  discountPrice,
  formatPrice,
}: PriceDisplayProps) => {
  return (
    <div className={styles.price}>
      {discountPrice && (
        <span className={styles.originalPrice}>
          {formatPrice(price)} <span className={styles.currency}>RSD</span>
        </span>
      )}
      <span className={styles.currentPrice}>
        <h2>
          {formatPrice(discountPrice || price)}{" "}
          <span className={styles.currency}>RSD</span>
        </h2>
      </span>
    </div>
  );
};

export default PriceDisplay;
