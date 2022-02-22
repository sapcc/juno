import React, { useCallback } from "react"
import PagesRouter from "./components/PagesRouter"

import useStore from "./store"


const App = () => {  
  const loginOverlayVisible = useStore(useCallback((state) => state.loginOverlayVisible))

  return (
  // use custom style cache to avoid conflicts with other apps

  <div className={`flex flex-col h-full ${loginOverlayVisible ? "overflow-hidden h-full" : ""}`} >
    <React.StrictMode>
      <PagesRouter />
    </React.StrictMode>
  </div>
)}

export default App
