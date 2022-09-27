import React, { useMemo } from "react"
import {
  Button,
  Panel,
  PanelBody,
  PanelFooter,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Stack,
} from "juno-ui-components"
import {
  DetailSection,
  DetailSectionBox,
  DetailContentHeading,
  DetailSectionHeader,
} from "../styles"
import { patchExampl1, patchExampl2 } from "../helpers"
import { useRouter } from "url-state-router"
import { DateTime } from "luxon"
import EvidencesList from "./EvidencesList"
import ComponentsList from "./ComponentsList"
import { SERVICES_PATH } from "./AppRouter"

const PatchLogDetail = ({}) => {
  const { options, routeParams, navigateTo } = useRouter()
  const patchLogId = routeParams?.patchLogId
  const serviceId = routeParams?.serviceId

  const patch = useMemo(() => {
    if (patchLogId === "123") {
      return patchExampl1
    }
    if (patchLogId === "456") {
      return patchExampl2
    }
  }, [patchLogId])

  const createdAt = useMemo(() => {
    if (patch.CreatedAt) {
      return DateTime.fromSQL(patch.CreatedAt).toLocaleString(
        DateTime.DATETIME_SHORT
      )
    }
  }, [patch.CreatedAt])

  const onPanelClose = () => {
    navigateTo(`${SERVICES_PATH}/${serviceId}`)
  }

  console.log("PATH: ", patch)

  return (
    <Panel heading="Patch log details" opened={true} onClose={onPanelClose}>
      <PanelBody>
        <div className={DetailSection}>
          <div className={DetailSectionBox}>
            <DataGrid gridColumnTemplate="1fr 9fr">
              <DataGridRow>
                <DataGridCell>
                  <b>ID: </b>
                </DataGridCell>
                <DataGridCell>{patch.ID}</DataGridCell>
              </DataGridRow>
              <DataGridRow>
                <DataGridCell>
                  <b>Date: </b>
                </DataGridCell>
                <DataGridCell>{createdAt}</DataGridCell>
              </DataGridRow>
            </DataGrid>
          </div>
        </div>
        <div className={DetailSection}>
          <p className={DetailSectionHeader}>State before</p>
          <div className="mt-4">
            <ComponentsList minimized unlink components={patch.BeforeState} />
          </div>
        </div>
        <div className={DetailSection}>
          <p className={DetailSectionHeader}>State after</p>
          <div className="mt-4">
            <ComponentsList minimized unlink components={patch.AfterState} />
          </div>
        </div>
        <div className={DetailSection}>
          <Stack alignment="center">
            <p className={`${DetailSectionHeader} w-full`}>Evidences</p>
            <Button
              label="Add"
              onClick={function noRefCheck() {}}
              size="small"
            />
          </Stack>
          <div className="mt-4">
            <EvidencesList evidences={[]} />
          </div>
        </div>
      </PanelBody>
    </Panel>
  )
}

export default PatchLogDetail
