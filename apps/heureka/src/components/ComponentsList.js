import React, { useEffect, useCallback, useState } from "react"
import { getComponents } from "../queries"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import { parseError } from "../helpers"
import ListToolBar from "./ListToolBar"
import ComponentsListItem from "./ComponentsListItem"
import {
  DataList,
  DataListRow,
  DataListCell,
  Stack,
  Spinner,
} from "juno-ui-components"
import Pagination from "./Pagination"

const ITEMS_PER_PAGE = 10

const dataListHeaderItem = `
font-bold
`

const ComponentsList = () => {
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const [pagOffset, setPagOffset] = useState(0)
  const { isLoading, isError, isFetching, data, error } = getComponents(
    endpoint,
    {
      limit: ITEMS_PER_PAGE,
      offset: pagOffset,
    }
  )

  console.log("components DATA: ", data)

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  useEffect(() => {
    if (error) {
      setMessage({
        variant: "error",
        text: parseError(error),
      })
    }
  }, [error])

  const components = React.useMemo(() => {
    if (!data?.Results) return []
    return data.Results
  }, [data])

  const onPaginationChanged = (offset) => {
    console.log("offset: ", offset)
    if (pagOffset !== offset) {
      setPagOffset(offset)
    }
  }

  return (
    <>
      {isLoading && !data ? (
        <Stack alignment="center">
          <Spinner variant="primary" />
          Loading components...
        </Stack>
      ) : (
        <>
          {!isError && (
            <>
              {components.length > 0 ? (
                <>
                  <ListToolBar />
                  <DataList>
                    <DataListRow className="relative">
                      <DataListCell className={dataListHeaderItem} width={20}>
                        Name
                      </DataListCell>
                      <DataListCell className={dataListHeaderItem} width={20}>
                        Type
                      </DataListCell>
                      <DataListCell className={dataListHeaderItem} width={20}>
                        Services
                      </DataListCell>
                      <DataListCell className={dataListHeaderItem} width={40}>
                        Vulnerabilities
                      </DataListCell>
                    </DataListRow>
                    {components.map((item, i) => (
                      <ComponentsListItem key={i} item={item} />
                    ))}
                  </DataList>
                  <Pagination
                    count={data.Count}
                    limit={ITEMS_PER_PAGE}
                    onChanged={onPaginationChanged}
                    isFetching={isFetching}
                  />
                </>
              ) : (
                <Stack
                  alignment="center"
                  distribution="center"
                  direction="vertical"
                  className="h-full"
                >
                  <p>No components found.</p>
                </Stack>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default ComponentsList
