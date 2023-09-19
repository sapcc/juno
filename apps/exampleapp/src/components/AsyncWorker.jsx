import React from "react"
import useQueryClientFn from "../hooks/useQueryClientFn"
import useUrlState from "../hooks/useUrlState"

const AsyncWorker = ({ consumerId }) => {
  useQueryClientFn()
  useUrlState(consumerId)
  return null
}

export default AsyncWorker
