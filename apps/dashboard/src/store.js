import React from "react"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

import FlagAustralia from "./assets/images/flag_australia.svg"
import FlagBrazil from "./assets/images/flag_brazil.svg"
import FlagCanada from "./assets/images/flag_canada.svg"
import FlagChina from "./assets/images/flag_china.svg"
import FlagGermany from "./assets/images/flag_germany.svg"
import FlagJapan from "./assets/images/flag_japan.svg"
import FlagNetherlands from "./assets/images/flag_netherlands.svg"
import FlagSaudiArabia from "./assets/images/flag_saudiarabia.svg"
import FlagUAE from "./assets/images/flag_unitedarabempire.svg"
import FlagUSA from "./assets/images/flag_usa.svg"

// all domains

const DOMAINS = {
  general: [
    {
      name: "HCP03",
      description: "General purpose domain for internet facing applications",
    },
    {
      name: "MONSOON3",
      description:
        "General purpose domain for SAP-internal applications that cannot be reached from the internet",
    },
  ],
  special: [
    "BS",
    "CCADMIN",
    "CIS",
    "CP",
    "FSN",
    "HCM",
    "HDA",
    "HEC",
    "KYMA",
    "NEO",
    "S4",
    "WBS",
  ],
}

const DOMAIN_KEYS = DOMAINS.general
  .map((domain) => domain.name)
  .concat(DOMAINS.special)

// all available regions
const REGIONS = {
  "NA-CA-1": {
    continent: "AMER",
    key: "NA-CA-1",
    country: "Canada",
    icon: <FlagCanada />,
  },
  "NA-US-1": {
    continent: "AMER",
    key: "NA-US-1",
    country: "USA",
    icon: <FlagUSA />,
  },
  "NA-US-2": {
    continent: "AMER",
    key: "NA-US-2",
    country: "USA",
    icon: <FlagUSA />,
  },
  "NA-US-3": {
    continent: "AMER",
    key: "NA-US-3",
    country: "USA",
    icon: <FlagUSA />,
  },
  "LA-BR-1": {
    continent: "AMER",
    key: "LA-BR-1",
    country: "Brazil",
    icon: <FlagBrazil />,
  },
  "EU-NL-1": {
    continent: "EMEA",
    key: "EU-NL-1",
    country: "Netherlands",
    icon: <FlagNetherlands />,
  },
  "EU-DE-1": {
    continent: "EMEA",
    key: "EU-DE-1",
    country: "Germany",
    icon: <FlagGermany />,
  },
  "EU-DE-2": {
    continent: "EMEA",
    key: "EU-DE-2",
    country: "Germany",
    icon: <FlagGermany />,
  },
  "AP-SA-1": {
    continent: "APJ",
    key: "AP-SA-1",
    country: "Kingdom of Saudi Arabia",
    icon: <FlagSaudiArabia />,
  },
  "AP-SA-2": {
    continent: "APJ",
    key: "AP-SA-2",
    country: "Kingdom of Saudi Arabia",
    icon: <FlagSaudiArabia />,
  },
  "AP-AE-1": {
    continent: "APJ",
    key: "AP-AE-1",
    country: "United Arab Emirates",
    icon: <FlagUAE />,
  },
  "AP-CN-1": {
    continent: "APJ",
    key: "AP-CN-1",
    country: "China",
    icon: <FlagChina />,
  },
  "AP-JP-1": {
    continent: "APJ",
    key: "AP-JP-1",
    country: "Japan",
    icon: <FlagJapan />,
  },
  "AP-JP-2": {
    continent: "APJ",
    key: "AP-JP-2",
    country: "Japan",
    icon: <FlagJapan />,
  },
  "AP-AU-1": {
    continent: "APJ",
    key: "AP-AU-1",
    country: "Australia",
    icon: <FlagAustralia />,
  },
}

const REGIONS_BY_CONTINENT = [
  {
    name: "AMER",
    regions: Object.values(REGIONS).filter(
      (region) => region.continent === "AMER"
    ),
  },
  {
    name: "EMEA",
    regions: Object.values(REGIONS).filter(
      (region) => region.continent === "EMEA"
    ),
  },
  {
    name: "APJ",
    regions: Object.values(REGIONS).filter(
      (region) => region.continent === "APJ"
    ),
  },
]

const REGION_KEYS = Object.keys(REGIONS)
const QA_REGION_KEYS = ["QA-DE-1", "QA-DE-2", "QA-DE-3"]

// global store
const useStore = create(
  devtools((set) => ({
    loginOverlayVisible: false,
    toggleLoginOverlay: () =>
      set((state) => ({ loginOverlayVisible: !state.loginOverlayVisible })),
    showLoginOverlay: () => set((state) => ({ loginOverlayVisible: true })),
    hideLoginOverlay: () => set((state) => ({ loginOverlayVisible: false })),

    region: null,
    selectRegion: (selectedRegion) => {
      // only set if the given value is valid
      if (
        REGION_KEYS.includes(selectedRegion.toUpperCase()) ||
        selectedRegion.toUpperCase().startsWith("QA-")
      ) {
        set((state) => ({ region: selectedRegion.toUpperCase() }))
      }
    },
    deselectRegion: () => set((state) => ({ region: null })),

    preselectedRegion: null,
    setPreselectedRegion: (propRegion) =>
      set((state) => ({ preselectedRegion: propRegion.toUpperCase() })),

    domain: null,
    selectDomain: (selectedDomain) => {
      // only set if the given value is valid
      if (
        DOMAIN_KEYS.includes(selectedDomain.toUpperCase()) ||
        selectedDomain.toUpperCase() === "CC3TEST"
      ) {
        set((state) => ({ domain: selectedDomain.toUpperCase() }))
      }
    },
    deselectDomain: () => set((state) => ({ domain: null })),

    regions: REGIONS,
    regionKeys: REGION_KEYS,
    qaRegionKeys: QA_REGION_KEYS,
    regionsByContinent: REGIONS_BY_CONTINENT,
    domains: DOMAINS,
    domainKeys: DOMAIN_KEYS,

    prodMode: true,
    setProdMode: (isProdMode) => set((state) => ({ prodMode: isProdMode })),
  }))
)

export default useStore
