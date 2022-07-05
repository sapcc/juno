import { useQuery } from "react-query"
import { services, components } from "./actions"

// get all services
export const getServices = (endpoint, limit = 10, offset = 1) => {
  return useQuery(["services", endpoint, limit, offset], services, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
  })
}

// get all components
export const getComponents = (endpoint, options) => {
  return useQuery(["services", endpoint, options], components, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
  })
}
