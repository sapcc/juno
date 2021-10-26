import React from "react"
import PagesRouter from "./components/PagesRouter"

const App = () => (
  // use custom style cache to avoid conflicts with other apps
  <React.StrictMode>
    <PagesRouter />
  </React.StrictMode>
)

export default App
