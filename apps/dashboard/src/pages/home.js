import React from "react"

import CCPlusOneLogo from "../assets/images/CCplusOne_logo.svg"
import WorldMap from "../assets/images/map.svg"
import backgroundTop from "../assets/images/background_header.png"

import { Button, Icon, Stack } from "juno-ui-components"


const Home = () => {
  return (
    <div className="bg-top"  style={{ backgroundImage: `url('${backgroundTop}')` }}>
      <div className="container mx-auto pt-16">
        <CCPlusOneLogo className="-ml-7 mb-4" alt="Converged Cloud" />

        <Stack className="items-center">
          <div className="text-2xl w-3/5 mr-auto">
            Engage eyeballs collaborative: best-of-breed applications out-of-the-box dynamic next-generation optimize, B2B.
          </div>
          <div>
            <Button className="whitespace-nowrap">
              <Icon icon="place" color="text-juno-blue" className="mr-3" />
              Select region
            </Button>
          </div>
        </Stack>

        <div className="pt-24">
          <WorldMap className="w-full" />
        </div>

      </div>
    </div>
  )
}

export default Home
