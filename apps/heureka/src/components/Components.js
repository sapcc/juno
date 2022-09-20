import React, { useEffect, useCallback, useState } from "react"
import { getComponents, getComponentFilters } from "../queries"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import { parseError } from "../helpers"
import { Stack, Spinner, Container } from "juno-ui-components"
import Pagination from "./Pagination"
import ComponentsList from "./ComponentsList"
import FilterToolbar from "./FilterToolbar"

const ITEMS_PER_PAGE = 10

const Components = () => {
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const [paginationOptions, setPaginationOptions] = useState({
    limit: ITEMS_PER_PAGE,
    offset: 0,
  })
  const [searchOptions, setSearchOptions] = useState({})
  const components = getComponents(endpoint, {
    ...paginationOptions,
    ...searchOptions,
  })

  const filters = getComponentFilters(endpoint)

  console.log("components DATA: ", components.data)

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  useEffect(() => {
    if (components.error) {
      setMessage({
        variant: "error",
        text: parseError(components.error),
      })
    }
  }, [components.error])

  // const components = React.useMemo(() => {
  //   if (!components.data?.Results) return []
  //   return components.data.Results
  // }, [components.data])

  const onPaginationChanged = (offset) => {
    setPaginationOptions({ ...paginationOptions, offset: offset })
  }

  const onSearchTerm = (options) => {
    setSearchOptions(options)
  }

  return (
    <Container px={false}>
      {components.isLoading && !components.data ? (
        <Stack alignment="center">
          <Spinner variant="primary" />
          Loading components...
        </Stack>
      ) : (
        <>
          <FilterToolbar
            filterTypes={filters.data}
            onSearchTerm={onSearchTerm}
            isLoading={filters.isLoading}
            filterLabels={{
              name: "component name",
            }}
            placeholders={{
              operators: "User ID or name",
              owners: "User ID or name",
              inKeppel: `"true" or "false"`,
            }}
          />
          <ComponentsList components={components.data?.Results} />
          <Pagination
            disabled={components.isError}
            count={components.data?.Count}
            limit={ITEMS_PER_PAGE}
            onChanged={onPaginationChanged}
            isFetching={components.isFetching}
          />
        </>
      )}
    </Container>
  )
}

export default Components
