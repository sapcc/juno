import { useQuery } from "react-query"
import { certificates } from "./actions"

// get all certificates
export const getCertificates = (bearerToken) => {
  return useQuery(["certificates", bearerToken], certificates, {
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
  })
}
