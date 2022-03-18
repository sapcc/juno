import { useQuery, useMutation } from "react-query"
import { certificates, createCertificate, revokeCertificate } from "./actions"

// get all certificates
export const getCertificates = (bearerToken, endpoint) => {
  console.log("getCertificates endpoint: ", endpoint)
  return useQuery(["certificates", bearerToken, endpoint], certificates, {
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
  })
}

// add new cert
export const newCertificateMutation = () => {
  return useMutation(({ endpoint, bearerToken, formState }) =>
    createCertificate(endpoint, bearerToken, formState)
  )
}

// revoke cert
export const revokeCertificateMutation = () => {
  return useMutation(({ endpoint, bearerToken, serial }) =>
    revokeCertificate(endpoint, bearerToken, serial)
  )
}
