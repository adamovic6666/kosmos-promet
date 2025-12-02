import { useState } from "react";
import styles from "./ProductDetails.module.css";
import PriceDisplay from "./PriceDisplay";
import QuantityControl from "./QuantityControl";
import ContactPopup from "./ContactPopup";

interface OrderSectionProps {
  price?: string;
  discountPrice?: string;
  formatPrice: (price: string) => string;
  onOrder: (quantity: number) => void;
}

const OrderSection = ({
  price,
  discountPrice,
  formatPrice,
  onOrder,
}: OrderSectionProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const hasPrice = discountPrice || price;

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleOrder = () => {
    onOrder(quantity);
  };

  return (
    <>
      <div className={styles.orderSection}>
        {hasPrice ? (
          <>
            <PriceDisplay
              price={price!}
              discountPrice={discountPrice}
              formatPrice={formatPrice}
            />
            <div className={styles.orderControls}>
              <QuantityControl
                quantity={quantity}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
                onChange={setQuantity}
              />
              <button
                onClick={handleOrder}
                className={styles.orderBtn}
                type="button"
              >
                Poruči
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.stockStatus}>
              <p className={styles.outOfStock}>Nema na stanju</p>
            </div>
            <button
              onClick={() => setIsContactPopupOpen(true)}
              className={styles.checkAvailabilityBtn}
              type="button"
            >
              Proverite mogućnost poručivanja
            </button>
          </>
        )}
      </div>

      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
      />
    </>
  );
};

export default OrderSection;
