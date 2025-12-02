"use client";
import React from "react";
import Accordion from "../ui/Accordion";
import styles from "./AboutProduct.module.css";

const AboutProduct = ({
  description,
  documentation,
}: {
  description: string;
  documentation?: string;
}) => {
  const accordionItems = [
    {
      title: "Opis proizvoda",
      content: description,
    },
    {
      title: "Uslovi plaćanja i isporuke",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
    },
    {
      title: "Tehnička dokumentacija",
      content: documentation,
    },
  ];

  return (
    <div className={styles.AboutProduct}>
      <div className="container-medium">
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
};

export default AboutProduct;
