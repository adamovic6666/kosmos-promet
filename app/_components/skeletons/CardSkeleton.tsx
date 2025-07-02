"use client";
import React, { useEffect } from "react";
import styles from "./CardSkeleton.module.css";

const CardSkeleton = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`${styles.productsListSkeleton} container-small`}>
      <div className={styles.title}></div>
      <div className={styles.description}></div>
      <div className={styles.productsListSkeletonGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageSection}>
              <div className={styles.productNumber}></div>
              <div className={styles.productImage}></div>
            </div>
            <div className={styles.textSection}>
              <div className={styles.productName}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSkeleton;
