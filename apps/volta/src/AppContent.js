import React, { useEffect, useCallback, useMemo } from "react"
import { getCAs } from "./queries"
import { useSearchParams } from "react-router-dom"
import { useMessageStore, MessagesProvider } from "messages-provider"
import { parseError } from "./helpers"
import useStore from "./store"

import WellcomeView from "./components/WellcomeView"
import CustomAppShell from "./components/CustomAppShell"
import NewCertificate from "./components/NewCertificate"
import CAsList from "./components/CAsList"
import CertificateList from "./components/CertificateList"

const AppContent = () => {
  const addMessage = useMessageStore((state) => state.addMessage)
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const oidc = useStore(useCallback((state) => state.oidc))
  const disabledCAs = useStore(useCallback((state) => state.disabledCAs))
  let [searchParams] = useSearchParams()

  // set an error message when oidc fails
  useEffect(() => {
    if (oidc?.error) {
      addMessage({
        variant: "error",
        text: parseError(oidc?.error),
      })
    }
  }, [oidc?.error])

  // fetch the CAs
  // pass disabled cas to just fetch the ones that should be displayed
  const cas = getCAs(oidc?.auth?.id_token, endpoint, disabledCAs)

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

  // find ca given per param in the url and match with the cas displayed
  const selectedCA = useMemo(() => {
    if (cas?.data?.length > 0) {
      const index = cas?.data.findIndex((e) => e.name == searchParams.get("ca"))
      if (index >= 0) {
        return cas?.data[index]
      }
    }
    return null
  }, [cas, searchParams.get("ca")])

  return (
    <CustomAppShell>
      {oidc?.auth?.error || !oidc?.loggedIn ? (
        <WellcomeView loginCallback={oidc?.login} />
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
            <CAsList cas={cas?.data} isLoading={cas?.isLoading} />
          )}
        </>
      )}
    </CustomAppShell>
  )
}

export default AppContent
