import React from "react";
import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
  return (
    <section className={styles.privacyPolicy}>
      <div className="container-medium">
        <div className={styles.policyContainer}>
          <h1 className={styles.policyTitle}>Politika privatnosti</h1>
          <p className={styles.policyDate}>
            Datum stupanja na snagu: 1. januar 2025. godine
          </p>

          <p>
            Kosmos Promet d.o.o. posvećen je zaštiti vaše privatnosti. Ova
            Politika privatnosti objašnjava kako prikupljamo, koristimo,
            otkrivamo i štitimo vaše podatke kada posećujete našu veb
            stranicu,&nbsp;
            <a
              className={styles.webiste}
              href="https://www.kosmospromet.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.kosmospromet.com
            </a>
            &nbsp;(&quot;Sajt&quot;). Molimo vas da pažljivo pročitate ovu
            politiku privatnosti. Ako se ne slažete sa uslovima ove politike
            privatnosti, molimo vas da ne pristupate Sajtu.
          </p>

          <div className={styles.policySection}>
            <h4 className={styles.sectionTitle}>
              1. Informacije koje prikupljamo
            </h4>
            <p>
              Možemo prikupljati informacije o vama na razne načine. Informacije
              koje možemo prikupljati na Sajtu uključuju:
            </p>

            <h4 className={styles.subsectionTitle}>1.1 Lični podaci</h4>
            <p>
              Lični podaci, kao što su vaše ime, adresa e-pošte i broj telefona,
              koje nam dobrovoljno dostavite kada se registrujete na Sajtu ili
              kada odlučite da učestvujete u raznim aktivnostima vezanim za
              Sajt, kao što su online čet i forumi.
            </p>

            <h4 className={styles.subsectionTitle}>1.2 Derivativni podaci</h4>
            <p>
              Informacije koje naši serveri automatski prikupljaju kada
              pristupite Sajtu, kao što su vaša IP adresa, tip pregledača,
              operativni sistem, vreme pristupa i stranice koje ste posetili pre
              i nakon pristupanja Sajtu.
            </p>

            <h4 className={styles.subsectionTitle}>
              1.3 Kolačići i tehnologije praćenja
            </h4>
            <p>
              Možemo koristiti kolačiće, veb-pratilice, piksele za praćenje i
              druge tehnologije praćenja na Sajtu kako bismo prilagodili Sajt i
              poboljšali vaše iskustvo. Više informacija o tome kako koristimo
              kolačiće možete pronaći u našoj Politici kolačića.
            </p>
          </div>

          <div className={styles.policySection}>
            <h4 className={styles.sectionTitle}>
              2. Korišćenje vaših informacija
            </h4>
            <p>
              Možemo koristiti informacije koje prikupljamo o vama na sledeće
              načine:
            </p>
            <ul className={styles.bulletList}>
              <li>Za upravljanje, održavanje i poboljšanje Sajta.</li>
              <li>
                Za slanje ažuriranja, promotivnog materijala i drugih
                komunikacija.
              </li>
              <li>
                Za odgovaranje na vaše komentare, pitanja i pružanje korisničke
                podrške.
              </li>
              <li>
                Za praćenje i analiziranje upotrebe i trendova kako bismo
                poboljšali vaše iskustvo na Sajtu.
              </li>
              <li>Za zaštitu Sajta od nelegalnih aktivnosti.</li>
            </ul>
          </div>

          <div className={styles.policySection}>
            <h4 className={styles.sectionTitle}>
              3. Otkrivanje vaših informacija
            </h4>
            <p>
              Možemo deliti informacije koje smo prikupili o vama u određenim
              situacijama. Vaše informacije mogu biti otkrivene na sledeći
              način:
            </p>

            <h4 className={styles.subsectionTitle}>
              3.1 Po zakonu ili zaštiti prava
            </h4>
            <p>
              Ako verujemo da je otkrivanje informacija o vama potrebno kako
              bismo odgovorili na pravni proces, istražili ili ispravili
              potencijalna kršenja naših politika, ili zaštitili prava, imovinu
              i bezbednost drugih, možemo deliti vaše informacije kako je
              dozvoljeno ili zahtevano bilo kojim važećim zakonom, pravilom ili
              propisom.
            </p>

            <h4 className={styles.subsectionTitle}>
              3.2 Treći provajderi usluga
            </h4>
            <p>
              Možemo deliti vaše informacije sa trećim stranama koje pružaju
              usluge za nas ili u naše ime, kao što su analiza podataka,
              isporuka e-pošte, usluge hostinga, korisnička podrška i
              marketinška pomoć.
            </p>
          </div>

          <div className={styles.policySection}>
            <h4 className={styles.sectionTitle}>4. Čuvanje podataka</h4>
            <p>
              Čuvamo vaše informacije onoliko dugo koliko je potrebno da
              ispunimo svrhe navedene u ovoj Politici privatnosti, osim ako je
              duži period čuvanja zahtevan ili dozvoljen zakonom.
            </p>
          </div>

          <div className={styles.policySection}>
            <h4 className={styles.sectionTitle}>
              5. Sigurnost vaših informacija
            </h4>
            <p>
              Koristimo administrativne, tehničke i fizičke mere sigurnosti kako
              bismo pomogli zaštiti vaše lične informacije. Iako smo preduzeli
              razumne korake da obezbedimo lične podatke koje nam pružate,
              imajte na umu da uprkos našim naporima, nijedna sigurnosna mera
              nije savršena ili neprobojna, i nijedna metoda prenosa podataka ne
              može biti zagarantovana protiv bilo kakvog presretanja ili druge
              vrste zloupotrebe.
            </p>
          </div>

          <div className={styles.policySection}>
            <h4 className={styles.sectionTitle}>6. Vaša prava</h4>
            <p>
              Prema Opštoj uredbi o zaštiti podataka (GDPR) i srpskom
              zakonodavstvu, imate sledeća prava:
            </p>
            <ul className={styles.bulletList}>
              <li>
                Pravo na pristup, ažuriranje ili brisanje informacija koje imamo
                o vama.
              </li>
              <li>
                Pravo na ispravku ako su vaše informacije netačne ili nepotpune.
              </li>
              <li>Pravo na prigovor na našu obradu vaših ličnih podataka.</li>
              <li>Pravo na prenosivost podataka.</li>
              <li>
                Pravo da povučete pristanak u bilo kom trenutku kada se
                oslanjamo na vaš pristanak za obradu vaših ličnih podataka.
              </li>
              <li>Pravo da podnesete žalbu nadzornom organu.</li>
            </ul>
          </div>

          <div className={styles.policySection}>
            <h4 className={styles.sectionTitle}>7. Kontaktirajte nas</h4>
            <p>
              Ako imate pitanja ili komentare o ovoj Politici privatnosti,
              molimo vas da nas kontaktirate na:
            </p>
            <p className={styles.contactInfo}>
              Kosmos Promet d.o.o.
              <br />
              Golubinačka 28, 22320 Inđija
              <br />
              Email:{" "}
              <a href="mailto:office@kosmospromet.com" className={styles.link}>
                office@kosmospromet.com
              </a>
              <br />
              Telefon: +381-22-557-651
            </p>
          </div>

          <div className={styles.policySection}>
            <h4 className={styles.sectionTitle}>
              8. Izmene ove Politike privatnosti
            </h4>
            <p>
              Možemo povremeno ažurirati ovu Politiku privatnosti. Obavestićemo
              vas o svim izmenama ažuriranjem &quot;Datuma stupanja na
              snagu&quot; na vrhu ove Politike privatnosti. Preporučujemo da
              povremeno pregledate ovu Politiku privatnosti kako biste ostali
              informisani o ažuriranjima. Korišćenjem Sajta, slažete se sa
              uslovima ove Politike privatnosti.
            </p>
          </div>

          {/* POLITIKA KOLAČIĆA */}
          <div className={styles.cookiePolicyContainer}>
            <h1 className={styles.policyTitle}>Politika kolačića</h1>
            <p className={styles.policyDate}>
              Datum stupanja na snagu: 1. januar 2025.
            </p>

            <p>
              Kosmos Promet d.o.o koristi kolačiće i slične tehnologije praćenja
              na našoj veb stranici
              <a href="https://www.kosmospromet.com" className={styles.link}>
                {" "}
                www.kosmospromet.com
              </a>{" "}
              (&quot;Sajt&quot;). Ova Politika kolačića objašnjava šta su
              kolačići, kako ih koristimo i kako možete upravljati svojim
              podešavanjima.
            </p>

            <div className={styles.policySection}>
              <h4 className={styles.sectionTitle}>1. Šta su kolačići?</h4>
              <p>
                Kolačići su male tekstualne datoteke koje se skladište na vašem
                uređaju (računaru, tabletu ili mobilnom telefonu) kada posetite
                neku veb stranicu. Oni pomažu u poboljšanju korisničkog iskustva
                pamćenjem vaših podešavanja i interakcija sa Sajtom.
              </p>
            </div>

            <div className={styles.policySection}>
              <h4 className={styles.sectionTitle}>
                2. Vrste kolačića koje koristimo
              </h4>
              <p>Na našem Sajtu koristimo sledeće vrste kolačića:</p>

              <h4 className={styles.subsectionTitle}>2.1 Neophodni kolačići</h4>
              <p>
                Ovi kolačići su potrebni da bi Sajt ispravno funkcionisao.
                Omogućavaju vam navigaciju i korišćenje funkcija, kao što su
                pristup sigurnim delovima Sajta. Bez ovih kolačića, određene
                usluge možda neće biti dostupne.
              </p>

              <h4 className={styles.subsectionTitle}>
                2.2 Kolačići za analitiku i performanse
              </h4>
              <p>
                Ovi kolačići nam pomažu da razumemo kako posetioci koriste naš
                Sajt, prikupljanjem anonimnih podataka. Koristimo ih za
                poboljšanje funkcionalnosti Sajta i korisničkog iskustva. U tu
                svrhu koristimo alate kao što je Google Analytics.
              </p>

              <h4 className={styles.subsectionTitle}>
                2.3 Funkcionalni kolačići
              </h4>
              <p>
                Ovi kolačići pamte vaša podešavanja i izbore (npr. jezik) kako
                bi vam omogućili personalizovano iskustvo pretrage.
              </p>

              <h4 className={styles.subsectionTitle}>
                2.4 Reklamni i kolačići trećih strana
              </h4>
              <p>
                Moguće je da dozvolimo trećim stranama (kao što su društvene
                mreže ili oglašivački partneri) da postave kolačiće na vaš
                uređaj kako bi pratili vaše aktivnosti i prikazivali relevantne
                oglase. Ovi kolačići mogu prikupljati informacije o vašim
                posetama našem Sajtu i drugim veb lokacijama.
              </p>
            </div>

            <div className={styles.policySection}>
              <h4 className={styles.sectionTitle}>
                3. Kako koristimo kolačiće
              </h4>
              <p>Koristimo kolačiće u sledeće svrhe:</p>
              <ul className={styles.bulletList}>
                <li>Omogućavanje pravilnog funkcionisanja Sajta.</li>
                <li>
                  Poboljšanje korisničkog iskustva pamćenjem vaših podešavanja.
                </li>
                <li>Analiza saobraćaja i poboljšanje performansi Sajta.</li>
                <li>
                  Prikazivanje ciljanih reklama i merenje njihove efikasnosti.
                </li>
              </ul>
            </div>

            <div className={styles.policySection}>
              <h4 className={styles.sectionTitle}>
                4. Kako upravljati kolačićima
              </h4>
              <p>
                Možete kontrolisati i upravljati kolačićima putem podešavanja
                vašeg pregledača. Većina pregledača vam omogućava da:
              </p>
              <ul className={styles.bulletList}>
                <li>Obrišete postojeće kolačiće.</li>
                <li>Blokirate sve ili određene vrste kolačića.</li>
                <li>Podesite preferencije u vezi sa korišćenjem kolačića.</li>
              </ul>
              <p>
                Za podešavanje kolačića, posetite stranicu pomoći vašeg
                pregledača:
              </p>
              <ul className={styles.linkList}>
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Chrome: Upravljanje kolačićima
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mozilla Firefox: Upravljanje kolačićima
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Safari: Upravljanje kolačićima
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Microsoft Edge: Upravljanje kolačićima
                  </a>
                </li>
              </ul>
              <p>
                Imajte na umu da onemogućavanje određenih kolačića može uticati
                na funkcionalnost našeg Sajta.
              </p>
            </div>

            <div className={styles.policySection}>
              <h4 className={styles.sectionTitle}>5. Kolačići trećih strana</h4>
              <p>
                Neke usluge trećih strana integrisane u naš Sajt, poput Google
                Analytics-a ili društvenih mreža, mogu postavljati sopstvene
                kolačiće. Nemamo kontrolu nad tim kolačićima i preporučujemo da
                pročitate politiku privatnosti tih trećih strana za više
                informacija.
              </p>
            </div>

            <div className={styles.policySection}>
              <h4 className={styles.sectionTitle}>
                6. Izmene ove Politike kolačića
              </h4>
              <p>
                Možemo ažurirati ovu Politiku kolačića s vremena na vreme. Sve
                izmene će biti objavljene na ovoj stranici uz ažurirani „Datum
                stupanja na snagu&quot;.
              </p>
            </div>

            <div className={styles.policySection}>
              <h4 className={styles.sectionTitle}>7. Kontaktirajte nas</h4>
              <p>
                Ako imate bilo kakva pitanja u vezi sa ovom Politikom kolačića,
                možete nas kontaktirati na:
              </p>
              <p className={styles.contactInfo}>
                Kosmos Promet d.o.o.
                <br />
                Golubinačka 28, 22320 Inđija
                <br />
                Email:{" "}
                <a
                  href="mailto:office@kosmospromet.com"
                  className={styles.link}
                >
                  office@kosmospromet.com
                </a>
                <br />
                Telefon: +381-22-557-651
              </p>
              <p>
                Nastavkom korišćenja našeg Sajta, pristajete na korišćenje
                kolačića u skladu sa ovom Politikom kolačića.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
