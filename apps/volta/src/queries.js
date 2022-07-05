import { useQuery, useMutation } from "react-query"
import {
  cas,
  certificates,
  createCertificate,
  revokeCertificate,
} from "./actions"

// get all CAs
export const getCAs = (bearerToken, endpoint) => {
  return useQuery(["cas", bearerToken, endpoint], cas, {
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
  })
}

// get all certificates
export const getCertificates = (bearerToken, endpoint, ca) => {
  return useQuery(["certificates", bearerToken, endpoint, ca], certificates, {
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
  })
}

// add new cert
export const newCertificateMutation = () => {
  return useMutation(({ endpoint, ca, bearerToken, formState }) =>
    createCertificate(endpoint, ca, bearerToken, formState)
  )
}

// revoke cert
export const revokeCertificateMutation = () => {
  return useMutation(({ endpoint, ca, bearerToken, serial }) =>
    revokeCertificate(endpoint, ca, bearerToken, serial)
  )
}
