import { useQuery, useMutation } from "react-query"
import { certificates, createCertificate } from "./actions"

// get all certificates
export const getCertificates = (bearerToken) => {
  return useQuery(["certificates", bearerToken], certificates, {
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
  })
}

// add new cert
export const newCertificateMutation = () => {
  return useMutation(({ bearerToken, formState }) =>
    createCertificate(bearerToken, formState)
  )
}
