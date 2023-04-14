import React from "react"

import { Pill, Stack } from "juno-ui-components"

import useStore from "../../hooks/useStore"

const AlertLabels = ({alert}) => {
  const filterLabels = useStore((state) => state.filters.labels)

  return (
    <Stack gap="2" alignment="start" wrap={true}>
      {filterLabels.map(filterLabel => {
        let value = alert.labels?.[filterLabel]
        
        return value &&
          <Pill key={filterLabel} pillKey={filterLabel} pillValue={value} />
      })}
    </Stack>
  )
}

export default AlertLabels