import { useQuery, useMutation } from "react-query"
import { services } from "./actions"

// get all services
export const getServices = (endpoint) => {
  return useQuery(["services", endpoint], services, {
    // The query will not execute until the bearerToken exists
    enabled: !!endpoint,
  })
}
