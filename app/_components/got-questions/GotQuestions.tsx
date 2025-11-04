import Viber from "@/app/_svg/Viber";
import styles from "./GotQuestions.module.css";
import Whatsapp from "@/app/_svg/Whatsapp";

const GotQuestions = () => {
  return (
    <div className={styles.gotQuestions}>
      <div className="container-small">
        <h2>Imate pitanje?</h2>
        <p>Pošaljite nam poruku putem Vibera ili WhatsAppa.</p>
        <p>
          Uz tekst možete poslati i sliku dela ili opreme za koji vam je
          potrebna pomoć.
        </p>
        <p>
          Naš tim će vam brzo odgovoriti i pomoći da pronađete pravi proizvod
          ili rešenje.
        </p>
        <div className={styles.gotQuestionsSocials}>
          <a href="viber://chat?number=+38163647205">
            Viber
            <Viber />
          </a>
          <a href="whatsapp://send?text=Zdravo!&phone=+38163647205">
            WhatsApp
            <Whatsapp />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GotQuestions;
