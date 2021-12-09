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
    console.log("Target: ", e.target, e.target.dataset.region);
    if (e.target.dataset.region) {
      selectRegion(e.target.dataset.region)
      showLoginOverlay()
    }
  }
  
  return (
    <div>
      <LoginOverlay />
      <div className="container mx-auto pt-16">
        <CCLogo className="-ml-7 mb-4" alt="Converged Cloud" />

        <Stack className="items-center">
          <div className="text-2xl w-3/5 mr-auto">
            Engage eyeballs collaborative: best-of-breed applications out-of-the-box dynamic next-generation optimize, B2B.
          </div>
          <div>
            <Button className="whitespace-nowrap" onClick={() => showLoginOverlay()}>
              <Icon icon="place" color="text-juno-blue" className="mr-3" />
              Select {selectedRegion ? 'domain' : 'region'}
            </Button>
          </div>
        </Stack>
      </div>
      <div className="bg-top bg-no-repeat mt-24" style={{ backgroundImage: `url('${backgroundTop}')` }}>
        <div className="container mx-auto">
          <WorldMap className="w-full" onClick={handleWorldMapClick}/>
        </div>
      </div>
    </div>
  )
}

export default Home
