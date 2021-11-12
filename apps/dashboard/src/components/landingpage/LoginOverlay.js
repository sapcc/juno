import React, { useState } from "react"
import PropTypes from "prop-types"

import useStore from "../../store"

import { ClickableIcon, Stack } from "juno-ui-components"

import FlagAustralia from "../../assets/images/flag_australia.svg"
import FlagBrazil from "../../assets/images/flag_brazil.svg"
import FlagCanada from "../../assets/images/flag_canada.svg"
import FlagChina from "../../assets/images/flag_china.svg"
import FlagGermany from "../../assets/images/flag_germany.svg"
import FlagJapan from "../../assets/images/flag_japan.svg"
import FlagNetherlands from "../../assets/images/flag_netherlands.svg"
import FlagRussia from "../../assets/images/flag_russia.svg"
import FlagSaudiArabia from "../../assets/images/flag_saudiarabia.svg"
import FlagUSA from "../../assets/images/flag_usa.svg"

const REGIONS = [
  { name: "AMER",
    regions: [
      { key: "NA-CA-1",
        label: "Canada",
        icon: <FlagCanada />
      },
      { key: "NA-US-1",
        label: "USA",
        icon: <FlagUSA />
      },
      { key: "NA-US-2",
        label: "USA",
        icon: <FlagUSA />
      },
      { key: "NA-US-3",
        label: "USA",
        icon: <FlagUSA />
      },
      { key: "LA-BR-1",
        label: "Brazil",
        icon: <FlagBrazil />
      }
    ]
  },
  { name: "EMEA",
    regions: [
      { key: "EU-NL-1",
        label: "Netherlands",
        icon: <FlagNetherlands />
      },
      { key: "EU-DE-1",
        label: "Germany",
        icon: <FlagGermany />
      },
      { key: "EU-DE-2",
        label: "Germany",
        icon: <FlagGermany />
      },
      { key: "EU-RU-1",
        label: "Russia",
        icon: <FlagRussia />
      },
    ]
  },
  { name: "APJ",
    regions: [
      { key: "AP-SA-1",
        label: "Kingdom of Saudi Arabia",
        icon: <FlagSaudiArabia />
      },
      { key: "AP-SA-2",
        label: "Kingdom of Saudi Arabia",
        icon: <FlagSaudiArabia />
      },
      { key: "AP-AE-1",
        label: "United Arab Emirates",
        icon: <FlagSaudiArabia />
      },
      { key: "AP-CN-1",
        label: "China",
        icon: <FlagChina />
      },
      { key: "AP-JP-1",
        label: "Japan",
        icon: <FlagJapan />
      },
      { key: "AP-JP-2",
        label: "Japan",
        icon: <FlagJapan />
      },
      { key: "AP-AU-1",
        label: "Australia",
        icon: <FlagAustralia />
      },
    ]
  }
]

const overlayStyles = (isOpen) => {
  return (
    `
      ${isOpen ? 'block' : 'hidden' }
      backdrop-blur-xl
      backdrop-saturate-200
      bg-juno-grey-blue-10
      bg-opacity-30
      border
      border-juno-grey-blue-5
      fixed 
      left-1/2 
      transform 
      -translate-x-1/2 
      w-full 
      max-w-[1700px]
      p-4
      pb-24
    `
  )
}

const LoginOverlay = ({region}) => {
  const [ selectedRegion, setSelectedRegion] = useState(region)
  const loginOverlayVisible = useStore((state) => state.loginOverlayVisible)
  const hideLoginOverlay = useStore((state) => state.hideLoginOverlay)

  return (
    <div className={overlayStyles(loginOverlayVisible)}>
      <div className="flex items-center">
        <ClickableIcon onClick={() => hideLoginOverlay()} icon="close" color="text-juno-turquoise" size="35" className="ml-auto" />
      </div>
      <div className="max-w-screen-xl mx-auto border-b-2 border-juno-grey-light-8 mb-8">
        <Stack className="justify-around">
          <div className="uppercase text-2xl pb-3 px-24 -mb-0.5 text-theme-high border-b-3 border-juno-turquoise">1. Choose your region</div>
          <div className="uppercase text-2xl pb-3 px-24 -mb-0.5">2. Choose your domain</div>
        </Stack>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <Stack gap={6} className="justify-center">
          { REGIONS.map(continent => (
            <Stack direction="vertical" gap={1.5} className="flex-1" key={continent.name}>
              <div className="text-lg text-theme-high pb-2">{continent.name}</div>
              { continent.regions.map( region => (
                <Stack key={region.key} className="bg-juno-grey-blue-1 py-3 px-5 items-center cursor-pointer hover:ring-2 ring-juno-blue">
                  <div>
                    {region.key}<br />
                    {region.label}
                  </div>
                  <div className="ml-auto">
                    {region.icon}
                  </div>
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      </div>

    </div>
  )
}

LoginOverlay.propTypes = {
  /** Preselect region */
  variant: PropTypes.oneOf(["NA-CA-1", "NA-US-1", "NA-US-2", "NA-US-3", "LA-BR-1", "EU-NL-1", "EU-DE-1", "EU-DE-2", "EU-RU-1", "AP-SA-1", "AP-SA-2", "AP-AE-1", "AP-CN-1", "AP-JP-1", "AP-JP-2", "AP-AU-1"]),
}

LoginOverlay.defaultProps = {
  region: null,
}

export default LoginOverlay

