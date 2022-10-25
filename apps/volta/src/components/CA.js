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

  // read current url state and call main fetch method if state is presented
  React.useEffect(() => {
    if (data && data.length > 0 && searchParams.get("ca")) {
      // find and save ca given per param in the url
      const index = data.findIndex((e) => e.name == searchParams.get("ca"))
      if (index >= 0) {
        setSelectedCA(data[index])
      }
    }
  }, [data, searchParams.get("ca")])

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
            <CAsList cas={data} />
          )}
        </>
      )}
    </CustomAppShell>
  )
}

export default CA
