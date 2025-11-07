import Phone from "@/app/_svg/Phone";
import styles from "./Contact.module.css";
import Pin from "@/app/_svg/Pin";
import Time from "@/app/_svg/Time";
import Mobile from "@/app/_svg/Mobile";
import Email from "@/app/_svg/Email";
import Download from "@/app/_svg/Download";
const Contact = () => {
  return (
    <section className={styles.contact}>
      <div className="container-small">
        <div className={styles.contactInfo}>
          <div className={styles.contactInfoItem}>
            <Pin />
            <div>
              <h5>Kosmos Promet d.o.o.</h5>
              <div className={styles.address}>
                <span>Golubinačka 28</span>
                <span>22320 Inđija</span>
                <span>Srbija</span>
              </div>
            </div>
          </div>

          <div className={styles.contactInfoItem}>
            <Time />
            <div>
              <h5>Ponedeljak - Četvrtak</h5>
              <span>8:30 - 14:30</span>
            </div>
          </div>
          <div className={styles.contactInfoItem}>
            <div className={styles.contactInfoItemFlex}>
              <div>
                <Phone />
                <div>
                  <h5>T/F:</h5>
                  <span>
                    <a href="tel:+38122557651">&nbsp;+381.22.557.651</a>
                  </span>
                </div>
              </div>

              <div>
                <Mobile />
                <div>
                  <h5>M:</h5>
                  <span>
                    <a href="tel:+38163647205">&nbsp;+381.63.647.205</a>
                  </span>
                </div>
              </div>
              <div>
                <Email />
                <div>
                  <h5>E:</h5>
                  <span>
                    <a href="mailto:office@kosmospromet.com">
                      &nbsp;office@kosmospromet.com
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <Download />
                <span>
                  <a href="/pdf/podaci-o-preduzecu.pdf" target="_blank">
                    Podaci o preduzeću
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.map} container`}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.751942009262!2d20.079305800000004!3d45.0430203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475af8bc6a0173ed%3A0xaeff442faa3b23cc!2sKosmos%20Promet!5e1!3m2!1sen!2srs!4v1762208901016!5m2!1sen!2srs"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
