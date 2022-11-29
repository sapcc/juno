import React, { useMemo } from "react"
import { DataGridCell, DataGridRow, Icon, Stack } from "juno-ui-components"
import useStore from "../../store"
import { useMutation, useQueryClient } from "react-query"
import { currentState, push } from "url-state-provider"
import { deletePeak } from "../../actions"

const PeaksListItem = ({ peak }) => {
  const urlStateKey = useStore((state) => state.urlStateKey)
  const endpoint = useStore((state) => state.endpoint)
  const queryClient = useQueryClient()

  const countries = useMemo(() => {
    if (!peak.countries) return []
    return peak.countries
  }, [peak.countries])

  const { isLoading, isError, error, data, isSuccess, mutate } = useMutation(
    ({ endpoint, id }) => deletePeak(endpoint, id)
  )

  const handleEditPeakClick = () => {
    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, currentModal: "EditPeaksItem" })
  }

  const handleDeletePeakClick = () => {
    mutate(
      {
        endpoint: endpoint,
        id: peak.id,
      },
      {
        onSuccess: (data, variables, context) => {
          // refetch peaks
          queryClient.invalidateQueries("peaks")
        },
        onError: (error, variables, context) => {
          // TODO display error
        },
      }
    )
  }

  return (
    <DataGridRow>
      <DataGridCell>
        <strong>{peak.name}</strong>
      </DataGridCell>
      <DataGridCell>{peak.height}</DataGridCell>
      <DataGridCell>{peak.mainrange}</DataGridCell>
      <DataGridCell>{peak.region}</DataGridCell>
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
          <Icon
            icon="deleteForever"
            size="18"
            className="leading-none"
            onClick={handleDeletePeakClick}
          />
          <Icon
            icon="openInNew"
            size="18"
            href={peak.url}
            target="_blank"
            className="leading-none"
          />
        </Stack>
      </DataGridCell>
    </DataGridRow>
  )
}

export default PeaksListItem
