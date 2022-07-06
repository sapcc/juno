import React, { useEffect, useCallback, useState } from "react"
import { getComponents } from "../queries"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import { parseError } from "../helpers"
import ListToolBar from "./ListToolBar"
import { Stack, Spinner } from "juno-ui-components"
import Pagination from "./Pagination"
import ComponentsList from "./ComponentsList"

const ITEMS_PER_PAGE = 10

const Components = () => {
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
        <Stack className="mt-4" alignment="center">
          <Spinner variant="primary" />
          Loading components...
        </Stack>
      ) : (
        <>
          <ListToolBar disabled={isError} />
          <ComponentsList components={components} />
          <Pagination
            disabled={isError}
            count={data?.Count}
            limit={ITEMS_PER_PAGE}
            onChanged={onPaginationChanged}
            isFetching={isFetching}
          />
        </>
      )}
    </>
  )
}

export default Components
