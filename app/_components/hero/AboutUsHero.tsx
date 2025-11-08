import styles from "./AboutUsHero.module.css";

const AboutUsHero = () => {
  return (
    <section className={styles.hero}>
      <video autoPlay muted loop playsInline>
        <source src="/videos/o-nama-video.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default AboutUsHero;
