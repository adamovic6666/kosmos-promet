import InteractiveImage from "../interactive-image/InteractiveImage";
import hotpostsData from "../../../public/data/hotposts.json";
import styles from "./HotSpotsContent.module.css";

interface HotpostItem {
  sifra: string;
  image: string;
  additionalImage?: string;
  category: string;
  aspectRatio: string;
  forProductCode?: string[];
  forAdditionalImageProductCode?: string[];
  dots?: Array<{
    position: { x: number; y: number };
    products: Array<{
      name: string;
      productCode: string;
      image: string;
      link: string;
    }>;
  }>;
  additionalDots?: Array<{
    position: { x: number; y: number };
    products: Array<{
      name: string;
      productCode: string;
      image: string;
      link: string;
    }>;
  }>;
}

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
            const items = (hotpostsData as HotpostItem[]).filter(
              (item) => item.category === category.key
            );

            if (items.length === 0) return null;

            return (
              <div key={category.key} className={styles.category}>
                {items.map((item, index) => {
                  // Prepare images array with their corresponding dots
                  const images = [
                    {
                      src: item.image,
                      aspectRatio: item.aspectRatio,
                      dots: item.dots || []
                    },
                  ];
                  if (item.additionalImage) {
                    images.push({
                      src: item.additionalImage,
                      aspectRatio: item.aspectRatio,
                      dots: item.additionalDots || []
                    });
                  }

                  // Only render InteractiveImage if at least one image has dots
                  const hasAnyDots = images.some(img => img.dots.length > 0);
                  if (hasAnyDots) {
                    return (
                      <InteractiveImage
                        key={`${item.sifra}-${index}`}
                        images={images}
                        categoryTitle={category.title}
                      />
                    );
                  }

                  // If no dots, don't render anything (or render a simple image display)
                  return null;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
