import React, { useMemo } from "react"
import { DataGridRow, DataGridCell, Button } from "juno-ui-components"
import { DateTime } from "luxon"
import CustomBadge from "./CustomBadge"
import { Link } from "url-state-router"
import { useRouter } from "url-state-router"
import { SERVICES_PATH } from "./AppRouter"

const PatchLogListItem = ({ item }) => {
  const { options, routeParams } = useRouter()
  const serviceId = routeParams?.serviceId

  const createdAt = useMemo(() => {
    if (item.CreatedAt) {
      return DateTime.fromSQL(item.CreatedAt).toLocaleString(
        DateTime.DATETIME_SHORT
      )
    }
  }, [item.CreatedAt])

  return (
    <DataGridRow>
      <DataGridCell>
        <Link to={`${SERVICES_PATH}/${serviceId}/patchLog/${item.ID}`}>
          {item.ID}
        </Link>
      </DataGridCell>
      <DataGridCell>{createdAt}</DataGridCell>
      <DataGridCell>
        {item.Components.map((component) => component.Name).join(", ")}
      </DataGridCell>
      <DataGridCell>
        <CustomBadge icon="info" label={item.Evidences.length} />
      </DataGridCell>
      <DataGridCell>
        <Button label="Add" onClick={function noRefCheck() {}} size="small" />
      </DataGridCell>
    </DataGridRow>
  )
}

export default PatchLogListItem
