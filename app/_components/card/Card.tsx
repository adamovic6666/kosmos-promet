import Image from "next/image";
import styles from "./Card.module.css";
import Link from "next/link";

const Card = ({
  image,
  name,
  alias,
  isNew = false,
  productCode = "",
  mediaUpdatedAt = 0,
}: {
  image: string;
  name: string;
  alias: string;
  isNew?: boolean;
  productCode?: string;
  mediaUpdatedAt?: number;
}) => {
  // Force cache busting with timestamp for cPanel deployment
  // Only add timestamp if mediaUpdatedAt is provided to avoid hydration mismatch
  let imageSrc = `${process.env.NEXT_PUBLIC_API_URL}${image}`;
  if (mediaUpdatedAt) {
    const separator = image.includes("?") ? "&" : "?";
    imageSrc = `${imageSrc}${separator}t=${mediaUpdatedAt}`;
  }
  const isProduct = alias.split("/").includes("proizvod");
  const nameContainsDelovi = name.toLowerCase().includes("[delovi]");

  // Extract [delovi] part and clean name
  const deloviMatch = name.match(/\[delovi\]/gi);
  const cleanName = nameContainsDelovi
    ? name.replaceAll(/\[delovi\]/gi, "").trim()
    : name;
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
              {cleanName && cleanName.length > 52
                ? cleanName.slice(0, 52) + "..."
                : (cleanName ?? "No name")}
              {deloviMatch && (
                <span className={styles.deloviLabel}>{deloviMatch[0]}</span>
              )}
            </h4>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default Card;
