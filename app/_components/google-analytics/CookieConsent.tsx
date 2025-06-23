"use client";
import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";
import Button from "../ui/Button";
import { ConsentOptions, CookieConsentProps } from "@/app/_types";

export default function CookieConsent({
  onPreferenceChange,
}: CookieConsentProps) {
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [preferences, setPreferences] = useState<ConsentOptions>({
    necessary: true, // Always true as these are required
    analytics: false,
    marketing: false,
  });

  // Handle component mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check for stored consent once mounted
  useEffect(() => {
    if (!isMounted) return;

    const storedConsent = localStorage.getItem("cookie-consent-preferences");

    if (storedConsent) {
      try {
        const parsedConsent = JSON.parse(storedConsent);
        setPreferences(parsedConsent);
        onPreferenceChange(parsedConsent);
      } catch {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, [isMounted, onPreferenceChange]);

  const savePreferences = (newPreferences: ConsentOptions) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "cookie-consent-preferences",
        JSON.stringify(newPreferences)
      );
    }
    setPreferences(newPreferences);
    onPreferenceChange(newPreferences);
    setShowModal(false);
    setShowBanner(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(necessaryOnly);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const handleToggleConsent = (key: keyof ConsentOptions) => {
    if (key === "necessary") return; // Can't toggle necessary

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const openConsentManager = () => {
    setShowModal(true);
    setShowBanner(false);
  };

  // Don't render anything during server-side rendering
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className={styles.cookieBanner}>
          <div className="container">
            <div className={styles.cookieContent}>
              <div>
                <p className={styles.cookieText}>
                  Koristimo kolačiće kako bismo poboljšali vaše korisničko
                  iskustvo na našem sajtu. Klikom na &quot;Prihvati sve&quot;,
                  pristajete na upotrebu svih kolačića. Više informacija možete
                  pronaći u našoj{" "}
                  <a href="/politika-privatnosti" className={styles.cookieLink}>
                    Politici privatnosti
                  </a>
                  .
                </p>
              </div>
              <div className={styles.cookieButtons}>
                <Button onClick={openConsentManager} type="ghost">
                  Podešavanja kolačića
                </Button>
                <div className={styles.flex}>
                  <Button onClick={handleAcceptNecessary}>Odbij sve</Button>
                  <Button onClick={handleAcceptAll}>Prihvati sve</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preference Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>PODEŠAVANJE KOLAČIĆA</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className={styles.closeButton}
                >
                  ✕
                </button>
              </div>

              <p className={styles.modalText}>
                Koristimo kolačiće kako bi sajt ispravno funkcionisao, kako
                bismo poboljšali vaše iskustvo i personalizovali sadržaj i
                oglase. Svoja podešavanja kolačića možete izabrati u nastavku.
                Više informacija možete pronaći u našoj{" "}
                <a href="/politika-privatnosti" className={styles.cookieLink}>
                  Politici privatnosti
                </a>
                .
              </p>

              <div className={styles.cookieOptions}>
                {/* Necessary Cookies */}
                <div className={styles.cookieOption}>
                  <div className={styles.optionHeader}>
                    <h3 className={styles.optionTitle}>Neophodni kolačići</h3>
                    <div className={styles.toggleDisabled}>
                      <div className={styles.toggleHandle}></div>
                    </div>
                  </div>
                  <p className={styles.optionDescription}>
                    Ovi kolačići su ključni za ispravno funkcionisanje sajta i
                    ne mogu se isključiti.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className={styles.cookieOption}>
                  <div className={styles.optionHeader}>
                    <h3 className={styles.optionTitle}>Analitički kolačići</h3>
                    <button
                      onClick={() => handleToggleConsent("analytics")}
                      className={
                        preferences.analytics
                          ? styles.toggleActive
                          : styles.toggle
                      }
                    >
                      <div
                        className={
                          preferences.analytics
                            ? styles.toggleHandleActive
                            : styles.toggleHandle
                        }
                      ></div>
                    </button>
                  </div>
                  <p className={styles.optionDescription}>
                    Ovi kolačići nam pomažu da razumemo kako posetioci koriste
                    naš sajt, koje stranice se najčešće posećuju i kako se
                    korisnici kreću kroz sajt.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className={styles.cookieOption}>
                  <div className={styles.optionHeader}>
                    <h3 className={styles.optionTitle}>Marketinški kolačići</h3>
                    <button
                      onClick={() => handleToggleConsent("marketing")}
                      className={
                        preferences.marketing
                          ? styles.toggleActive
                          : styles.toggle
                      }
                    >
                      <div
                        className={
                          preferences.marketing
                            ? styles.toggleHandleActive
                            : styles.toggleHandle
                        }
                      ></div>
                    </button>
                  </div>
                  <p className={styles.optionDescription}>
                    Ovi kolačići se koriste za praćenje posetilaca na različitim
                    veb sajtovima, kako bi se prikazivali relevantni i
                    personalizovani oglasi.
                  </p>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <div className={styles.flex}>
                  <Button onClick={handleAcceptNecessary}>Odbij sve</Button>
                  <Button onClick={handleAcceptAll}>Prihvati sve</Button>
                </div>
                <Button onClick={handleSavePreferences}>
                  Sačuvaj podešavanja
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
