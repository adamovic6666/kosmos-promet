"use client";
import React from "react";
import Accordion from "../ui/Accordion";
import styles from "./AboutProduct.module.css";

const AboutProduct = () => {
  const accordionItems = [
    {
      title: "Opis proizvoda",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      title: "Uslovi plaćanja i isporuke",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
    },
    {
      title: "Tehnička dokumentacija",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque eget lorem malesuada wisi. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
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
