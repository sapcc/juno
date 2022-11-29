import React, { useMemo } from "react"
import { DataGridCell, DataGridRow, Icon, Stack } from "juno-ui-components"
import useStore from "../../store"
import { currentState, push } from "url-state-provider"

const PeaksListItem = ({
  name,
  height,
  mainrange,
  region,
  countries,
  url,
  ...props
}) => {
  const urlStateKey = useStore((state) => state.urlStateKey)

  countries = useMemo(() => {
    if (!countries) return []
    return countries
  }, [countries])

  const handleEditPeakClick = () => {
    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, currentModal: "EditPeaksItem" })
  }

  return (
    <DataGridRow {...props}>
      <DataGridCell>
        <strong>{name}</strong>
      </DataGridCell>
      <DataGridCell>{height}</DataGridCell>
      <DataGridCell>{mainrange}</DataGridCell>
      <DataGridCell>{region}</DataGridCell>
      <DataGridCell>
        {countries.map((c, i) => c + (i < countries.length - 1 ? ", " : ""))}
      </DataGridCell>
      <DataGridCell>
        {/* Use <Stack> to align and space elements: */}
        <Stack gap="1.5">
          <Icon
            icon="edit"
            size="18"
            className="leading-none"
            onClick={handleEditPeakClick}
          />
          <Icon icon="deleteForever" size="18" className="leading-none" />
          <Icon
            icon="openInNew"
            size="18"
            href={url}
            target="_blank"
            className="leading-none"
          />
        </Stack>
      </DataGridCell>
    </DataGridRow>
  )
}

export default PeaksListItem
