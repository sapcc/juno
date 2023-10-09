import React from "react"
import useQueryClientFn from "../hooks/useQueryClientFn"
import useUrlState from "../hooks/useUrlState"

const AsyncWorker = ({ consumerId, mockAPI }) => {
  useQueryClientFn(mockAPI)
  useUrlState(consumerId)
  return null
}

export default AsyncWorker
