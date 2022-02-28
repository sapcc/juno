import React, { useEffect } from "react"
import { getCertificates } from "../queries"
import { useGlobalState } from "./StateProvider"
import { useMessagesDispatch } from "./MessagesProvider"
import {
  DataList,
  DataListRow,
  DataListCell,
  Spinner,
} from "juno-ui-components"
import CertificateListItem from "./CertificateListItem"

const datListHeaderItem = `
font-bold
`

const CertificateList = () => {
  const dispatch = useMessagesDispatch()
  const auth = useGlobalState().auth
  const { isLoading, isError, data, error } = getCertificates(
    auth.attr?.id_token
  )

  useEffect(() => {
    let errMsg = error?.message
    if (error?.message) {
      try {
        errMsg = JSON.parse(error?.message).msg
      } catch (error) {}
    }
    if (errMsg) {
      dispatch({
        type: "SET_MESSAGE",
        msg: { variant: "error", text: errMsg },
      })
    }
  }, [error])

  // if (isLoading && !data) {
  //   return <span>Loading...</span>
  // }

  console.log("data: ", data)

  return (
    <>
      {isLoading && !data ? (
        <Spinner variant="primary" />
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
