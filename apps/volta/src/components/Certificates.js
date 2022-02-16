import React from "react"
import { useQuery, useMutation, useQueryClient, QueryClient } from "react-query"
import { certificates, hermes } from "../actions"

const Certificates = ({ certs }) => {
  // Access the client
  const queryClient = useQueryClient()

  // consecutive retries defaults to 3
  const { isLoading, isError, data, error } = useQuery(
    "certificates",
    certificates
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
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
