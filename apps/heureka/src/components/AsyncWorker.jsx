import React from "react"
import useUrlState from "../hooks/useUrlState"
import useQueryClientFn from "../hooks/useQueryClientFn"

const AsyncWorker = () => {
  useUrlState()
  useQueryClientFn()
  return null
}

export default AsyncWorker
