import React, { useMemo } from "react"
import {
  Stack,
  DataGrid,
  DataGridRow,
  DataGridCell,
  DataGridHeadCell,
} from "juno-ui-components"
import UserListItem from "./UsersListItem"
import HintNotFound from "./HintNotFound"

const UsersList = ({ users }) => {
  users = useMemo(() => {
    if (!users) return []
    return users
  }, [users])

  return (
    <>
      <DataGrid columns={4}>
        <DataGridRow>
          <DataGridHeadCell>Name</DataGridHeadCell>
          <DataGridHeadCell>Sap ID</DataGridHeadCell>
          <DataGridHeadCell>Owned Services</DataGridHeadCell>
          <DataGridHeadCell>Evidences</DataGridHeadCell>
        </DataGridRow>
        {users.length > 0 ? (
          <>
            {users.map((user, index) => (
              <UserListItem key={index} item={user} />
            ))}
          </>
        ) : (
          <DataGridRow>
            <DataGridCell colSpan={4}>
              <HintNotFound text="No users found" />
            </DataGridCell>
          </DataGridRow>
        )}
      </DataGrid>
    </>
  )
}

export default UsersList
