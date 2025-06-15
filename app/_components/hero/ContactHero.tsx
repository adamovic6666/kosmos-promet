import styles from "./ContactHero.module.css";

const ContactHero = () => {
  return (
    <section className={styles.hero}>
      <video autoPlay muted loop playsInline>
        <source src="/videos/video-contact.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default ContactHero;
