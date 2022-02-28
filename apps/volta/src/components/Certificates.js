import React, { useEffect } from "react"
import { getCertificates } from "../queries"
import { useGlobalState } from "./StateProvider"
import { useMessagesDispatch } from "./MessagesProvider"
import { DataList, DataListRow, DataListCell } from "juno-ui-components"

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
      <div>Certificates goes here</div>
      {JSON.stringify(data)}

      {/* <DataList>
        <DataListRow>
          <DataListCell>DataListCell</DataListCell>
          <DataListCell>Auto DataListCell</DataListCell>
          <DataListCell>DataListCell</DataListCell>
          <DataListCell>DataListCell</DataListCell>
          <DataListCell>DataListCell</DataListCell>
        </DataListRow>
      </DataList> */}

      {/* {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))} */}
    </>
  )
}

export default Certificates
