import React, { useState, useEffect } from "react"
import { getCAs } from "../queries"
import { useGlobalState } from "./StateProvider"
import { useMessagesDispatch } from "./MessagesProvider"
import { useSearchParams } from "react-router-dom"
import { Spinner, Stack } from "juno-ui-components"
import CertificateList from "./CertificateList"
import NewCertificate from "./NewCertificate"
import CAsList from "./CAsList"
import CustomIntroBox from "./CustomIntroBox"
import { parseError } from "../helpers"
import CustomAppShell from "./CustomAppShell"

const CA = () => {
  const dispatchMessage = useMessagesDispatch()
  const oidc = useGlobalState().auth.oidc
  const endpoint = useGlobalState().globals.endpoint
  const disabledCAs = useGlobalState().globals.disabledCAs
  const [displayCAs, setDisplayCAs] = useState([])
  const [selectedCA, setSelectedCA] = useState(null)
  let [searchParams, setSearchParams] = useSearchParams()

  // fetch the CAs
  const { isLoading, isError, data, error } = getCAs(
    oidc?.auth?.id_token,
    endpoint
  )

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  useEffect(() => {
    if (error) {
      dispatchMessage({
        type: "SET_MESSAGE",
        msg: { variant: "error", text: parseError(error) },
      })
    }
  }, [error])

  // filter out disabled CAs
  useEffect(() => {
    if (!data) return
    const difference = data.filter(
      (ca) => !disabledCAs.some((caName) => ca.name === caName)
    )
    setDisplayCAs(difference)
  }, [data])

  // read current url state and call main fetch method if state is presented
  React.useEffect(() => {
    if (displayCAs && displayCAs.length > 0) {
      // find and save ca given per param in the url
      const index = displayCAs.findIndex(
        (e) => e.name == searchParams.get("ca")
      )
      if (index >= 0) {
        return setSelectedCA(displayCAs[index])
      }
      return setSelectedCA(null)
    }
  }, [displayCAs, searchParams.get("ca")])

  return (
    <CustomAppShell>
      {!selectedCA && <CustomIntroBox />}
      {isLoading && !data ? (
        <Stack alignment="center">
          <Spinner variant="primary" />
          Loading CAs...
        </Stack>
      ) : (
        <>
          {selectedCA ? (
            <>
              <NewCertificate ca={selectedCA?.name} />
              <CertificateList ca={selectedCA} />
            </>
          ) : (
            <CAsList cas={displayCAs} />
          )}
        </>
      )}
    </CustomAppShell>
  )
}

export default CA
