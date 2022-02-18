import React, { useCallback } from "react"

import useStore from "../store"
import CCLogo from "../assets/images/CCplus_logo.svg"
import WorldMap from "../assets/images/map.svg"
import backgroundTop from "../assets/images/background_header.png"

import LoginOverlay from "../components/landingpage/LoginOverlay"

import { Button, Stack } from "juno-ui-components"

const Home = () => {
  const showLoginOverlay = useStore(useCallback((state) => state.showLoginOverlay))
  const selectedRegion   = useStore(useCallback((state) => state.region))
  const selectRegion     = useStore(useCallback((state) => state.selectRegion))

  const handleWorldMapClick = (e) => {
    if (e.target.dataset.region) {
      selectRegion(e.target.dataset.region)
      showLoginOverlay()
    }
  }
  
  return (
    <div>
      <LoginOverlay />
      <div className="max-w-[1280px] mx-auto pt-8">
        <CCLogo className="-ml-5 mb-4 w-[200px] h-auto" alt="Converged Cloud" />

        <Stack alignment="center">
          <div className="text-xl w-4/5 mr-auto">
            SAP's strategic Infrastructure-as-a-Service (IaaS) stack, optimised for SAP solutions, running purely in SAP datacenters.
          </div>
          <div>
            <Button icon="place" title="Select region/domain" className="whitespace-nowrap" onClick={() => showLoginOverlay()}>
              Select {selectedRegion ? 'domain' : 'region'}
            </Button>
          </div>
        </Stack>
      </div>
      <div className="bg-top bg-no-repeat mt-8 pb-12" style={{ backgroundImage: `url('${backgroundTop}')` }}>
        <div className="max-w-[1280px] mx-auto">
          <WorldMap className="worldmap w-4/5 h-auto mx-auto" onClick={handleWorldMapClick} data-selected-region={selectedRegion} />
        </div>
      </div>
    </div>
  )
}

export default Home
