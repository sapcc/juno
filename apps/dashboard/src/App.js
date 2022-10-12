import React, { useCallback, useEffect } from "react"
import PageFooter from "./components/layout/PageFooter"
import PageHead from "./components/layout/PageHead"
import Home from "./pages/home"

import useStore from "./store"

const App = (props) => {  
  const loginOverlayVisible = useStore(useCallback((state) => state.loginOverlayVisible))
  const selectRegion = useStore(useCallback((state) => state.selectRegion))
  const setPreselectedRegion = useStore(useCallback((state) => state.setPreselectedRegion))
  const selectDomain = useStore(useCallback((state) => state.selectDomain))
  const setProdMode = useStore(useCallback((state) => state.setProdMode))

  // if a preselected region or domain has been passed into the app be sure to set them in the state
  useEffect(() => {
    if (props.region) { 
      selectRegion(props.region.toUpperCase()) 
      setPreselectedRegion(props.region.toUpperCase())
    }
    if (props.domain) { selectDomain(props.domain.toUpperCase()) }
    if (props.prodmode) { setProdMode(props.prodmode === "true")}
  }, [props.region, props.domain, props.prodmode])


  return (
    // use custom style cache to avoid conflicts with other apps
    <div className={`flex flex-col h-full ${loginOverlayVisible ? "overflow-hidden h-full" : ""}`} >
      <div className="flex flex-col grow">
        <PageHead />
        <Home />
        <PageFooter />
      </div>
    </div>
)}

export default App
