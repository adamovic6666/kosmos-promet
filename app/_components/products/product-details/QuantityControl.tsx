import styles from "./ProductDetails.module.css";

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
}

const QuantityControl = ({
  quantity,
  onIncrement,
  onDecrement,
  onChange,
}: QuantityControlProps) => {
  return (
    <div className={styles.quantityControl}>
      <button onClick={onDecrement} className={styles.quantityBtn} type="button">
        -
      </button>
      <input
        value={quantity}
        onChange={(e) =>
          onChange(Math.max(1, Number.parseInt(e.target.value) || 1))
        }
        className={styles.quantityInput}
        min="1"
      />
      <button onClick={onIncrement} className={styles.quantityBtn} type="button">
        +
      </button>
    </div>
  );
};

export default QuantityControl;
