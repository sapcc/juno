/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react"
import {
  CodeBlock,
  Container,
  DataGrid,
  DataGridRow,
  DataGridCell,
  DataGridHeadCell,
  JsonViewer,
  Panel,
  PanelFooter,
  Stack,
  PanelBody,
  Spinner,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "juno-ui-components"
import {
  useShowDetailsFor,
  useGlobalsActions,
  useAlertsActions,
  useAlertsIsLoading,
} from "../../hooks/useAppStore"
import AlertIcon from "./shared/AlertIcon"
import AlertTimestamp from "./shared/AlertTimestamp"
import AlertDescription from "./shared/AlertDescription"
import AlertLinks from "./shared/AlertLinks"
import AlertLabels from "./shared/AlertLabels"
import SilenceNew from "../silences/SilenceNew"
import AlertStatus from "./AlertStatus"
import AlertRegion from "./shared/AlertRegion"
import AlertSilences from "./AlertSilences"

const AlertDetail = () => {
  const alertID = useShowDetailsFor()
  const { setShowDetailsFor } = useGlobalsActions()
  const { getAlertByFingerprint } = useAlertsActions()
  const alert = getAlertByFingerprint(alertID)

  const onPanelClose = () => {
    setShowDetailsFor(null)
  }

  const isAlertsLoading = useAlertsIsLoading()

  return (
    <Panel
      heading={
        <Stack gap="2">
          <AlertIcon severity={alert?.labels?.severity} />
          <span>{alert?.annotations?.summary || "Not found"}</span>
        </Stack>
      }
      opened={!!alertID}
      onClose={onPanelClose}
      size="large"
    >
      <PanelBody>
        <DataGridRow className="no-hover">
          <DataGridCell>{silence?.id}</DataGridCell>
          <DataGridCell>{silence?.comment}</DataGridCell>
          <DataGridCell>{silence?.createdBy}</DataGridCell>
          <DataGridCell>{silence?.startsAt}</DataGridCell>
          <DataGridCell>{silence?.endsAt}</DataGridCell>
          <DataGridCell>
            {silence?.matchers?.map((matcher, index) => (
              <Pill
                key={index}
                pillKey={matcher.name}
                pillValue={matcher.value}
              />
            ))}
          </DataGridCell>
        </DataGridRow>
      </PanelBody>

      <PanelFooter>
        {alert && <SilenceNew alert={alert} variant="primary" />}
      </PanelFooter>
    </Panel>
  )
}

export default AlertDetail
