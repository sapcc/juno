import React, { useMemo, useCallback } from "react"

import useStore from "../../store"

import { Button, ClickableIcon, Icon, Stack } from "juno-ui-components"

import RegionSelect from "./RegionSelect"
import DomainSelect from "./DomainSelect"

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
    absolute
    inset-0
    p-4
    pb-24
    `
  )
}

const tabClasses = (isActive) => {
  return (
    `
    uppercase 
    text-theme-default
    text-2xl 
    pb-3 
    px-24 
    -mb-0.5
    ${isActive ? 'cursor-default text-theme-high border-b-3 border-juno-turquoise' : ''}
    `
  )
}

const tabLinkClasses = (isActive) => {
  return (
    `
    ${isActive ? '' : 'hover:text-juno-turquoise'}
    `
  )
}


const LoginOverlay = () => {

  const loginOverlayVisible = useStore(useCallback((state) => state.loginOverlayVisible))
  const hideLoginOverlay    = useStore(useCallback((state) => state.hideLoginOverlay))
  const selectedRegion      = useStore(useCallback((state) => state.region))
  const deselectRegion      = useStore(useCallback((state) => state.deselectRegion))
  const regionKeys          = useStore(useCallback((state) => state.regionKeys))
  

  const isValidRegionSelected = useMemo(() => {
    return selectedRegion !== null && regionKeys.includes(selectedRegion)
  }, [selectedRegion])

  return (
    <div className={overlayStyles(loginOverlayVisible)}>
      <div className="flex items-center max-w-screen-xl mx-auto">
        <ClickableIcon onClick={() => hideLoginOverlay()} icon="close" color="text-juno-turquoise" size="36" className="ml-auto -mr-12" />
      </div>
      <nav className="max-w-screen-xl mx-auto border-b-2 border-juno-grey-light-8 mb-8">
        <Stack className="justify-around">
          <a href="#" onClick={() => deselectRegion()} className={`${tabClasses(!isValidRegionSelected)} ${tabLinkClasses(!isValidRegionSelected)}`}>1. Choose your region</a>
          <div className={tabClasses(isValidRegionSelected)}>2. Choose your domain</div>
        </Stack>
      </nav>
      <div className="max-w-screen-xl mx-auto">
        { isValidRegionSelected ? 
          <DomainSelect />
          :
          <RegionSelect />
        }
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-juno-grey-blue-9">
        <Stack className="documentation-banner max-w-screen-xl mx-auto items-center py-10">
          <div>
            <h5 className="text-3xl">New here?</h5>
            <p>Have a look at the <span className="italic">Getting Started</span> section of our documentation</p>
          </div>
          <div className="ml-auto pl-8 pr-20">
            <Button variant="primary" title="Go to documentation" href="https://documentation.global.cloud.sap/docs/start-userreg" target="_blank">
              <Icon icon="openInNew" color="text-theme-high" className=" mr-2" />
              Go to documentation
            </Button>
          </div>
        </Stack>
      </div>

    </div>
  )
}

export default LoginOverlay

