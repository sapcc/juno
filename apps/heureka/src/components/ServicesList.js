import React, { useCallback } from "react"
import useStore from "../store"
import {
  DataList,
  DataListRow,
  DataListCell,
  Stack,
  Spinner,
} from "juno-ui-components"
import { getServices } from "../queries"
import ServiceListItem from "./ServiceListItem"

const dataListHeaderItem = `
font-bold
`

const ServicesList = ({}) => {
  const endpoint = useStore(useCallback((state) => state.endpoint))

  const { isLoading, isError, data, error } = getServices(endpoint)

  return (
    <>
      {isLoading || !data ? (
        <Stack alignment="center">
          <Spinner variant="primary" />
          Loading certificates...
        </Stack>
      ) : (
        <>
          {data && data?.results.length > 0 && (
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
              {data.results.map((item, i) => (
                <ServiceListItem key={i} item={item} />
              ))}
            </DataList>
          )}
        </>
      )}
    </>
  )
}

export default ServicesList
