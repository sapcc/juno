import React from "react"
import { getCertificates } from "../queries"

const Certificates = ({ certs }) => {
  const { isLoading, isError, data, error } = getCertificates()

  if (isLoading && !data) {
    return <span>Loading...</span>
  }

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
