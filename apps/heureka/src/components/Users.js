import React, { useCallback, useEffect, useState } from "react"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import { Container } from "juno-ui-components"
import { getUsers, getUserFilters } from "../queries"
import UsersList from "./UsersList"
import HintLoading from "./HintLoading"
import FilterToolbar from "./FilterToolbar"
import { parseError } from "../helpers"
import Pagination from "./Pagination"

const ITEMS_PER_PAGE = 10

const Users = ({}) => {
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const [paginationOptions, setPaginationOptions] = useState({
    limit: ITEMS_PER_PAGE,
    offset: 0,
  })
  const [searchOptions, setSearchOptions] = useState({})
  const users = getUsers(endpoint, {
    ...paginationOptions,
    ...searchOptions,
  })

  const filters = getUserFilters(endpoint)

  useEffect(() => {
    if (users.error) {
      setMessage({
        variant: "error",
        text: parseError(users.error),
      })
    }
  }, [users.error])

  useEffect(() => {
    if (filters.error) {
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
    setSearchOptions(options)
  }

  console.log("users: ", users)

  return (
    <Container px={false}>
      {users.isLoading && !users.data ? (
        <HintLoading text="Loading users..." />
      ) : (
        <>
          <FilterToolbar
            filterTypes={filters.data}
            onSearchTerm={onSearchTerm}
            isLoading={filters.isLoading}
          />
          <UsersList users={users.data?.Results} />
          <Pagination
            count={users.data?.Count}
            limit={ITEMS_PER_PAGE}
            onChanged={onPaginationChanged}
            isFetching={users.isFetching}
            disabled={users.isError}
          />
        </>
      )}
    </Container>
  )
}

export default Users
