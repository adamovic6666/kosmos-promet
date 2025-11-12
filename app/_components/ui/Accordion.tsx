"use client";
import React, { useState } from "react";
import styles from "./Accordion.module.css";
import ArrowDown from "@/app/_svg/ArrowDown";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.Accordion}>
      {items.map((item, index) => (
        <div key={index} className={styles.AccordionItem}>
          <div
            className={styles.AccordionHeader}
            onClick={() => toggleAccordion(index)}
          >
            <h3 className={styles.AccordionTitle}>{item.title}</h3>
            <div
              className={`${styles.AccordionArrow} ${
                activeIndex === index ? styles.AccordionArrowOpen : ""
              }`}
            >
              <ArrowDown />
            </div>
          </div>
          <div
            className={`${styles.AccordionContent} ${
              activeIndex === index ? styles.AccordionContentOpen : ""
            }`}
          >
            <div className={styles.AccordionContentInner}>
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
