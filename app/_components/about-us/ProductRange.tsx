import styles from "./ProductRange.module.css";
import { Product } from "@/app/_types";
import CustomSwiper from "../ui/CustomSwiper";
import dummyData from "../../../public/data/dummy-data.json";

const ProductRange = ({ allProducts }: { allProducts: Product[] }) => {
  const meh = allProducts;
  console.log(meh);
  const products = dummyData as Product[];

  return (
    <div className={`${styles.productRange} container-small`}>
      <h2>Proizvodi</h2>
      <p className={styles.productRangeText}>
        Širok izbor delova i opreme za prskalice i atomizere na jednom mestu.
        <br />
        Provereni kvalitet, dostupnost i pouzdana isporuka.
      </p>
      <CustomSwiper products={products} />
    </div>
  );
};

export default ProductRange;
