import React, { useMemo, useCallback } from "react"

import useStore from "../../store"

import { ClickableIcon, Stack } from "juno-ui-components"

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

const tabClasses = (isActive) => {
  return (
    `
    uppercase 
    text-2xl 
    pb-3 
    px-24 
    -mb-0.5
    ${isActive ? 'text-theme-high border-b-3 border-juno-turquoise' : ''}
    `
  )
}


const LoginOverlay = () => {

  const loginOverlayVisible = useStore(useCallback((state) => state.loginOverlayVisible))
  const hideLoginOverlay    = useStore(useCallback((state) => state.hideLoginOverlay))
  const selectedRegion      = useStore(useCallback((state) => state.region))
  const regionKeys          = useStore(useCallback((state) => state.regionKeys))
  

  const isValidRegionSelected = useMemo(() => {
    return selectedRegion !== null && regionKeys.includes(selectedRegion)
  }, [selectedRegion])

  return (
    <div className={overlayStyles(loginOverlayVisible)}>
      <div className="flex items-center">
        <ClickableIcon onClick={() => hideLoginOverlay()} icon="close" color="text-juno-turquoise" size="35" className="ml-auto" />
      </div>
      <div className="max-w-screen-xl mx-auto border-b-2 border-juno-grey-light-8 mb-8">
        <Stack className="justify-around">
          <div className={tabClasses(!isValidRegionSelected)}>1. Choose your region</div>
          <div className={tabClasses(isValidRegionSelected)}>2. Choose your domain</div>
        </Stack>
      </div>
      <div className="max-w-screen-xl mx-auto">
        { isValidRegionSelected ? 
          <DomainSelect />
          :
          <RegionSelect />
        }
      </div>

    </div>
  )
}

export default LoginOverlay

