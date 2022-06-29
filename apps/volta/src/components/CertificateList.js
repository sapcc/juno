import React, { useEffect, useState } from "react"
import { getCertificates } from "../queries"
import { useGlobalState, useDispatch } from "./StateProvider"
import { useMessagesDispatch } from "./MessagesProvider"
import {
  DataList,
  DataListRow,
  DataListCell,
  Spinner,
  Stack,
  ContentAreaToolbar,
} from "juno-ui-components"
import CertificateListItem from "./CertificateListItem"
import AddNewSSOButton from "./AddNewSSOButton"
import { parseError } from "../helpers"

const datListHeaderItem = `
font-bold
`

const CertificateList = ({ ca }) => {
  const [enableCreateSSO, setEnableCreateSSO] = useState(false)
  const dispatchMessage = useMessagesDispatch()
  const dispatchGlobals = useDispatch()
  const auth = useGlobalState().auth
  const endpoint = useGlobalState().globals.endpoint

  // fetch the certificates
  const { isLoading, isError, data, error } = getCertificates(
    auth.attr?.id_token,
    endpoint,
    ca
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

  // TODO add memo
  return (
    <>
      {isLoading && !data ? (
        <Stack className="pt-2" alignment="center">
          <Spinner variant="primary" />
          Loading certificates...
        </Stack>
      ) : (
        <>
          {data && data.length > 0 && (
            <>
              <ContentAreaToolbar>
                <AddNewSSOButton />
              </ContentAreaToolbar>
              <DataList>
                <DataListRow className="relative">
                  <DataListCell className={datListHeaderItem} width={33}>
                    Name / ID
                  </DataListCell>
                  <DataListCell className={datListHeaderItem} width={30}>
                    Description
                  </DataListCell>
                  <DataListCell className={datListHeaderItem} width={10}>
                    User name / ID
                  </DataListCell>
                  <DataListCell className={datListHeaderItem} width={8}>
                    State
                  </DataListCell>
                  <DataListCell className={datListHeaderItem} width={15}>
                    Expiration date
                  </DataListCell>
                  <DataListCell
                    className={datListHeaderItem}
                    width={4}
                  ></DataListCell>
                </DataListRow>
                {data.map((item, i) => (
                  <CertificateListItem key={i} item={item} ca={ca} />
                ))}
              </DataList>
            </>
          )}
          {data && data.length === 0 && (
            <Stack
              alignment="center"
              distribution="center"
              direction="vertical"
              className="mt-[10vh]"
            >
              <p className="text-xl">
                It seems that no SSO certificates have been created yet.
              </p>
              <p className="text-xl">Do you want to create a new one?</p>
              <AddNewSSOButton className="mt-4" />
            </Stack>
          )}
        </>
      )}
    </>
  )
}

export default CertificateList
