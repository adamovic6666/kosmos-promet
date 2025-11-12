import { Product } from "@/app/_types";
import ProductRange from "../about-us/ProductRange";
import Checkmark from "@/app/_svg/Checkmark";
import styles from "./Wellcome.module.css";
import Image from "next/image";
import PDFLink from "../pdf-link/PDFLink";
import CustomSwiper from "../ui/CustomSwiper";

const Wellcome = ({ allProducts }: { allProducts: Product[] }) => {
  const logoData = [
    { src: "/images/morava.webp", alt: "Morava" },
    { src: "/images/agromehanika.webp", alt: "Agromehanika" },
    { src: "/images/geoline.webp", alt: "Geoline" },
    { src: "/images/arag.webp", alt: "ARAG" },
    { src: "/images/lechler.webp", alt: "Lechler" },
  ];

  return (
    <section className={styles.wellcome}>
      <div className="container-small">
        <h2>Tri decenije kvaliteta u službi poljoprivrede</h2>
        <p>
          Naša osnovna delatnost je proizvodnja i prodaja potrošnih delova za
          traktorske prskalice i atomizere. Od osnivanja 1993. godine pa do
          danas, neprestano širimo svoj asortiman i mrežu kupaca. Poslujemo ne
          samo na domaćem tržištu već i u svim zemljama regiona. Kroz
          dugogodišnje iskustvo, razvili smo prepoznatljiv kvalitet, pouzdanost
          i profesionalan pristup svakoj saradnji. Naše prednosti su:
        </p>

        <ul className={styles.wellcomeList}>
          <li>
            <Checkmark />
            Širok asortiman proizvoda visokog kvaliteta (preko 1.200 artikala)
          </li>
          <li>
            <Checkmark />
            Dostupnost svih proizvoda sa lagera
          </li>
          <li>
            <Checkmark />
            Transparentne cene i profesionalan odnos prema kupcima
          </li>
          <li>
            <Checkmark />
            Stručna tehnička podrška i savet prilikom kupovine
          </li>
          <li>
            <Checkmark />
            Brza isporuka (sve porudžbine do 13h šalju se istog dana kurirskom
            službom u zemlji)
          </li>
        </ul>

        <div className={styles.wellcomeImage}>
          <Image
            alt="O nama"
            src={"/images/o-nama-section-img.webp"}
            layout="responsive"
            width={640}
            height={360}
          />
        </div>
        <h2>Naši partneri</h2>
        <div className={styles.wellcomePartners}>
          <p>
            Pored proizvoda iz sopstvene proizvodnje, u ponudi imamo i artikle
            renomiranih brendova koje zastupamo:
            <b> Morava, Agromehanika, Geoline, ARAG i Lechler.</b> Zahvaljujući
            saradnji sa ovim proizvođačima, našim kupcima obezbeđujemo širok
            izborkvalitetnih i pouzdanih delova.
          </p>
          <div className={styles.logosMobile}>
            <CustomSwiper
              images={{
                thumb: logoData.map((logo) => logo.src),
                orig: logoData.map((logo) => logo.src),
              }}
              // imageBasePath=""
              id="logos-swiper"
            />
          </div>
          <div className={styles.logos}>
            {logoData.map((logo, index) => (
              <div key={index}>
                <Image
                  alt={logo.alt}
                  src={logo.src}
                  width={150}
                  height={75}
                  layout="responsive"
                />
              </div>
            ))}
          </div>
        </div>

        <h2>Sertifikati</h2>
        <div className={styles.wellcomeCertificates}>
          <p>
            Naš kvalitet potvrđuju sertifikati izdati od strane Poljoprivrednog
            fakulteta u Novom Sadu, laboratorije za kontrolu tehnike za
            aplikaciju pesticida.
          </p>
          <div className={styles.pdfs}>
            <PDFLink href="/pdf/sertifikat-1.pdf">
              Sertifikat o kvalitetu 12-01/2015
            </PDFLink>
            <PDFLink href="/pdf/sertifikat-2.pdf">
              Sertifikat o kvalitetu 12-02/2015
            </PDFLink>
          </div>
        </div>

        <h2>Katalozi</h2>

        <div className={styles.wellcomeCatalogs}>
          <p>
            Za više informacija o našem asortimanu, možete preuzeti aktuelne
            kataloge u elektronskom formatu.
          </p>
          <div className={styles.pdfs}>
            <PDFLink href="/pdf/katalog-regulatora.pdf">
              Katalog regulatora
            </PDFLink>
            <PDFLink href="/pdf/katalog-proizvoda.pdf">
              Katalog proizvoda{" "}
            </PDFLink>
          </div>
        </div>
        <ProductRange allProducts={allProducts} />
      </div>
    </section>
  );
};

export default Wellcome;
