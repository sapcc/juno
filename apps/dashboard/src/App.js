import React, { useCallback, useEffect } from "react"
import PagesRouter from "./components/PagesRouter"

import useStore from "./store"

const App = (props) => {  
  const loginOverlayVisible = useStore(useCallback((state) => state.loginOverlayVisible))
  const selectRegion = useStore(useCallback((state) => state.selectRegion))
  const selectDomain = useStore(useCallback((state) => state.selectDomain))

  // if a preselected region or domain has been passed into the app be sure to set them in the state
  useEffect(() => {
    if (props.region) { selectRegion(props.region.toUpperCase()) }
    if (props.domain) { selectDomain(props.domain.toUpperCase()) }
  }, [props.region, props.domain])


  return (
    // use custom style cache to avoid conflicts with other apps
    <div className={`flex flex-col h-full ${loginOverlayVisible ? "overflow-hidden h-full" : ""}`} >
      <React.StrictMode>
        <PagesRouter />
      </React.StrictMode>
    </div>
)}

export default App
