"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import calculationData from "../../../public/data/data.json";
import productData from "../../../public/data/proizvodi.json";
import Select from "../ui/Select";
import styles from "./Calculator.module.css";
import Input from "../ui/Input";
import Image from "next/image";

interface SelectOption {
  value: string;
  label: string;
}

interface CalculationData {
  ID: string;
  velicina: string;
  pritisak: string;
  potrosnja: string;
  boja: string;
  link?: string;
}

interface ProductData {
  sifra: number;
  naziv: string;
  cena: number;
  link: string;
  prodavnica?: string;
  boja: string;
  matrijal: string;
  vetar: number;
  punteren: number;
  redjedna: number;
  redvise: number;
  atomizer: number;
  keratomizer: number;
}

interface StandardSprayResults {
  protok: string;
  ukupProtok: string;
  vreme: string;
  vremeJedan: string;
  potrebno: string;
}

interface DirectedSprayResults {
  protok: string;
  ukupProtok: string;
  vremeJedan: string;
  vremeUkupno: string;
  ukupnaKolicina: string;
}

interface AtomizerCeramicResults {
  protok: string;
  potrebniPritisak: string;
  potrebniProtok: string;
  ukupProtok: string;
  vremeJedan: string;
  vremeUkupno: string;
  ukupnaKolicina: string;
}

type CalculationResults =
  | StandardSprayResults
  | DirectedSprayResults
  | AtomizerCeramicResults;

const Calculator = () => {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      selectedType: "",
      selectedNozzle: "",
      selectedMaterial: "",
      selectedWind: "0",
      kolicina: 0,
      brzina: 0,
      razmak: 0,
      brojdizni: 0,
      povrsina: 0,
      sirinamlaza: 0,
      brojredova: 0,
      izmerenaKolicina: 0,
      vremeKolicina: 0,
      pritisak: 0,
      actualAmount: 0,
    },
  });

  const selectedType = watch("selectedType");
  const selectedNozzle = watch("selectedNozzle");
  const selectedMaterial = watch("selectedMaterial");
  const selectedWind = watch("selectedWind");

  const kolicina = watch("kolicina");
  const brzina = watch("brzina");
  const razmak = watch("razmak");
  const brojdizni = watch("brojdizni");
  const povrsina = watch("povrsina");
  const sirinamlaza = watch("sirinamlaza");
  const brojredova = watch("brojredova");
  const izmerenaKolicina = watch("izmerenaKolicina");
  const vremeKolicina = watch("vremeKolicina");
  const pritisak = watch("pritisak");
  const actualAmount = watch("actualAmount");

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showActualAmount, setShowActualAmount] = useState(false);
  const [tableResults, setTableResults] = useState<CalculationData[]>([]);
  const [finalProducts, setFinalProducts] = useState<ProductData[]>([]);

  const sprayTypes: SelectOption[] = [
    { value: "standardno", label: "1.Prskanje standardno" },
    {
      value: "usmereno-jedna",
      label: "2.Usmereno prskanje sa jednom diznom po redu",
    },
    {
      value: "usmereno-vise",
      label: "3.Usmereno prskanje sa više dizni po redu",
    },
    {
      value: "atomizer-dizne",
      label: "4.Prskanje atomizerom sa diznama za atomizere",
    },
    {
      value: "atomizer-keramika",
      label: "5.Prskanje atomizerom sa keramičkim pločicama",
    },
  ];

  const nozzleOptions: SelectOption[] = [
    { value: "015", label: "015 - dizna zelena" },
    { value: "02", label: "02 - dizna žuta" },
    { value: "025", label: "025 - dizna ljubičasta" },
    { value: "03", label: "03 - dizna plava" },
    { value: "04", label: "04 – dizna crvena" },
    { value: "06", label: "06 – dizna siva" },
    { value: "0.8", label: "0,8 - Keramička pločica za atomizer" },
    { value: "1.0", label: "1,0 - Keramička pločica za atomizer" },
    { value: "1.2", label: "1,2 - Keramička pločica za atomizer" },
    { value: "1.5", label: "1,5 - Keramička pločica za atomizer" },
    { value: "2.0", label: "2,0 - Keramička pločica za atomizer" },
  ];

  const materialOptions: SelectOption[] = [
    { value: "plast", label: "Plastika" },
    { value: "keramika", label: "Keramika" },
    { value: "mesing", label: "Mesing" },
  ];

  const windOptions: SelectOption[] = [
    { value: "0", label: "NE" },
    { value: "1", label: "DA" },
  ];

  const calculateStandardSpray = () => {
    const izrProtok = (kolicina * brzina * razmak) / 60000;
    const izrVreme = (kolicina * povrsina) / (izrProtok * brojdizni);
    const izrVremehektar = izrVreme / povrsina;
    const ukupprotok = brojdizni * izrProtok;
    const ukupkol = kolicina * povrsina;

    const newResults = {
      protok: izrProtok.toFixed(1),
      ukupProtok: ukupprotok.toFixed(1),
      vreme: izrVreme.toFixed(1),
      vremeJedan: izrVremehektar.toFixed(1),
      potrebno: ukupkol.toFixed(1),
    };

    setResults(newResults);
    searchTable(izrProtok);
  };

  const calculateDirectedSingle = () => {
    const koeficijent = sirinamlaza / razmak;
    const stvarnaKolicina = koeficijent * kolicina;

    setValue("actualAmount", parseFloat(stvarnaKolicina.toFixed(1)));
    setShowActualAmount(true);
  };

  const continueDirectedSingle = () => {
    const izrProtokjedan = (actualAmount * brzina * sirinamlaza) / 60000;
    const izrUkupniprotok = brojdizni * izrProtokjedan;
    const izrVremejedan = actualAmount / (brojdizni * izrProtokjedan);
    const izrVremeukupno =
      (povrsina * actualAmount) / (brojdizni * izrProtokjedan);
    const ukupkol = actualAmount * povrsina;

    const newResults = {
      protok: izrProtokjedan.toFixed(1),
      ukupProtok: izrUkupniprotok.toFixed(1),
      vremeJedan: izrVremejedan.toFixed(1),
      vremeUkupno: izrVremeukupno.toFixed(1),
      ukupnaKolicina: ukupkol.toFixed(1),
    };

    setResults(newResults);
    searchTable(izrProtokjedan);
  };

  const calculateDirectedMultiple = () => {
    const koeficijent = razmak / brojdizni;
    const izrprotokjedan = (brzina * kolicina * koeficijent) / 60000;
    const izrprotokminuta = brojdizni * brojredova * izrprotokjedan;
    const izrprskanjejedan =
      kolicina / (izrprotokjedan * brojdizni * brojredova);
    const izrukupnovreme =
      (kolicina * povrsina) / (izrprotokjedan * brojdizni * brojredova);
    const izrpotrebnakol = kolicina * povrsina;

    const newResults = {
      protok: izrprotokjedan.toFixed(1),
      ukupProtok: izrprotokminuta.toFixed(1),
      vremeJedan: izrprskanjejedan.toFixed(1),
      vremeUkupno: izrukupnovreme.toFixed(1),
      ukupnaKolicina: izrpotrebnakol.toFixed(1),
    };

    setResults(newResults);
    searchTable(izrprotokjedan);
  };

  const calculateAtomizer = () => {
    const koeficijent = razmak / brojdizni;
    const izrprotokjedan = (brzina * kolicina * koeficijent) / 60000;
    const izrprotokminuta = brojdizni * izrprotokjedan;
    const izrprskanjejedan = kolicina / (izrprotokjedan * brojdizni);
    const izrukupnovreme = (kolicina * povrsina) / (izrprotokjedan * brojdizni);
    const izrpotrebnakol = kolicina * povrsina;

    const newResults = {
      protok: izrprotokjedan.toFixed(1),
      ukupProtok: izrprotokminuta.toFixed(1),
      vremeJedan: izrprskanjejedan.toFixed(1),
      vremeUkupno: izrukupnovreme.toFixed(1),
      ukupnaKolicina: izrpotrebnakol.toFixed(1),
    };

    setResults(newResults);
    searchTable(izrprotokjedan);
  };

  const calculateAtomizerCeramic = () => {
    const izrprotokjedan = (60 * izmerenaKolicina) / vremeKolicina;
    const konstanta = razmak / brojdizni;
    const potrebniprotok = (konstanta * kolicina * brzina) / 60000;
    const izrpritisak = (potrebniprotok / izrprotokjedan) ** 2 * pritisak;
    const izrprotokminuta = potrebniprotok * brojdizni;
    const izrvremejedan = kolicina / (potrebniprotok * brojdizni);
    const izrvremeukupno = (kolicina * povrsina) / (potrebniprotok * brojdizni);
    const izrkolicinaukupna = kolicina * povrsina;

    const newResults = {
      protok: izrprotokjedan.toFixed(1),
      potrebniPritisak: izrpritisak.toFixed(1),
      potrebniProtok: potrebniprotok.toFixed(1),
      ukupProtok: izrprotokminuta.toFixed(1),
      vremeJedan: izrvremejedan.toFixed(1),
      vremeUkupno: izrvremeukupno.toFixed(1),
      ukupnaKolicina: izrkolicinaukupna.toFixed(1),
    };

    setResults(newResults);
    searchTable(potrebniprotok);
  };

  const searchTable = (protok: number) => {
    const rezultat = protok.toFixed(2);
    console.log(rezultat, "rezultat");
    const matchingResults = calculationData.filter(
      (item) => item.potrosnja === rezultat
    );
    setTableResults(matchingResults);
  };

  const searchProducts = () => {
    const searchMatrijal = selectedMaterial;
    const searchVetar = parseInt(selectedWind);

    const matchingProducts = productData.filter((product) => {
      const materialMatch = product.matrijal === searchMatrijal;
      const windMatch = product.vetar === searchVetar;
      const nozzleMatch = product.boja === selectedNozzle;

      let typeMatch = true;
      switch (selectedType) {
        case "standardno":
          typeMatch = product.punteren === 1;
          break;
        case "usmereno-jedna":
          typeMatch = product.redjedna === 1;
          break;
        case "usmereno-vise":
          typeMatch = product.redvise === 1;
          break;
        case "atomizer-dizne":
          typeMatch = product.atomizer === 1;
          break;
        case "atomizer-keramika":
          typeMatch = product.keratomizer === 1;
          break;
      }

      return materialMatch && windMatch && nozzleMatch && typeMatch;
    });

    setFinalProducts(matchingProducts);
  };

  const handleCalculate = () => {
    switch (selectedType) {
      case "standardno":
        calculateStandardSpray();
        break;
      case "usmereno-jedna":
        calculateDirectedSingle();
        break;
      case "usmereno-vise":
        calculateDirectedMultiple();
        break;
      case "atomizer-dizne":
        calculateAtomizer();
        break;
      case "atomizer-keramika":
        calculateAtomizerCeramic();
        break;
    }
  };

  const renderInputFields = () => {
    switch (selectedType) {
      case "standardno":
        return (
          <div className="form-fields">
            <div className="field">
              <label>Preporučena količina po hektaru (Lit.):</label>
              <Input name="kolicina" control={control} type="number" />
            </div>
            <div className="field">
              <label>Brzina kretanja (Km/h):</label>
              <Input type="number" name="brzina" control={control} />
            </div>
            <div className="field">
              <label>Razmak između dizni (Cm):</label>
              <Input type="number" name="razmak" control={control} />
            </div>
            <div className="field">
              <label>Broj dizni na uređaju:</label>
              <Input type="number" name="brojdizni" control={control} />
            </div>
            <div className="field">
              <label>Površina za prskanje (Ha):</label>
              <Input type="number" name="povrsina" control={control} />
            </div>
          </div>
        );

      case "usmereno-jedna":
        return (
          <div className="form-fields">
            <div className="field">
              <label>Preporučena količina za ceo teren (Lit.):</label>
              <Input type="number" name="kolicina" control={control} />
            </div>
            <div className="field">
              <label>Brzina kretanja (Km/h):</label>
              <Input type="number" name="brzina" control={control} />
            </div>
            <div className="field">
              <label>Površina za prskanje (Ha):</label>
              <Input type="number" name="povrsina" control={control} />
            </div>
            <div className="field">
              <label>Broj dizni na uređaju:</label>
              <Input type="number" name="brojdizni" control={control} />
            </div>
            <div className="field">
              <label>Razmak između dizni (Cm):</label>
              <Input type="number" name="razmak" control={control} />
            </div>
            <div className="field">
              <label>Širina mlaza jedne dizne (Cm):</label>
              <Input type="number" name="sirinamlaza" control={control} />
            </div>
            {showActualAmount && (
              <div className="field">
                <label>Stvarna količina:</label>
                <Input type="number" name="stvarnakolicina" control={control} />
              </div>
            )}
          </div>
        );

      case "usmereno-vise":
        return (
          <div className="form-fields">
            <div className="field">
              <label>Preporučena količina po hektaru (Lit.):</label>
              <Input type="number" name="kolicina" control={control} />
            </div>
            <div className="field">
              <label>Brzina kretanja (Km/h):</label>
              <Input type="number" name="brzina" control={control} />
            </div>
            <div className="field">
              <label>Površina za prskanje (Ha):</label>
              <Input type="number" name="povrsina" control={control} />
            </div>
            <div className="field">
              <label>Broj dizni na jednoj stabljici:</label>
              <Input type="number" name="brojdizni" control={control} />
            </div>
            <div className="field">
              <label>Broj redova koji se prskaju u jednom prolazu:</label>
              <Input type="number" name="brojredova" control={control} />
            </div>
            <div className="field">
              <label>Razmak između redova (Cm):</label>
              <Input type="number" name="razmak" control={control} />
            </div>
          </div>
        );

      case "atomizer-dizne":
        return (
          <div className="form-fields">
            <div className="field">
              <label>Preporučena količina po hektaru (Lit.):</label>
              <Input type="number" name="kolicina" control={control} />
            </div>
            <div className="field">
              <label>Brzina kretanja (Km/h):</label>
              <Input type="number" name="brzina" control={control} />
            </div>
            <div className="field">
              <label>Površina za prskanje (Ha):</label>
              <Input type="number" name="povrsina" control={control} />
            </div>
            <div className="field">
              <label>Broj dizni na atomizeru:</label>
              <Input type="number" name="brojdizni" control={control} />
            </div>
            <div className="field">
              <label>Razmak između drvoreda (Cm):</label>
              <Input type="number" name="razmak" control={control} />
            </div>
          </div>
        );

      case "atomizer-keramika":
        return (
          <div className="form-fields">
            <div className="field">
              <label>Izmerena količina tečnosti iz jedne dizne (Lit.):</label>
              <Input type="number" name="izmerenaKolicina" control={control} />
            </div>
            <div className="field">
              <label>Vreme uzimanja količine vode (Sek.):</label>
              <Input type="number" name="vremeKolicina" control={control} />
            </div>
            <div className="field">
              <label>Pritisak u momentu uzimanja tečnosti (bar):</label>
              <Input type="number" name="pritisak" control={control} />
            </div>
            <div className="field">
              <label>Površina za prskanje (Ha):</label>
              <Input type="number" name="povrsina" control={control} />
            </div>
            <div className="field">
              <label>Brzina kretanja (Km/h):</label>
              <Input type="number" name="brzina" control={control} />
            </div>
            <div className="field">
              <label>Preporučena količina po hektaru (Lit.):</label>
              <Input type="number" name="kolicina" control={control} />
            </div>
            <div className="field">
              <label>Broj dizni na atomizeru:</label>
              <Input type="number" name="brojdizni" control={control} />
            </div>
            <div className="field">
              <label>Razmak između drvoreda (Cm):</label>
              <Input type="number" name="razmak" control={control} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    if (!results) return null;

    switch (selectedType) {
      case "standardno":
        const standardResults = results as StandardSprayResults;
        return (
          <div className={styles.results}>
            <div>
              Potreban protok dizne u minuti je : {standardResults.protok}{" "}
              litara
            </div>
            <div>
              Za jedan minut uređaj će izbaciti : {standardResults.ukupProtok}{" "}
              litara
            </div>
            <div>
              Za zadatu površinu je potrebno : {standardResults.vreme} minuta
            </div>
            <div>
              Za jedan hektar bi bilo potrebno : {standardResults.vremeJedan}{" "}
              minuta
            </div>
            <div>
              Potrebno je : {standardResults.potrebno} litara vode za celu
              parcelu
            </div>
          </div>
        );
      case "usmereno-jedna":
        const directedResults = results as DirectedSprayResults;
        if (showActualAmount && !directedResults.protok) {
          return null;
        }
        return (
          <div className="results">
            {directedResults.protok && (
              <>
                <div>
                  Potreban protok dizne u minuti je : {directedResults.protok}{" "}
                  litara
                </div>
                <div>
                  Za jedan minut potrebno je : {directedResults.ukupProtok}{" "}
                  litara
                </div>
                <div>
                  Za jedan hektar bi bilo potrebno :{" "}
                  {directedResults.vremeJedan} minuta
                </div>
                <div>
                  Za zadatu površinu bi bilo potrebno :{" "}
                  {directedResults.vremeUkupno} minuta
                </div>
                <div>
                  Potrebno je : {directedResults.ukupnaKolicina} litara vode za
                  celu parcelu
                </div>
              </>
            )}
          </div>
        );
      case "usmereno-vise":
        const multipleDirectedResults = results as DirectedSprayResults;
        return (
          <div className="results">
            <div>
              Potreban protok dizne u minuti je :{" "}
              {multipleDirectedResults.protok} litara
            </div>
            <div>
              Za jedan minut uređaj će izbaciti :{" "}
              {multipleDirectedResults.ukupProtok} litara
            </div>
            <div>
              Za jedan hektar bi bilo potrebno :{" "}
              {multipleDirectedResults.vremeJedan} minuta
            </div>
            <div>
              Za zadatu površinu je potrebno :{" "}
              {multipleDirectedResults.vremeUkupno} minuta
            </div>
            <div>
              Potrebno je : {multipleDirectedResults.ukupnaKolicina} litara vode
              za celu parcelu
            </div>
          </div>
        );
      case "atomizer-dizne":
        const atomizerResults = results as DirectedSprayResults;
        return (
          <div className="results">
            <div>
              Protok jedne dizne u minuti je : {atomizerResults.protok} litara
            </div>
            <div>
              Ukupno atomizer izbaci : {atomizerResults.ukupProtok} litara vode
              u minuti
            </div>
            <div>
              Za jedan hektar bi bilo potrebno : {atomizerResults.vremeJedan}{" "}
              minuta
            </div>
            <div>
              Za zadatu površinu je potrebno : {atomizerResults.vremeUkupno}{" "}
              minuta
            </div>
            <div>
              Potrebno je : {atomizerResults.ukupnaKolicina} litara vode za celu
              parcelu
            </div>
          </div>
        );
      case "atomizer-keramika":
        const ceramicResults = results as AtomizerCeramicResults;
        return (
          <div className="results">
            <div>
              Protok jedne dizne dobijen testom je : {ceramicResults.protok}{" "}
              litara
            </div>
            <div>
              Pritisak koji treba da postavimo na uređaju:{" "}
              {ceramicResults.potrebniPritisak} bara
            </div>
            <div>
              Potreban protok jedne dizne u minuti je :{" "}
              {ceramicResults.potrebniProtok} litara
            </div>
            <div>
              Za jedan minut uređaj će izbaciti : {ceramicResults.ukupProtok}{" "}
              litara
            </div>
            <div>
              Za jedan hektar bi bilo potrebno : {ceramicResults.vremeJedan}{" "}
              minuta
            </div>
            <div>
              Za zadatu površinu potrebno je : {ceramicResults.vremeUkupno}{" "}
              minuta
            </div>
            <div>
              Potrebna količina vode za ceo teren je :{" "}
              {ceramicResults.ukupnaKolicina} litara
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.calculator}>
      <div className="container-small">
        <h2 className={styles.title}>Kalkulator</h2>
        <p className={styles.description}>
          Proračun potrošnje prilikom prskanja i odabir dizni
        </p>

        <div className={styles.field}>
          <Select
            name="selectedType"
            control={control}
            label="Izaberite vrstu prskanja"
            options={sprayTypes}
          />
        </div>

        {selectedType && (
          <div className={styles.form}>
            {renderInputFields()}

            <button
              className="button-blue"
              onClick={
                selectedType === "usmereno-jedna" && !showActualAmount
                  ? calculateDirectedSingle
                  : selectedType === "usmereno-jedna" &&
                    showActualAmount &&
                    !(results as DirectedSprayResults)?.protok
                  ? continueDirectedSingle
                  : handleCalculate
              }
            >
              {selectedType === "usmereno-jedna" &&
              !(results as DirectedSprayResults)?.protok
                ? "Dalje"
                : "Dalje"}
            </button>
          </div>
        )}

        {renderResults()}

        {tableResults.length > 0 && (
          <div className={styles.tableSection}>
            <h5>Tabela izbora:</h5>
            <table border={2}>
              <thead>
                <tr>
                  <th>Veličina dizne</th>
                  <th>Radni pritisak (Bar)</th>
                </tr>
              </thead>
              <tbody>
                {tableResults.map((item, index) => (
                  <tr key={index}>
                    <td>{item.velicina}</td>
                    <td>{item.pritisak}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.productSelection}>
              <div className="field">
                <label>Odaberi veličinu dizne (ISO color coding):</label>
                <Select
                  name="selectedNozzle"
                  control={control}
                  label="Odaberi diznu"
                  options={nozzleOptions}
                />
              </div>

              <div className="field">
                <label>Izaberi vrstu materijala:</label>
                <Select
                  name="selectedMaterial"
                  control={control}
                  label="Izaberi materijal"
                  options={materialOptions}
                />
              </div>

              <div className="field">
                <label>Izaberi otpornost na vetar:</label>
                <Select
                  name="selectedWind"
                  control={control}
                  label="Otpornost na vetar"
                  options={windOptions}
                />
              </div>

              <button className="button-blue" onClick={searchProducts}>
                Pretraga
              </button>
            </div>
          </div>
        )}

        {finalProducts.length > 0 && (
          <div className={styles.tableSection}>
            <h5>Tabela izbora:</h5>
            <table border={2}>
              <thead>
                <tr>
                  <th>Šifra</th>
                  <th>Naziv</th>
                  <th>Cena</th>
                  <th>Slika</th>
                </tr>
              </thead>
              <tbody>
                {finalProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.sifra}</td>
                    <td>{product.naziv}</td>
                    <td>{product.cena.toFixed(2)}</td>
                    <td>
                      <a
                        href={product.prodavnica}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={product.link}
                          alt={product.naziv}
                          width={80}
                          height={80}
                          objectFit="cover"
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className={styles.instructions}>
          <h3 className={styles.subTitle}>Uputstvo</h3>

          <h4>Korak 1</h4>
          <p>
            Izaberite jedan od 5 (pet) ponuđenih načina prskanja. Popunite sva
            polja. Vodite računa o mernim jedinicama koje morate uneti (brzina –
            km/h, površina – ha, razmak – cm, vreme – s, protok – L).
          </p>
          <p className={styles.note}>
            {" "}
            <strong>Pritisnite taster</strong>
            <br />
            <strong>Dalje</strong>
          </p>

          <h4>Korak 2</h4>
          <p>
            Ispod tastera će se pojaviti dobijeni podaci za unete parametre i
            tabela dizni gde je sa desne strane ponuđen pritisak koji je
            potreban za zadato tretiranje. Izaberite najbolju opciju i unesite
            je u ponuđene prozore ispod. Izaberite materijal i vrstu dizne.
          </p>
          <p className={styles.note}>
            {" "}
            <strong>Pritisnite taster</strong>
            <br />
            <strong>Pretraga</strong>
          </p>

          <h4>Korak 3</h4>
          <p>
            U padajućem meniju će se pojaviti sve dizne koje ste u upitniku
            tražili (npr. 04, keramička, otporna na vetar). Vaš zahtev lako
            možete da menjate promenom parametara za izbor dizni i klikom na
            taster Pretraga. Kada izaberete diznu kliknite na sliku iste i
            automatski odlazite u prodavnicu gde možete izvršiti kupovinu.
          </p>

          <h4>Korak 4</h4>
          <p>
            Unesite količinu izabranog proizvoda, smestite ga u korpu, pratite
            instrukcije i u nekoliko klikova ste poslali porudžbenicu. Obavezno
            je ostavljanje podataka zbog kurirske službe. Isporuka robe u
            najkraćem roku (Srbija).
          </p>

          <h4>Prskanje atomizerom sa keramičkim pločicama</h4>
          <p>
            Za opciju Prskanje atomizerom sa keramičkim pločicama predviđeno je
            da napravite test protoka vaših dizni-pločica, jer su tabele
            nepouzdane. Uzmite flašu i šropericu, podesite pritisak na uređaju i
            merite vreme za koje se flaša napuni. Postupak ponovite sa nekoliko
            različitih dizni, uzmite srednju vrednost i unesite u tabelu. Klikom
            na taster Dalje program Vam daje podatke koliki je protok Vaše dizne
            koju ste testirali, ispod (red 2) je polje sa podatkom koliki je
            potreban protok da bi se zadovoljili zadati parametri (radni
            pritisak). Tabela ispod izračunatih podataka je preporuka koje dizne
            (plastične sa keramičkim umetkom) kupiti i na kojim pritiscima ih
            koristiti.
          </p>

          <h4>Računanje brzine prskanja</h4>
          <p>
            Izračunava se tako što napunimo prskalicu do polovine vodom i
            prođemo kroz sličan teren brzinom koju koristimo pri prskanju.
            Moramo izmeriti dužinu i meriti dobijeno vreme. Ponoviti više puta,
            pa uzeti srednju vrednost. V = l x 3,6 / t
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
