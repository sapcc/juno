import React, { useEffect, useState } from "react"
import { getCertificates } from "../queries"
import { useGlobalState, useDispatch } from "./StateProvider"
import { useMessagesDispatch } from "./MessagesProvider"
import {
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridToolbar,
  ButtonRow,
  Spinner,
  Stack,
} from "juno-ui-components"
import CertificateListItem from "./CertificateListItem"
import AddNewSSOButton from "./AddNewSSOButton"
import { parseError } from "../helpers"

const Heading = `
jn-font-bold
jn-text-lg
jn-text-theme-high
jn-pb-2
 `

const CertificateList = ({ ca }) => {
  const [enableCreateSSO, setEnableCreateSSO] = useState(false)
  const dispatchMessage = useMessagesDispatch()
  const dispatchGlobals = useDispatch()
  const oidc = useGlobalState().auth.oidc
  const endpoint = useGlobalState().globals.endpoint

  // fetch the certificates
  const { isLoading, isError, data, error } = getCertificates(
    oidc?.auth?.id_token,
    endpoint,
    ca?.name
  )

  // wait until we get the cert list to enable create new sso certs
  // getCertificates query waits until the id_token exists
  // once the data appears the create new sso button will be enabled
  useEffect(() => {
    if (data) {
      setEnableCreateSSO(true)
    }
  }, [data])

  // just set the state once
  useEffect(() => {
    if (enableCreateSSO) {
      dispatchGlobals({
        type: "UPDATE_NEW_SSO_ENABLED",
        enabled: true,
      })
    }
  }, [enableCreateSSO])

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  useEffect(() => {
    if (error) {
      dispatchMessage({
        type: "SET_MESSAGE",
        msg: { variant: "error", text: parseError(error) },
      })
    }
  }, [error])

  return (
    <>
      <h1 className={Heading}>{ca?.displayName || ca?.name}</h1>
      <div className="mb-6">{ca?.description}</div>
      {isLoading && !data ? (
        <Stack className="pt-2" alignment="center">
          <Spinner variant="primary" />
          Loading certificates...
        </Stack>
      ) : (
        <>
          {data && data.length > 0 ? (
            <>
              <DataGridToolbar>
                <ButtonRow>
                  <AddNewSSOButton />
                </ButtonRow>
              </DataGridToolbar>
              <DataGrid gridColumnTemplate="2fr 2.25fr 0.75fr min-content 1.5fr min-content">
                <DataGridRow>
                  <DataGridHeadCell wrap={false}>Name / ID</DataGridHeadCell>
                  <DataGridHeadCell>Description</DataGridHeadCell>
                  <DataGridHeadCell>User name / ID</DataGridHeadCell>
                  <DataGridHeadCell>State</DataGridHeadCell>
                  <DataGridHeadCell>Expiration date</DataGridHeadCell>
                  <DataGridHeadCell></DataGridHeadCell>
                </DataGridRow>
                {data.map((item, i) => (
                  <CertificateListItem key={i} item={item} ca={ca} />
                ))}
              </DataGrid>
            </>
          ) : (
            <Stack
              alignment="center"
              distribution="center"
              direction="vertical"
              className="mt-[10vh]"
            >
              <p className="text-xl">
                It seems that no <b>{ca?.displayName || ca?.name}</b>{" "}
                certificates have been created yet.
              </p>
              <p className="text-xl">Do you want to create a new one?</p>
              <AddNewSSOButton
                className="mt-4"
                label={`Add ${ca?.displayName || ca?.name} cert`}
              />
            </Stack>
          )}
        </>
      )}
    </>
  )
}

export default CertificateList
