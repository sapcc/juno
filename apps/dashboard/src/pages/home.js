import React, { useCallback } from "react"

import useStore from "../store"
import CCLogo from "../assets/images/CCplus_logo.svg"
import WorldMap from "../assets/images/map.svg"
import backgroundTop from "../assets/images/background_header.png"

import LoginOverlay from "../components/landingpage/LoginOverlay"

import { Button, Icon, Stack } from "juno-ui-components"

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
      <div className="container mx-auto pt-8">
        <CCLogo className="-ml-7 mb-4" alt="Converged Cloud" />

        <Stack alignment="center">
          <div className="text-2xl w-3/5 mr-auto">
            SAP’s strategic Infrastructure-as-a-Service (IaaS) stack, optimised for SAP solutions, running purely in SAP datacenters.
          </div>
          <div>
            <Button icon="place" className="whitespace-nowrap" onClick={() => showLoginOverlay()}>
              Select {selectedRegion ? 'domain' : 'region'}
            </Button>
          </div>
        </Stack>
      </div>
      <div className="bg-top bg-no-repeat mt-8" style={{ backgroundImage: `url('${backgroundTop}')` }}>
        <div className="container mx-auto">
          <WorldMap className="worldmap w-full" onClick={handleWorldMapClick} data-selected-region={selectedRegion} />
        </div>
      </div>
    </div>
  )
}

export default Home
