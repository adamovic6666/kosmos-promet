import Image from "next/image";
import styles from "./Card.module.css";
import Link from "next/link";

const Card = ({
  image,
  name,
  alias,
}: {
  image: string;
  name: string;
  alias: string;
}) => {
  const imageSrc = process.env.NEXT_PUBLIC_API_URL + image;
  const isProduct = alias.split("/").includes("proizvod");
  return (
    <Link href={alias} className={styles.link}>
      <article className={styles.card}>
        <div className={`${styles.image} ${isProduct ? styles.imageBig : ""}`}>
          <Image src={imageSrc} alt={name} fill />
        </div>
        <div
          className={`${styles.title}  ${isProduct ? styles.titleNoCaps : ""}`}
        >
          {name?.includes("`") ? (
            <h4>
              <span>{name?.split("`")[0]}</span>
              <br />
              <span>{name?.split("`").slice(1).join(" ")}</span>
            </h4>
          ) : (
            <h4>{name ?? "No name"}</h4>
          )}
        </div>
      </article>
    </Link>
  );
};

export default Card;
