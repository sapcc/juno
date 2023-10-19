import React from "react"
import { useQuery } from "@tanstack/react-query"
import PeaksList from "./PeaksList"
import { Spinner, Message } from "juno-ui-components"
import { useGlobalsQueryClientFnReady } from "../StoreProvider"

const Peaks = () => {
  const queryClientFnReady = useGlobalsQueryClientFnReady()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`peaks`],
    enabled: !!queryClientFnReady,
  })

  return (
    <>
      {isError && (
        <Message variant="danger">
          {`${error.statusCode ? `${error.statusCode}, ` : ""}${
            error?.message
          }`}
        </Message>
      )}
      {/* Loading indicator for page content */}
      {isLoading && <Spinner variant="primary" />}
      <PeaksList
        isLoading={isLoading}
        isError={isError}
        peaks={data}
        error={error}
      />
    </>
  )
}

export default Peaks
