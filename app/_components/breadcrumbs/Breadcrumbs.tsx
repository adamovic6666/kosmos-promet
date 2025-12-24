import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbItem {
  name: string;
  link: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={`${styles.list} container-medium`}>
        {items?.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item?.link} className={styles.item}>
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item?.name}
                </span>
              ) : (
                <>
                  <Link href={item?.link} className={styles.link}>
                    {item?.name}
                  </Link>
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
