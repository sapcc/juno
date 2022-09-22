import React, { useMemo } from "react"
import { Badge, Icon, DataGridRow, DataGridCell } from "juno-ui-components"
import { USERS_PATH } from "./AppRouter"
import { Link } from "url-state-router"
import Avatar from "./Avatar"

const UserListItem = ({ item }) => {
  const ownServices = useMemo(() => {
    if (!item.OwnServices) return []
    return item.OwnServices
  }, [item.OwnServices])

  const evidences = useMemo(() => {
    if (!item.Evidences) return []
    return item.Evidences
  }, [item.Evidences])

  return (
    <DataGridRow>
      <DataGridCell>
        <Link to={`${USERS_PATH}/${item.ID}`}>
          <Avatar user={item} displayName />
        </Link>
      </DataGridCell>
      <DataGridCell>{item.SapID}</DataGridCell>
      <DataGridCell>Services team</DataGridCell>
      <DataGridCell>
        <Badge text="default">
          <Icon className="mr-2" icon="dns" />
          {ownServices.length}
        </Badge>
      </DataGridCell>
    </DataGridRow>
  )
}

export default UserListItem
