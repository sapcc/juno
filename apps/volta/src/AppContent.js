import React, { useEffect, useState, useMemo } from "react"
import { useGlobalState } from "./components/StateProvider"
import WellcomeView from "./components/WellcomeView"
import CustomAppShell from "./components/CustomAppShell"
import { getCAs } from "./queries"
import { useSearchParams } from "react-router-dom"
import NewCertificate from "./components/NewCertificate"
import CAsList from "./components/CAsList"
import CertificateList from "./components/CertificateList"
import { useMessagesDispatch } from "./components/MessagesProvider"
import { parseError } from "./helpers"

const AppContent = () => {
  const dispatchMessage = useMessagesDispatch()
  const oidc = useGlobalState().auth.oidc
  const disabledCAs = useGlobalState().globals.disabledCAs
  const endpoint = useGlobalState().globals.endpoint
  let [searchParams, setSearchParams] = useSearchParams()

  // fetch the CAs
  const cas = getCAs(oidc?.auth?.id_token, endpoint)

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  useEffect(() => {
    if (cas?.error) {
      dispatchMessage({
        type: "SET_MESSAGE",
        msg: { variant: "error", text: parseError(cas?.error) },
      })
    }
  }, [cas?.error])

  // collect CAs that should be displayed
  const displayCAs = useMemo(() => {
    if (!cas?.data) return null
    if (!Array.isArray(cas?.data)) return null
    return cas?.data?.filter(
      (ca) => !disabledCAs.some((caName) => ca.name === caName)
    )
  }, [cas?.data])

  // find ca given per param in the url
  const selectedCA = useMemo(() => {
    if (displayCAs && displayCAs.length > 0) {
      const index = displayCAs.findIndex(
        (e) => e.name == searchParams.get("ca")
      )
      if (index >= 0) {
        return displayCAs[index]
      }
    }
    return null
  }, [displayCAs, searchParams.get("ca")])

  return (
    <CustomAppShell>
      {oidc?.auth?.error || !oidc?.loggedIn ? (
        <WellcomeView loginCallback={oidc?.login} />
      ) : (
        <>
          {selectedCA ? (
            <>
              <NewCertificate ca={selectedCA?.name} />
              <CertificateList ca={selectedCA} />
            </>
          ) : (
            <CAsList cas={displayCAs} isLoading={cas?.isLoading} />
          )}
        </>
      )}
    </CustomAppShell>
  )
}

export default AppContent
