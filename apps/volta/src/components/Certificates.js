import React, { useEffect } from "react"
import { getCertificates } from "../queries"
import { useGlobalState } from "./StateProvider"
import { useMessagesDispatch } from "./MessagesProvider"
import { DataList, DataListRow, DataListCell } from "juno-ui-components"

const datListHeaderItem = `
font-bold
`

const Certificates = () => {
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
      {data && (
        <DataList>
          <DataListRow>
            <DataListCell className={datListHeaderItem}>Name</DataListCell>
            <DataListCell className={datListHeaderItem}>
              Serial number
            </DataListCell>
            <DataListCell className={datListHeaderItem}>
              User name / ID
            </DataListCell>
            <DataListCell className={datListHeaderItem}>
              Expiration date
            </DataListCell>
            <DataListCell className={datListHeaderItem}></DataListCell>
          </DataListRow>
          {data.map((item, i) => (
            <DataListRow key={i}>
              <DataListCell>{item.description}</DataListCell>
              <DataListCell>{item.serial}</DataListCell>
              <DataListCell>{item.common_name}</DataListCell>
              <DataListCell>{item.not_after}</DataListCell>
              <DataListCell></DataListCell>
            </DataListRow>
          ))}
        </DataList>
      )}
    </>
  )
}

export default Certificates
