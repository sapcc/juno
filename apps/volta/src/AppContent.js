import React, { useEffect, useCallback, useMemo } from "react"
import { getCAs } from "./queries"
import { useSearchParams } from "react-router-dom"
import { useMessageStore, MessagesProvider } from "messages-provider"
import { parseError } from "./helpers"
import {
  useGlobalsEndpoint,
  useGlobalsDisabledCAs,
  useAuthData,
  useAuthLogin,
} from "./hooks/useStore"

import WellcomeView from "./components/WellcomeView"
import CustomAppShell from "./components/CustomAppShell"
import NewCertificate from "./components/NewCertificate"
import CAsList from "./components/CAsList"
import CertificateList from "./components/CertificateList"

const AppContent = () => {
  const addMessage = useMessageStore((state) => state.addMessage)
  const endpoint = useGlobalsEndpoint()
  const disabledCAs = useGlobalsDisabledCAs()
  const authData = useAuthData()
  const login = useAuthLogin()

  let [searchParams] = useSearchParams()

  // set an error message when oidc fails
  useEffect(() => {
    if (authData?.error) {
      addMessage({
        variant: "error",
        text: parseError(authData?.error),
      })
    }
  }, [authData?.error])

  // fetch the CAs
  // pass disabled cas to just fetch the ones that should be displayed
  const cas = getCAs(authData?.auth?.JWT, endpoint, disabledCAs)

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  // TODO think about to add the message error with an onError callback directly on getCAs
  useEffect(() => {
    if (cas?.error) {
      addMessage({
        variant: "error",
        text: parseError(cas?.error),
      })
    }
  }, [cas?.error])

  // find ca given per param in the url
  const selectedCA = useMemo(() => {
    if (cas?.data?.length > 0) {
      const index = cas?.data.findIndex((e) => e.name == searchParams.get("ca"))
      if (index >= 0) {
        return cas?.data[index]
      }
    }
    return null
  }, [cas, searchParams.get("ca")])

  const displayCAs = useMemo(() => {
    if (!cas?.data) return []
    if (!Array.isArray(disabledCAs)) return cas
    // return just the CAs that should be displayed
    return cas?.data?.filter(
      (ca) => !disabledCAs.some((caName) => ca.name === caName)
    )
  }, [cas?.data, disabledCAs])

  return (
    <CustomAppShell>
      {authData?.auth?.error || !authData?.loggedIn ? (
        <WellcomeView
          loginCallback={login}
          isProcessing={authData.isProcessing}
        />
      ) : (
        <>
          {selectedCA ? (
            <>
              {/* create a new messges-provider for the panel in NewCertificate to be able to share messages to the different panel bodies */}
              <MessagesProvider>
                <NewCertificate ca={selectedCA?.name} />
              </MessagesProvider>
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
