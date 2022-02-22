import { useQuery } from "react-query"
import { certificates } from "./actions"

// get all certificates
export const getCertificates = (bearerToken) => {
  return useQuery("certificates", certificates(bearerToken))
}
