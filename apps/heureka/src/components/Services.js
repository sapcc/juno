import React, { useCallback, useEffect, useState, useMemo } from "react"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import { Stack, Spinner, Container } from "juno-ui-components"
import { getServices, getServiceFilters } from "../queries"
import { parseError } from "../helpers"
import Pagination from "./Pagination"
import ServicesList from "./ServicesList"
import FilterToolbar from "./FilterToolbar"

const ITEMS_PER_PAGE = 10

const Services = ({}) => {
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const [paginationOptions, setPaginationOptions] = useState({
    limit: ITEMS_PER_PAGE,
    offset: 0,
  })
  const [searchOptions, setSearchOptions] = useState({})
  const services = getServices(endpoint, {
    ...paginationOptions,
    ...searchOptions,
  })
  const filters = getServiceFilters(endpoint)

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  useEffect(() => {
    if (services.error) {
      setMessage({
        variant: "error",
        text: parseError(services.error),
      })
    }
  }, [services.error])

  useEffect(() => {
    if (filters.error) {
      console.log("filters error:", filters.error)
      setMessage({
        variant: "error",
        text: parseError(filters.error),
      })
    }
  }, [filters.error])

  const onPaginationChanged = (offset) => {
    setPaginationOptions({ ...paginationOptions, offset: offset })
  }

  const onSearchTerm = (options) => {
    console.log("onSearchTerm: ", options)
    setSearchOptions(options)
  }

  return useMemo(() => {
    console.log("searchOptions: ", searchOptions)
    console.log("services: ", services)
    console.log("filters: ", filters)
    return (
      <Container px={false}>
        {services.isLoading && !services.data ? (
          <Stack alignment="center">
            <Spinner variant="primary" />
            Loading services...
          </Stack>
        ) : (
          <>
            <FilterToolbar
              filters={filters.data}
              onSearchTerm={onSearchTerm}
              isLoading={filters.isLoading}
              isFetching={true}
            />
            <ServicesList services={services.data?.Results} />
            <Pagination
              count={services.data?.Count}
              limit={ITEMS_PER_PAGE}
              onChanged={onPaginationChanged}
              isFetching={services.isFetching}
              disabled={services.isError}
            />
          </>
        )}
      </Container>
    )
  }, [services, filters])
}

export default Services
