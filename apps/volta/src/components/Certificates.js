import React, { useEffect } from "react"
import { getCertificates } from "../queries"
import { useGlobalState } from "./StateProvider"
import { useMessagesState, useMessagesDispatch } from "./MessagesProvider"

const Certificates = () => {
  const dispatch = useMessagesDispatch()
  const messagesState = useMessagesState()
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
    console.log("error: ", error)
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

  return (
    <>
      <div>Certificates goes here</div>
      <ul>
        {JSON.stringify(data)}

        {/* {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))} */}
      </ul>
    </>
  )
}

export default Certificates
