import React, { useMemo } from "react"
import {
  Stack,
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
} from "juno-ui-components"
import ServicesListItem from "./ServicesListItem"

const ServicesList = ({ services }) => {
  services = useMemo(() => {
    if (!services) return []
    return services
  }, [services])

  return (
    <>
      <DataGrid gridColumnTemplate="2fr 3fr 2fr 2fr 1fr">
        <DataGridRow>
          <DataGridHeadCell>Name</DataGridHeadCell>
          <DataGridHeadCell>Owners</DataGridHeadCell>
          <DataGridHeadCell>Operators</DataGridHeadCell>
          <DataGridHeadCell>Vulnerabilities</DataGridHeadCell>
          <DataGridHeadCell>Components</DataGridHeadCell>
        </DataGridRow>
        {services.length > 0 ? (
          <>
            {services.map((item, i) => (
              <ServicesListItem key={i} item={item} />
            ))}
          </>
        ) : (
          <Stack
            alignment="center"
            distribution="center"
            direction="vertical"
            className="h-full"
          >
            <p>No services found</p>
          </Stack>
        )}
      </DataGrid>
    </>
  )
}

export default ServicesList
