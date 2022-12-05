import React from "react"

import useStore from "../store"
import { useQuery } from "react-query"
import { fetchSecretOptions } from "../actions"
import SmartSelectInput from "./SmartSelectInput"

const TabPanelTwo = ({}) => {
  const endpoint = useStore((state) => state.endpoint)
  const { isLoading, isError, data, error } = useQuery(
    ["defaultSecrets", endpoint, {}],
    fetchSecretOptions,
    {
      // enable the query also if the endpoint is set. For fetching local
      // data is not necessary since it should be empty
      // enabled: !!endpoint,
      // If set to Infinity, the data will never be considered stale
      //  until a browser reload is triggered
      staleTime: Infinity,
      // refer to this documentation to see more options
      // https://tanstack.com/query/v4/docs/guides/queries
    }
  )

  return (
    <>
      <SmartSelectInput options={data} />
    </>
  )
}

export default TabPanelTwo
