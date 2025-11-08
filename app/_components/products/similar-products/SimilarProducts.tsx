import CustomSwiper from "../../ui/CustomSwiper";
import styles from "./SimilarProducts.module.css";
import { SimilarProductsProps } from "@/app/_types";

const SimilarProducts = ({ similarProducts }: SimilarProductsProps) => {
  if (!similarProducts || similarProducts.length === 0) return null;

  return (
    <section className={styles.similarProducts}>
      <div className="container-small">
        <h2>Ostali proizvodi</h2>
        <CustomSwiper products={similarProducts} id="similar-products-swiper" />
      </div>
    </section>
  );
};

export default SimilarProducts;
