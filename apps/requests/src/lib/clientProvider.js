import React, { createContext, useContext, useMemo } from "react"
import Client from "./apiClient"

const ClientContext = createContext()

const useClient = () => useContext(ClientContext)

const ClientProvider = ({ endpoint, region, authToken, children }) => {
  let client = useMemo(() => {
    if (!endpoint || !authToken || !region) return null
    return new Client(endpoint, authToken, region)
  }, [endpoint, authToken, region])

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  )
}

export { ClientProvider, useClient }
