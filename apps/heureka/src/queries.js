import { useQuery } from "react-query"
import {
  services,
  serviceFilters,
  service,
  components,
  componentFilters,
  component,
  vulnerabilities,
  vulnerability,
  vulnerabilityFilters,
  users,
  user,
  userFilters,
} from "./actions"

// get all services
export const getServices = (bearerToken, endpoint, options) => {
  return useQuery(["services", bearerToken, endpoint, options], services, {
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
  })
}

export const getServiceFilters = (bearerToken, endpoint, options) => {
  return useQuery(
    ["serviceFilters", bearerToken, endpoint, options],
    serviceFilters,
    {
      // The query will not execute until the bearerToken exists
      enabled: !!bearerToken,
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

export const getService = (
  bearerToken,
  endpoint,
  serviceId,
  placeholderData
) => {
  return useQuery(["service", bearerToken, endpoint, serviceId], service, {
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
    // Placeholder data allows a query to behave as if it already has data, similar to the initialData option,
    // but the data is not persisted to the cache. This comes in handy for situations where you have enough partial (or fake)
    // data to render the query successfully while the actual data is fetched in the background.
    placeholderData: placeholderData,
  })
}

// get all components
export const getComponents = (bearerToken, endpoint, options) => {
  return useQuery(["components", bearerToken, endpoint, options], components, {
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
  })
}

export const getComponentFilters = (bearerToken, endpoint, options) => {
  return useQuery(
    ["componentFilters", bearerToken, endpoint, options],
    componentFilters,
    {
      // The query will not execute until the bearerToken exists
      enabled: !!bearerToken,
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

export const getComponent = (
  bearerToken,
  endpoint,
  componentId,
  placeholderData
) => {
  return useQuery(
    ["component", bearerToken, endpoint, componentId],
    component,
    {
      // The query will not execute until the bearerToken exists
      enabled: !!bearerToken,
      // Placeholder data allows a query to behave as if it already has data, similar to the initialData option,
      // but the data is not persisted to the cache. This comes in handy for situations where you have enough partial (or fake)
      // data to render the query successfully while the actual data is fetched in the background.
      placeholderData: placeholderData,
    }
  )
}

export const getVulnerabilities = (bearerToken, endpoint, options) => {
  return useQuery(
    ["vulnerabilities", bearerToken, endpoint, options],
    vulnerabilities,
    {
      // The query will not execute until the bearerToken exists
      enabled: !!bearerToken,
      // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
      // When the new data arrives, the previous data is seamlessly swapped to show the new data.
      // isPreviousData is made available to know what data the query is currently providing you
      keepPreviousData: true,
    }
  )
}

export const getVulnerability = (
  bearerToken,
  endpoint,
  vulnerabilityId,
  placeholderData
) => {
  return useQuery(
    ["user", bearerToken, endpoint, vulnerabilityId],
    vulnerability,
    {
      // The query will not execute until the bearerToken exists
      enabled: !!bearerToken,
      // Placeholder data allows a query to behave as if it already has data, similar to the initialData option,
      // but the data is not persisted to the cache. This comes in handy for situations where you have enough partial (or fake)
      // data to render the query successfully while the actual data is fetched in the background.
      placeholderData: placeholderData,
    }
  )
}

export const getVulnerabilityFilters = (bearerToken, endpoint, options) => {
  return useQuery(
    ["vulnerabilityFilters", bearerToken, endpoint, options],
    vulnerabilityFilters,
    {
      // The query will not execute until the bearerToken exists
      enabled: !!bearerToken,
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

export const getUsers = (bearerToken, endpoint, options) => {
  return useQuery(["users", bearerToken, endpoint, options], users, {
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
  })
}

export const getUser = (bearerToken, endpoint, userId, placeholderData) => {
  return useQuery(["user", bearerToken, endpoint, userId], user, {
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
    // Placeholder data allows a query to behave as if it already has data, similar to the initialData option,
    // but the data is not persisted to the cache. This comes in handy for situations where you have enough partial (or fake)
    // data to render the query successfully while the actual data is fetched in the background.
    placeholderData: placeholderData,
  })
}

export const getUserFilters = (bearerToken, endpoint, options) => {
  return useQuery(["userFilters", endpoint, options], userFilters, {
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
    // If a user leaves your application and returns to stale data, React Query automatically requests fresh data for you in the background.
    // You can disable this globally or per-query using the refetchOnWindowFocus option
    refetchOnWindowFocus: false,
  })
}
