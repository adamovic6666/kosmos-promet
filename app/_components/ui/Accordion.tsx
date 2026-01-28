"use client";
import React, { useState } from "react";
import styles from "./Accordion.module.css";
import ArrowDown from "@/app/_svg/ArrowDown";
import PDFLink from "../pdf-link/PDFLink";

interface AccordionItem {
  title: string;
  content: string | undefined;
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
        <div key={`accordion-${item.title}-${index}`} className={styles.AccordionItem}>
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
                {item.title === "Tehnička dokumentacija" ? (
                  <PDFLink
                    href={
                      process.env.NEXT_PUBLIC_API_URL + (item.content || "#")
                    }
                  >
                    {item.content?.split("/").pop() || "Preuzmi dokumentaciju"}
                  </PDFLink>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: item.content || "" }} />
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Accordion;
