import React, { useCallback, useEffect, useState } from "react"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import { Stack, Spinner, Container } from "juno-ui-components"
import { getUsers } from "../queries"
import UsersList from "./UsersList"
import HintLoading from "./HintLoading"
import { parseError } from "../helpers"

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

  console.log("users: ", users)

  return (
    <Container px={false}>
      {users.isLoading && !users.data ? (
        <HintLoading text="Loading users..." />
      ) : (
        <>
          <UsersList users={users.data?.Results} />
        </>
      )}
    </Container>
  )
}

export default Users
