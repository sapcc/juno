import React from "react"
import create from "zustand"
import {devtools} from "zustand/middleware"

import FlagAustralia from "./assets/images/flag_australia.svg"
import FlagBrazil from "./assets/images/flag_brazil.svg"
import FlagCanada from "./assets/images/flag_canada.svg"
import FlagChina from "./assets/images/flag_china.svg"
import FlagGermany from "./assets/images/flag_germany.svg"
import FlagJapan from "./assets/images/flag_japan.svg"
import FlagNetherlands from "./assets/images/flag_netherlands.svg"
import FlagRussia from "./assets/images/flag_russia.svg"
import FlagSaudiArabia from "./assets/images/flag_saudiarabia.svg"
import FlagUSA from "./assets/images/flag_usa.svg"

// all available regions
const REGIONS = {
  "NA-CA-1": { 
    key: "NA-CA-1",
    country: "Canada",
    icon: <FlagCanada />
  },
  "NA-US-1": {
    key: "NA-US-1",
    country: "USA",
    icon: <FlagUSA />
  },
  "NA-US-2": {
    key: "NA-US-2",
    country: "USA",
    icon: <FlagUSA />
  },
  "NA-US-3": {
    key: "NA-US-3",
    country: "USA",
    icon: <FlagUSA />
  },
  "LA-BR-1": {
    key: "LA-BR-1",
    country: "Brazil",
    icon: <FlagBrazil />
  },
  "EU-NL-1": {
    key: "EU-NL-1",
    country: "Netherlands",
    icon: <FlagNetherlands />
  },
  "EU-DE-1": {
    key: "EU-DE-1",
    country: "Germany",
    icon: <FlagGermany />
  },
  "EU-DE-2": {
    key: "EU-DE-2",
    country: "Germany",
    icon: <FlagGermany />
  },
  "EU-RU-1": {
    key: "EU-RU-1",
    country: "Russia",
    icon: <FlagRussia />
  },
  "AP-SA-1": {
    key: "AP-SA-1",
    country: "Kingdom of Saudi Arabia",
    icon: <FlagSaudiArabia />
  },
  "AP-SA-2": {
    key: "AP-SA-2",
    country: "Kingdom of Saudi Arabia",
    icon: <FlagSaudiArabia />
  },
  "AP-AE-1": {
    key: "AP-AE-1",
    country: "United Arab Emirates",
    icon: <FlagSaudiArabia />
  },
  "AP-CN-1": {
    key: "AP-CN-1",
    country: "China",
    icon: <FlagChina />
  },
  "AP-JP-1": {
    key: "AP-JP-1",
    country: "Japan",
    icon: <FlagJapan />
  },
  "AP-JP-2": {
    key: "AP-JP-2",
    country: "Japan",
    icon: <FlagJapan />
  },
  "AP-AU-1": {
    key: "AP-AU-1",
    country: "Australia",
    icon: <FlagAustralia />
  }
}

const REGIONS_BY_CONTINENT = [
  { name: "AMER",
    regions: ["NA-CA-1", "NA-US-1", "NA-US-2", "NA-US-3","LA-BR-1"]
  },
  { name: "EMEA",
    regions: ["EU-NL-1", "EU-DE-1", "EU-DE-2", "EU-RU-1"]
  },
  { name: "APJ",
    regions: ["AP-SA-1", "AP-SA-2", "AP-AE-1", "AP-CN-1", "AP-JP-1", "AP-JP-2", "AP-AU-1"]
  }
]

const REGION_KEYS = Object.keys(REGIONS)

// global store
const useStore = create(devtools((set) => ({
  loginOverlayVisible:  false,
  toggleLoginOverlay:   () => set((state) => ({loginOverlayVisible: !state.loginOverlayVisible})),
  showLoginOverlay:     () => set((state) => ({loginOverlayVisible: true})),
  hideLoginOverlay:     () => set((state) => ({loginOverlayVisible: false})),

  region:               null,
  selectRegion:         (selectedRegion) => set((state) => ({region: selectedRegion})),
  deselectRegion:       () => set((state) => ({region: null})),

  regions:              REGIONS,
  regionKeys:           REGION_KEYS,
  regionsByContinent:   REGIONS_BY_CONTINENT,
})))

export default useStore