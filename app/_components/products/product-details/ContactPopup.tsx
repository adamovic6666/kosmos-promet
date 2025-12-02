import styles from "./ProductDetails.module.css";
import Viber from "@/app/_svg/Viber";
import Whatsapp from "@/app/_svg/Whatsapp";
import Phone from "@/app/_svg/Phone";
import Email from "@/app/_svg/Email";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup = ({ isOpen, onClose }: ContactPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.contactPopupOverlay} onClick={onClose}>
      <div className={styles.contactPopup} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closePopup}
          onClick={onClose}
          type="button"
          aria-label="Zatvori"
        >
          ✕
        </button>
        <h3>Kontaktirajte nas</h3>
        <p>Izaberite način komunikacije:</p>
        <div className={styles.contactOptions}>
          <a
            href="viber://chat?number=+38163647205"
            className={styles.contactOption}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Viber />
            <span>Viber</span>
          </a>
          <a
            href="https://wa.me/38163647205"
            className={styles.contactOption}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Whatsapp />
            <span>WhatsApp</span>
          </a>
          <a href="tel:+38163647205" className={styles.contactOption}>
            <Phone />
            <span>Telefon</span>
          </a>
          <a
            href="mailto:office@kosmospromet.com"
            className={styles.contactOption}
          >
            <Email />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
