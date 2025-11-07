import Download from "@/app/_svg/Download";
import styles from "./PDFLink.module.css";

const PDFLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.pdfLink}>
      <Download />
      <a href={href} target="_blank">
        {children}
      </a>
    </div>
  );
};

export default PDFLink;
