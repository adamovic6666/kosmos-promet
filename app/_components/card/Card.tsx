import Image from "next/image";
import styles from "./Card.module.css";
import Link from "next/link";

const Card = ({
  image,
  name,
  alias,
  isNew = false,
  productCode = "",
}: {
  image: string;
  name: string;
  alias: string;
  isNew?: boolean;
  productCode?: string;
}) => {
  const imageSrc = process.env.NEXT_PUBLIC_API_URL + image;
  const isProduct = alias.split("/").includes("proizvod");
  return (
    <div className={styles.cardWrapper}>
      {isNew && (
        <div className={styles.newBadge}>
          <span>novo</span>
        </div>
      )}
      {productCode && (
        <div className={styles.productCode}>
          <span>{productCode}</span>
        </div>
      )}
      <Link href={alias} className={styles.link}>
        <article className={styles.card}>
          <div
            className={`${styles.image} ${isProduct ? styles.imageBig : ""}`}
          >
            <Image src={imageSrc} alt={name} fill />
          </div>
          <div
            className={`${styles.title}  ${
              isProduct ? styles.titleNoCaps : ""
            }`}
          >
            <h4>
              {name && name.length > 52
                ? name.slice(0, 52) + "..."
                : name ?? "No name"}
            </h4>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default Card;
