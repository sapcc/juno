import React from "react"
import { getCertificates } from "../queries"
import { useGlobalState } from "./StateProvider"

const Certificates = () => {
  const auth = useGlobalState().auth
  const { isLoading, isError, data } = getCertificates(auth.attr?.id_token)

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
