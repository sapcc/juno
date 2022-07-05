import { useQuery } from "react-query"
import { services, service, components } from "./actions"

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

export const getService = (endpoint, serviceId, placeholderData) => {
  return useQuery(["service", endpoint, serviceId], service, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
    // Placeholder data allows a query to behave as if it already has data, similar to the initialData option,
    // but the data is not persisted to the cache. This comes in handy for situations where you have enough partial (or fake)
    // data to render the query successfully while the actual data is fetched in the background.
    placeholderData: placeholderData,
  })
}

// get all components
export const getComponents = (endpoint, options) => {
  return useQuery(["components", endpoint, options], components, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
  })
}
