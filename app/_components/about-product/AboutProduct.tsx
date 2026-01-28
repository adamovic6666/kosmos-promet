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
  const allItems = [
    {
      title: "Opis proizvoda",
      content: description,
    },
    {
      title: "Uslovi plaćanja i isporuke",
      content:
        "Cene svih proizvoda izražene su u dinarima (RSD) i uključuju PDV. </br > Plaćanje se vrši uplatom na tekući račun prodavca ili pouzećem prilikom preuzimanja pošiljke. U slučaju plaćanja putem uplate na račun, roba se šalje nakon evidentirane uplate.  </br >Isporuku vrši kurirska služba na adresu navedenu u porudžbini. Troškovi isporuke su fiksni i iznose 660 RSD po porudžbini i dodaju se na ukupnu vrednost poručene robe. Kupac prilikom preuzimanja plaća ukupan iznos naveden u porudžbini, bez dodatnih troškova.",
    },
    {
      title: "Tehnička dokumentacija",
      content: documentation,
    },
  ];

  // Filter items with content to avoid hydration mismatch
  const accordionItems = allItems.filter((item) => item.content);

  return (
    <div className={styles.AboutProduct}>
      <div className="container-medium">
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
};

export default AboutProduct;
