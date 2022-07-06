import React, { useMemo } from "react"
import { DataList, DataListRow, DataListCell, Stack } from "juno-ui-components"
import ServicesListItem from "./ServicesListItem"

const dataListHeader = `
bg-theme-background-lvl-2
`

const dataListHeaderItem = `
font-bold
`

const ServicesList = ({ services }) => {
  services = useMemo(() => {
    if (!services) return []
    return services
  }, [services])

  return (
    <>
      <DataList>
        <DataListRow className={dataListHeader}>
          <DataListCell className={dataListHeaderItem} width={20}>
            Name
          </DataListCell>
          <DataListCell className={dataListHeaderItem} width={20}>
            Owners
          </DataListCell>
          <DataListCell className={dataListHeaderItem} auto>
            Operators
          </DataListCell>
          <DataListCell className={dataListHeaderItem} width={40}>
            Components
          </DataListCell>
        </DataListRow>
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
      </DataList>
    </>
  )
}

export default ServicesList
