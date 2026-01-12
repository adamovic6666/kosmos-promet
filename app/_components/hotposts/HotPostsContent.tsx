import Image from "next/image";
import hotpostsData from "@/data/hotposts.json";
import styles from "./HotSpotsContent.module.css";

export default function HotPostsContent() {
  const categories = [
    { key: "regulatori-A", title: "Rezervni delovi za regulatore serije A" },
    {
      key: "regulatori-PR1",
      title: "Rezervni delovi za regulatore serije PR1",
    },
    {
      key: "regulatori-PR3",
      title: "Rezervni delovi za regulatore serije PR3",
    },
    { key: "injektori", title: "Rezervni delovi za injektore" },
    { key: "sifoni", title: "Rezervni delovi za sifone" },
    { key: "pumpa-BM-60-30", title: "Rezervni delovi za pumpu BM 60/30" },
    { key: "pumpa-MP-60", title: "Rezervni delovi za pumpu MP 60" },
    { key: "pumpa-MP-25", title: "Rezervni delovi za pumpu MP 25" },
  ];

  return (
    <section className={styles.HotSpotsContent}>
      <div className="container-medium">
        <h2>Specijalna ponuda rezevnih delova!</h2>
        <p>
          Poručite odgovarajuće rezervne delove za prskalice i atomizere! Široka
          ponuda delova za regulatore, injektore, sifone, pumpe i još mnogo
          toga.
        </p>

        <div className={styles.categories}>
          {categories.map((category) => {
            const items = hotpostsData.filter(
              (item) => item.category === category.key
            );

            if (items.length === 0) return null;

            return (
              <div key={category.key} className={styles.category}>
                <h4 className={styles.categoryTitle}>{category.title}</h4>
                <div className={styles.itemsGrid}>
                  {items.map((item, index) => (
                    <div key={`${item.sifra}-${index}`} className={styles.item}>
                      {item.image && (
                        <div
                          className={styles.imageWrapper}
                          style={{ aspectRatio: item.aspectRatio }}
                        >
                          <Image
                            src={item.image}
                            alt={item.sifra || "Rezervni deo"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
