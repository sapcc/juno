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
} from "juno-ui-components"
import CertificateListItem from "./CertificateListItem"

const datListHeaderItem = `
font-bold
`

const CertificateList = () => {
  const [enableCreateSSO, setEnableCreateSSO] = useState(false)
  const dispatchMessage = useMessagesDispatch()
  const dispatchGlobals = useDispatch()
  const auth = useGlobalState().auth
  const { isLoading, isError, data, error } = getCertificates(
    auth.attr?.id_token
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

  useEffect(() => {
    let errMsg = error?.message
    if (error?.message) {
      try {
        errMsg = JSON.parse(error?.message).msg
      } catch (error) {}
    }
    if (errMsg) {
      dispatchMessage({
        type: "SET_MESSAGE",
        msg: { variant: "error", text: errMsg },
      })
    }
  }, [error])

  // if (isLoading && !data) {
  //   return <span>Loading...</span>
  // }

  console.log("data: ", data, " loadisLoadingng: ", isLoading)

  // TODO add memo
  return (
    <>
      {isLoading || !data ? (
        <Stack alignment="center">
          <Spinner variant="primary" />
          Loading certificates...
        </Stack>
      ) : (
        <>
          {data && (
            <DataList>
              <DataListRow>
                <DataListCell className={datListHeaderItem} width={15}>
                  Name
                </DataListCell>
                <DataListCell className={datListHeaderItem} width={40}>
                  Serial number
                </DataListCell>
                <DataListCell className={datListHeaderItem} width={15}>
                  User name / ID
                </DataListCell>
                <DataListCell className={datListHeaderItem} width={20}>
                  Expiration date
                </DataListCell>
                <DataListCell
                  className={datListHeaderItem}
                  width={10}
                ></DataListCell>
              </DataListRow>
              {data.map((item, i) => (
                <CertificateListItem key={i} item={item} />
              ))}
            </DataList>
          )}
        </>
      )}
    </>
  )
}

export default CertificateList
