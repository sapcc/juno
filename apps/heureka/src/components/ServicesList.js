import React, { useCallback, useEffect } from "react"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import {
  DataList,
  DataListRow,
  DataListCell,
  Stack,
  Spinner,
} from "juno-ui-components"
import { getServices } from "../queries"
import ServiceListItem from "./ServiceListItem"
import { parseError } from "../helpers"

const dataListHeaderItem = `
font-bold
`

const ServicesList = ({}) => {
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const { isLoading, isError, data, error } = getServices(endpoint)

  console.log("DATA: ", data)

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  useEffect(() => {
    if (error) {
      setMessage({
        variant: "error",
        text: parseError(error),
      })
    }
  }, [error])

  const services = React.useMemo(() => {
    if (!data?.Results) return []
    return data.Results
  }, [data])

  return (
    <>
      {isLoading && !data ? (
        <Stack alignment="center">
          <Spinner variant="primary" />
          Loading services...
        </Stack>
      ) : (
        <>
          {!isError && (
            <>
              {services.length > 0 ? (
                <DataList>
                  <DataListRow className="relative">
                    <DataListCell className={dataListHeaderItem} width={20}>
                      Name
                    </DataListCell>
                    <DataListCell className={dataListHeaderItem} width={20}>
                      Owners
                    </DataListCell>
                    <DataListCell className={dataListHeaderItem} width={20}>
                      Operators
                    </DataListCell>
                    <DataListCell className={dataListHeaderItem} width={40}>
                      Components
                    </DataListCell>
                  </DataListRow>
                  {services.map((item, i) => (
                    <ServiceListItem key={i} item={item} />
                  ))}
                </DataList>
              ) : (
                <Stack
                  alignment="center"
                  distribution="center"
                  direction="vertical"
                  className="h-full"
                >
                  <p>No services found.</p>
                </Stack>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default ServicesList
