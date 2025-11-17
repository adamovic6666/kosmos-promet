"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./InteractiveImage.module.css";
import dotsData from "@/public/data/interactive-dots.json";

interface Dot {
  x: number;
  y: number;
  name: string;
  productCode: string;
  color: string;
  image?: string;
  description?: string;
}

interface InteractiveImageProps {
  image: string;
  dataId?: string;
}

const InteractiveImage = ({ image, dataId = "1" }: InteractiveImageProps) => {
  const dots: Dot[] = dotsData[dataId as keyof typeof dotsData] || [];
  const [activeDot, setActiveDot] = useState<Dot | null>(null);

  const handleDotClick = (dot: Dot) => {
    setActiveDot(dot);
  };

  return (
    <div className={styles.interactiveDiagram}>
      <div className="container-medium">
        <div className={styles.image}>
          <Image src={image} alt="Interactive Diagram" layout="fill" />
          <div className={styles.dotsOverlay}>
            {dots.map((dot) => (
              <div
                key={dot.x + dot.y}
                className={styles.dot}
                style={{
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  backgroundColor: dot.color,
                }}
                onClick={() => handleDotClick(dot)}
              />
            ))}

            {activeDot && (
              <>
                <div
                  className={styles.modalBackdrop}
                  onClick={() => setActiveDot(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setActiveDot(null);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Close modal"
                />
                <div
                  key={activeDot.x + activeDot.y}
                  className={styles.modal}
                  style={{
                    left: `${activeDot.x}%`,
                    top: `${activeDot.y}%`,
                  }}
                >
                  <div className={styles.modalContent}>
                    {activeDot.image && (
                      <div className={styles.modalImage}>
                        <Image
                          src={activeDot.image}
                          alt={activeDot.name}
                          fill
                        />
                      </div>
                    )}
                    <div className={styles.modalInfo}>
                      <h3>{activeDot.name}</h3>
                    </div>
                  </div>
                  <div className={styles.modalPointer}></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveImage;
