import React from "react"
import HintLoading from "./shared/HintLoading"
import { useIsUrlStateSetup } from "./StoreProvider"

const UrlState = ({ children }) => {
  const isUrlStateSetup = useIsUrlStateSetup()

  return (
    <>
      {isUrlStateSetup ? children : <HintLoading text="Loading..." centered />}
    </>
  )
}

export default UrlState
