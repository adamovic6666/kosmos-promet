"use client";
import styles from "./InteractiveDiagram.module.css";
import Image from "next/image";

interface InteractiveDiagramProps {
  svgPath: string;
}

const InteractiveDiagram = ({ svgPath }: InteractiveDiagramProps) => {
  return (
    <div className={styles.svgWrapper}>
      <div className="container-medium">
        <div className={styles.svg}>
          <Image
            src={svgPath}
            alt={"Interactive Diagram"}
            className={styles.diagramSvg}
            draggable={false}
            width={800}
            height={600}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveDiagram;
