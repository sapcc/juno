import { useQuery, useMutation } from "@tanstack/react-query"
import {
  cas,
  certificates,
  createCertificate,
  revokeCertificate,
} from "./actions"

// get all CAs
export const getCAs = (bearerToken, endpoint, disabledCAs) => {
  return useQuery({
    queryKey: ["cas", bearerToken, endpoint, disabledCAs],
    queryFn: cas,
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
  })
}

// get all certificates
export const getCertificates = (bearerToken, endpoint, ca, revokedList) => {
  return useQuery({
    queryKey: ["certificates", bearerToken, endpoint, ca],
    queryFn: certificates,
    // The query will not execute until the bearerToken exists
    enabled: !!bearerToken,
    // refetch until the list of revoked list is empty
    refetchInterval: () => {
      const count = revokedList.filter((obj) => obj.ca === ca)
      if (count.length > 0) return 5000
      return false
    },
  })
}

// add new cert
export const newCertificateMutation = () => {
  return useMutation({
    mutationFn: ({ endpoint, ca, bearerToken, formState }) =>
      createCertificate(endpoint, ca, bearerToken, formState),
  })
}

// revoke cert
export const revokeCertificateMutation = () => {
  return useMutation({
    mutationFn: ({ endpoint, ca, bearerToken, serial }) =>
      revokeCertificate(endpoint, ca, bearerToken, serial),
  })
}
