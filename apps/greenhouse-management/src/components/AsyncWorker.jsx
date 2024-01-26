import React from "react"
import useUrlState from "../hooks/useUrlState"
import useCommunication from "../hooks/useCommunication"

const AsyncWorker = () => {
  useUrlState()
  useCommunication()
  return null
}

export default AsyncWorker
