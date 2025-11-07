"use client";

import { useState } from "react";
import calculationData from "../../../public/data/data.json";
import productData from "../../../public/data/proizvodi.json";

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

type CalculationResults = StandardSprayResults | DirectedSprayResults | AtomizerCeramicResults;

const Select = ({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="wpcf7-form-control wpcf7-select"
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const KalkulatorPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
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
  });
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [selectedNozzle, setSelectedNozzle] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedWind, setSelectedWind] = useState("");
  const [showActualAmount, setShowActualAmount] = useState(false);
  const [actualAmount, setActualAmount] = useState(0);
  const [tableResults, setTableResults] = useState<CalculationData[]>([]);
  const [finalProducts, setFinalProducts] = useState<ProductData[]>([]);

  console.log(finalProducts.length);

  const sprayTypes: SelectOption[] = [
    { value: "", label: "Izaberite vrstu prskanja" },
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
    { value: "", label: "Izaberi materijal" },
    { value: "plast", label: "Plastika" },
    { value: "keramika", label: "Keramika" },
    { value: "mesing", label: "Mesing" },
  ];

  const windOptions: SelectOption[] = [
    { value: "0", label: "NE" },
    { value: "1", label: "DA" },
  ];

  const handleInputChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateStandardSpray = () => {
    const { kolicina, brzina, razmak, povrsina, brojdizni } = formData;

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
    const { sirinamlaza, razmak, kolicina } = formData;
    const koeficijent = sirinamlaza / razmak;
    const stvarnaKolicina = koeficijent * kolicina;

    setActualAmount(parseFloat(stvarnaKolicina.toFixed(1)));
    setShowActualAmount(true);
  };

  const continueDirectedSingle = () => {
    const { sirinamlaza, brojdizni, povrsina, brzina } = formData;

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
    const { brojredova, brojdizni, razmak, kolicina, brzina, povrsina } =
      formData;

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
    const { kolicina, brzina, povrsina, brojdizni, razmak } = formData;

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
    const {
      izmerenaKolicina,
      vremeKolicina,
      pritisak,
      povrsina,
      brzina,
      kolicina,
      brojdizni,
      razmak,
    } = formData;

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
              <input
                type="number"
                value={formData.kolicina}
                onChange={(e) =>
                  handleInputChange("kolicina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Brzina kretanja (Km/h):</label>
              <input
                type="number"
                value={formData.brzina}
                onChange={(e) =>
                  handleInputChange("brzina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Razmak između dizni (Cm):</label>
              <input
                type="number"
                value={formData.razmak}
                onChange={(e) =>
                  handleInputChange("razmak", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Broj dizni na uređaju:</label>
              <input
                type="number"
                value={formData.brojdizni}
                onChange={(e) =>
                  handleInputChange(
                    "brojdizni",
                    parseFloat(e.target.value) || 0
                  )
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Površina za prskanje (Ha):</label>
              <input
                type="number"
                value={formData.povrsina}
                onChange={(e) =>
                  handleInputChange("povrsina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <img
              src="http://kosmospromet.com/wp-admin/images/Prskanjeravno.jpg"
              alt="Prskanje ravno"
            />
          </div>
        );

      case "usmereno-jedna":
        return (
          <div className="form-fields">
            <div className="field">
              <label>Preporučena količina za ceo teren (Lit.):</label>
              <input
                type="number"
                value={formData.kolicina}
                onChange={(e) =>
                  handleInputChange("kolicina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Brzina kretanja (Km/h):</label>
              <input
                type="number"
                value={formData.brzina}
                onChange={(e) =>
                  handleInputChange("brzina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Površina za prskanje (Ha):</label>
              <input
                type="number"
                value={formData.povrsina}
                onChange={(e) =>
                  handleInputChange("povrsina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Broj dizni na uređaju:</label>
              <input
                type="number"
                value={formData.brojdizni}
                onChange={(e) =>
                  handleInputChange(
                    "brojdizni",
                    parseFloat(e.target.value) || 0
                  )
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Razmak između dizni (Cm):</label>
              <input
                type="number"
                value={formData.razmak}
                onChange={(e) =>
                  handleInputChange("razmak", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Širina mlaza jedne dizne (Cm):</label>
              <input
                type="number"
                value={formData.sirinamlaza}
                onChange={(e) =>
                  handleInputChange(
                    "sirinamlaza",
                    parseFloat(e.target.value) || 0
                  )
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            {showActualAmount && (
              <div className="field">
                <label>Stvarna količina:</label>
                <input
                  type="number"
                  value={actualAmount}
                  onChange={(e) =>
                    setActualAmount(parseFloat(e.target.value) || 0)
                  }
                  onClick={(e) => e.currentTarget.select()}
                />
              </div>
            )}
          </div>
        );

      case "usmereno-vise":
        return (
          <div className="form-fields">
            <div className="field">
              <label>Preporučena količina po hektaru (Lit.):</label>
              <input
                type="number"
                value={formData.kolicina}
                onChange={(e) =>
                  handleInputChange("kolicina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Brzina kretanja (Km/h):</label>
              <input
                type="number"
                value={formData.brzina}
                onChange={(e) =>
                  handleInputChange("brzina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Površina za prskanje (Ha):</label>
              <input
                type="number"
                value={formData.povrsina}
                onChange={(e) =>
                  handleInputChange("povrsina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Broj dizni na jednoj stabljici:</label>
              <input
                type="number"
                value={formData.brojdizni}
                onChange={(e) =>
                  handleInputChange(
                    "brojdizni",
                    parseFloat(e.target.value) || 0
                  )
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Broj redova koji se prskaju u jednom prolazu:</label>
              <input
                type="number"
                value={formData.brojredova}
                onChange={(e) =>
                  handleInputChange(
                    "brojredova",
                    parseFloat(e.target.value) || 0
                  )
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Razmak između redova (Cm):</label>
              <input
                type="number"
                value={formData.razmak}
                onChange={(e) =>
                  handleInputChange("razmak", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <img
              src="http://kosmospromet.com/wp-admin/images/Prskanjeredovi.jpg"
              alt="Prskanje redovi"
            />
          </div>
        );

      case "atomizer-dizne":
        return (
          <div className="form-fields">
            <div className="field">
              <label>Preporučena količina po hektaru (Lit.):</label>
              <input
                type="number"
                value={formData.kolicina}
                onChange={(e) =>
                  handleInputChange("kolicina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Brzina kretanja (Km/h):</label>
              <input
                type="number"
                value={formData.brzina}
                onChange={(e) =>
                  handleInputChange("brzina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Površina za prskanje (Ha):</label>
              <input
                type="number"
                value={formData.povrsina}
                onChange={(e) =>
                  handleInputChange("povrsina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Broj dizni na atomizeru:</label>
              <input
                type="number"
                value={formData.brojdizni}
                onChange={(e) =>
                  handleInputChange(
                    "brojdizni",
                    parseFloat(e.target.value) || 0
                  )
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Razmak između drvoreda (Cm):</label>
              <input
                type="number"
                value={formData.razmak}
                onChange={(e) =>
                  handleInputChange("razmak", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
          </div>
        );

      case "atomizer-keramika":
        return (
          <div className="form-fields">
            <div className="field">
              <label>Izmerena količina tečnosti iz jedne dizne (Lit.):</label>
              <input
                type="number"
                value={formData.izmerenaKolicina}
                onChange={(e) =>
                  handleInputChange(
                    "izmerenaKolicina",
                    parseFloat(e.target.value) || 0
                  )
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Vreme uzimanja količine vode (Sek.):</label>
              <input
                type="number"
                value={formData.vremeKolicina}
                onChange={(e) =>
                  handleInputChange(
                    "vremeKolicina",
                    parseFloat(e.target.value) || 0
                  )
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Pritisak u momentu uzimanja tečnosti (bar):</label>
              <input
                type="number"
                value={formData.pritisak}
                onChange={(e) =>
                  handleInputChange("pritisak", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Površina za prskanje (Ha):</label>
              <input
                type="number"
                value={formData.povrsina}
                onChange={(e) =>
                  handleInputChange("povrsina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Brzina kretanja (Km/h):</label>
              <input
                type="number"
                value={formData.brzina}
                onChange={(e) =>
                  handleInputChange("brzina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Preporučena količina po hektaru (Lit.):</label>
              <input
                type="number"
                value={formData.kolicina}
                onChange={(e) =>
                  handleInputChange("kolicina", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Broj dizni na atomizeru:</label>
              <input
                type="number"
                value={formData.brojdizni}
                onChange={(e) =>
                  handleInputChange(
                    "brojdizni",
                    parseFloat(e.target.value) || 0
                  )
                }
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div className="field">
              <label>Razmak između drvoreda (Cm):</label>
              <input
                type="number"
                value={formData.razmak}
                onChange={(e) =>
                  handleInputChange("razmak", parseFloat(e.target.value) || 0)
                }
                onClick={(e) => e.currentTarget.select()}
              />
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
          <div className="results">
            <div>
              Potreban protok dizne u minuti je : {standardResults.protok} litara
            </div>
            <div>
              Za jedan minut uređaj će izbaciti : {standardResults.ukupProtok} litara
            </div>
            <div>Za zadatu površinu je potrebno : {standardResults.vreme} minuta</div>
            <div>
              Za jedan hektar bi bilo potrebno : {standardResults.vremeJedan} minuta
            </div>
            <div>
              Potrebno je : {standardResults.potrebno} litara vode za celu parcelu
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
                  Potreban protok dizne u minuti je : {directedResults.protok} litara
                </div>
                <div>
                  Za jedan minut potrebno je : {directedResults.ukupProtok} litara
                </div>
                <div>
                  Za jedan hektar bi bilo potrebno : {directedResults.vremeJedan} minuta
                </div>
                <div>
                  Za zadatu površinu bi bilo potrebno : {directedResults.vremeUkupno}{" "}
                  minuta
                </div>
                <div>
                  Potrebno je : {directedResults.ukupnaKolicina} litara vode za celu
                  parcelu
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
              Potreban protok dizne u minuti je : {multipleDirectedResults.protok} litara
            </div>
            <div>
              Za jedan minut uređaj će izbaciti : {multipleDirectedResults.ukupProtok} litara
            </div>
            <div>
              Za jedan hektar bi bilo potrebno : {multipleDirectedResults.vremeJedan} minuta
            </div>
            <div>
              Za zadatu površinu je potrebno : {multipleDirectedResults.vremeUkupno} minuta
            </div>
            <div>
              Potrebno je : {multipleDirectedResults.ukupnaKolicina} litara vode za celu parcelu
            </div>
          </div>
        );
      case "atomizer-dizne":
        const atomizerResults = results as DirectedSprayResults;
        return (
          <div className="results">
            <div>Protok jedne dizne u minuti je : {atomizerResults.protok} litara</div>
            <div>
              Ukupno atomizer izbaci : {atomizerResults.ukupProtok} litara vode u minuti
            </div>
            <div>
              Za jedan hektar bi bilo potrebno : {atomizerResults.vremeJedan} minuta
            </div>
            <div>
              Za zadatu površinu je potrebno : {atomizerResults.vremeUkupno} minuta
            </div>
            <div>
              Potrebno je : {atomizerResults.ukupnaKolicina} litara vode za celu parcelu
            </div>
          </div>
        );
      case "atomizer-keramika":
        const ceramicResults = results as AtomizerCeramicResults;
        return (
          <div className="results">
            <div>
              Protok jedne dizne dobijen testom je : {ceramicResults.protok} litara
            </div>
            <div>
              Pritisak koji treba da postavimo na uređaju:{" "}
              {ceramicResults.potrebniPritisak} bara
            </div>
            <div>
              Potreban protok jedne dizne u minuti je : {ceramicResults.potrebniProtok}{" "}
              litara
            </div>
            <div>
              Za jedan minut uređaj će izbaciti : {ceramicResults.ukupProtok} litara
            </div>
            <div>
              Za jedan hektar bi bilo potrebno : {ceramicResults.vremeJedan} minuta
            </div>
            <div>
              Za zadatu površinu potrebno je : {ceramicResults.vremeUkupno} minuta
            </div>
            <div>
              Potrebna količina vode za ceo teren je : {ceramicResults.ukupnaKolicina}{" "}
              litara
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="kalkulator-container">
      <h1>Kalkulator za prskanje</h1>

      <div className="spray-type-selector">
        <Select
          value={selectedType}
          onChange={setSelectedType}
          options={sprayTypes}
          placeholder="Izaberite vrstu prskanja"
        />
      </div>

      {selectedType && (
        <div className="calculation-form">
          {renderInputFields()}

          <button
            className="wpcf7-form-control wpcf7-submit"
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
            {selectedType === "usmereno-jedna" && !(results as DirectedSprayResults)?.protok
              ? "Dalje"
              : "Dalje"}
          </button>
        </div>
      )}

      {renderResults()}

      {tableResults.length > 0 && (
        <div className="table-results">
          <h5>Tabela izbora:</h5>
          <table
            border={2}
            style={{ backgroundColor: "#5177D1", color: "#FFFFFF" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#5177D1", color: "#FFFFFF" }}>
                <th>Veličina dizne</th>
                <th>Radni pritisak (Bar)</th>
              </tr>
            </thead>
            <tbody>
              {tableResults.map((item, index) => (
                <tr key={index} style={{ color: "#000000" }}>
                  <td>{item.velicina}</td>
                  <td>{item.pritisak}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="nozzle-selection">
            <div className="field">
              <label>Odaberi veličinu dizne (ISO color coding):</label>
              <Select
                value={selectedNozzle}
                onChange={setSelectedNozzle}
                options={nozzleOptions}
              />
            </div>

            <div className="field">
              <label>Izaberi vrstu materijala:</label>
              <Select
                value={selectedMaterial}
                onChange={setSelectedMaterial}
                options={materialOptions}
                placeholder="Izaberi materijal"
              />
            </div>

            <div className="field">
              <label>Izaberi otpornost na vetar:</label>
              <Select
                value={selectedWind}
                onChange={setSelectedWind}
                options={windOptions}
              />
            </div>

            <button
              className="wpcf7-form-control wpcf7-submit"
              onClick={searchProducts}
            >
              Pretraga
            </button>
          </div>
        </div>
      )}

      {finalProducts.length > 0 && (
        <div className="product-results">
          <h5>Tabela izbora:</h5>
          <table
            border={2}
            style={{ backgroundColor: "#5177D1", color: "#FFFFFF" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#5177D1", color: "#FFFFFF" }}>
                <th>Šifra</th>
                <th>Naziv</th>
                <th>Cena</th>
                <th>Slika</th>
              </tr>
            </thead>
            <tbody>
              {finalProducts.map((product, index) => (
                <tr key={index} style={{ color: "#000000" }}>
                  <td>{product.sifra}</td>
                  <td>{product.naziv}</td>
                  <td>{product.cena.toFixed(2)}</td>
                  <td>
                    <a
                      href={product.prodavnica}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={product.link}
                        alt={product.naziv}
                        style={{ verticalAlign: "middle" }}
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .kalkulator-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .form-fields {
          margin: 20px 0;
        }

        .field {
          margin: 10px 0;
        }

        .field label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .field input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .wpcf7-form-control.wpcf7-submit {
          background-color: #5177d1;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin: 10px 0;
        }

        .wpcf7-form-control.wpcf7-submit:hover {
          background-color: #4166c0;
        }

        .wpcf7-form-control.wpcf7-select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .results {
          margin: 20px 0;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 4px;
        }

        .results div {
          margin: 5px 0;
          font-weight: bold;
        }

        .table-results,
        .product-results {
          margin: 20px 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 8px;
          text-align: left;
          border: 1px solid #ddd;
        }

        .nozzle-selection {
          margin: 20px 0;
          padding: 15px;
          background-color: #f0f0f0;
          border-radius: 4px;
        }

        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default KalkulatorPage;
