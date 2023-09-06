import React from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import PeaksList from "./PeaksList"
import { Spinner, Message, Button } from "juno-ui-components"

const Peaks = (props) => {
  const queryClient = useQueryClient()
  const defaultOptions = queryClient.getQueryDefaults(["peaks"])

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`peaks`],
    enabled: !!defaultOptions,
  })

  console.log("Peaks::", isLoading, defaultOptions, data)

  return (
    <>
      {isError && (
        <Message variant="danger">
          {`${error.statusCode}, ${error.message}`}
        </Message>
      )}
      {/* Loading indicator for page content */}
      {isLoading && <Spinner variant="primary" />}
      <Button
        label="Change token"
        variant="primary"
        onClick={() => {
          console.log("click")
        }}
      />
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
