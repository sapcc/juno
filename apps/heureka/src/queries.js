import { useQuery } from "react-query"
import {
  services,
  serviceFilters,
  service,
  components,
  componentFilters,
  component,
  vulnerabilities,
  vulnerabilityFilters,
  users,
  user,
} from "./actions"

// get all services
export const getServices = (endpoint, options) => {
  return useQuery(["services", endpoint, options], services, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
  })
}

export const getServiceFilters = (endpoint, options) => {
  return useQuery(["serviceFilters", endpoint, options], serviceFilters, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
    // If a user leaves your application and returns to stale data, React Query automatically requests fresh data for you in the background.
    // You can disable this globally or per-query using the refetchOnWindowFocus option
    refetchOnWindowFocus: false,
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

export const getComponentFilters = (endpoint, options) => {
  return useQuery(["componentFilters", endpoint, options], componentFilters, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
    // If a user leaves your application and returns to stale data, React Query automatically requests fresh data for you in the background.
    // You can disable this globally or per-query using the refetchOnWindowFocus option
    refetchOnWindowFocus: false,
  })
}

export const getComponent = (endpoint, componentId, placeholderData) => {
  return useQuery(["component", endpoint, componentId], component, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
    // Placeholder data allows a query to behave as if it already has data, similar to the initialData option,
    // but the data is not persisted to the cache. This comes in handy for situations where you have enough partial (or fake)
    // data to render the query successfully while the actual data is fetched in the background.
    placeholderData: placeholderData,
  })
}

export const getVulnerabilities = (endpoint, options) => {
  return useQuery(["vulnerabilities", endpoint, options], vulnerabilities, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
  })
}

export const getVulnerabilityFilters = (endpoint, options) => {
  return useQuery(
    ["vulnerabilityFilters", endpoint, options],
    vulnerabilityFilters,
    {
      // The query will not execute until the bearerToken exists
      enabled: !!endpoint,
      // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
      // When the new data arrives, the previous data is seamlessly swapped to show the new data.
      // isPreviousData is made available to know what data the query is currently providing you
      keepPreviousData: true,
      // If a user leaves your application and returns to stale data, React Query automatically requests fresh data for you in the background.
      // You can disable this globally or per-query using the refetchOnWindowFocus option
      refetchOnWindowFocus: false,
    }
  )
}

export const getUsers = (endpoint, options) => {
  return useQuery(["users", endpoint, options], users, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
  })
}

export const getUser = (endpoint, userId, placeholderData) => {
  return useQuery(["user", endpoint, userId], user, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
    // Placeholder data allows a query to behave as if it already has data, similar to the initialData option,
    // but the data is not persisted to the cache. This comes in handy for situations where you have enough partial (or fake)
    // data to render the query successfully while the actual data is fetched in the background.
    placeholderData: placeholderData,
  })
}
