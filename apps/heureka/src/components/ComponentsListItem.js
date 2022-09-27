import React, { useMemo } from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"
import { Link } from "url-state-router"
import VulnerabilitiesOverview from "./VulnerabilitiesOverview"
import {
  classifyVulnerabilities,
  usersListToString,
  componentVersionByType,
} from "../helpers"
import { COMPONENTS_PATH } from "./AppRouter"
import CustomBadge from "./CustomBadge"

const ComponentsListItem = ({ item, minimized, unlink }) => {
  const services = useMemo(() => {
    if (!item.Services) return []
    return item.Services
  }, [item.Services])

  const vulnerabilities = useMemo(() => {
    return classifyVulnerabilities(item)
  }, [item])

  const owners = useMemo(() => {
    return usersListToString(item.Owners)
  }, [item.Owners])

  const operators = useMemo(() => {
    return usersListToString(item.Operators)
  }, [item.Operators])

  return (
    <DataGridRow>
      <DataGridCell>
        {unlink ? (
          <>{item.Name}</>
        ) : (
          <Link
            to={`${COMPONENTS_PATH}/${item.ID}`}
            state={{ placeholderData: item }}
          >
            {item.Name}
          </Link>
        )}
      </DataGridCell>
      <DataGridCell>{item.Type}</DataGridCell>
      <DataGridCell>{componentVersionByType(item)}</DataGridCell>
      <DataGridCell>
        <VulnerabilitiesOverview vulnerabilities={vulnerabilities} />
      </DataGridCell>
      {!minimized && (
        <>
          <DataGridCell>
            <CustomBadge icon="dns" label={services.length} />
          </DataGridCell>
          <DataGridCell>{owners}</DataGridCell>
          <DataGridCell>{operators}</DataGridCell>
        </>
      )}
    </DataGridRow>
  )
}

export default ComponentsListItem
