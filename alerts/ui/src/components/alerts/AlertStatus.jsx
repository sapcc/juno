import React, { useMemo } from "react"
import { Stack } from "juno-ui-components"
import {
  useSilencesItemsHash,
  useSilencesLocalItems,
  useSilencesActions,
} from "../../hooks/useStore"

const AlertStatus = ({ alert }) => {
  const allSilences = useSilencesItemsHash()
  const localSilences = useSilencesLocalItems()
  const { getMappingSilences, getMappedState } = useSilencesActions()

  const silences = useMemo(() => {
    if (!alert) return []
    return getMappingSilences(alert)
  }, [alert, allSilences, localSilences])

  console.log("silences::::", silences)

  const state = useMemo(() => {
    if (!alert) return {}
    return getMappedState(alert)
  }, [alert, allSilences, localSilences])

  return (
    <>
      {state && (
        <>
          {state?.type === "processing" ? (
            <Stack direction="vertical">
              <span>{state.type}</span>
              <span className="text-xs text-yellow-500">processing</span>
            </Stack>
          ) : (
            <span>{state.type}</span>
          )}
        </>
      )}
      {alert?.status?.inhibitedBy?.length > 0 && (
        <div className="text-xs mt-2">
          <Stack direction="vertical">
            <span>Inhibited by:</span>
            <span>{alert?.status?.inhibitedBy}</span>
          </Stack>
        </div>
      )}
      {silences && silences.length > 0 && (
        <div className="text-xs mt-2">
          <Stack direction="vertical">
            <span>Silenced by:</span>
            {silences.map((data) => (
              <span key={data.id}>{data?.createdBy || data.id}</span>
            ))}
          </Stack>
        </div>
      )}
    </>
  )
}

export default AlertStatus
