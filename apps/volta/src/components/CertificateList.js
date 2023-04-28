import React, { useEffect } from "react"
import { getCertificates } from "../queries"
import { useMessageStore } from "messages-provider"
import {
  useSsoShowNew,
  useSsoActions,
  useAuthData,
  useGlobalsEndpoint,
  useGlobalsDocumentationLinks,
} from "../hooks/useStore"
import { parseError } from "../helpers"
import {
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridToolbar,
  ButtonRow,
  Container,
  Stack,
} from "juno-ui-components"
import CertificateListItem from "./CertificateListItem"
import AddNewSSOButton from "./AddNewSSOButton"
import HintLoading from "./HintLoading"

const Heading = `
jn-font-bold
jn-text-lg
jn-text-theme-high
jn-pb-2
 `

const CertificateList = ({ ca }) => {
  const addMessage = useMessageStore((state) => state.addMessage)

  const showPanel = useSsoShowNew()
  const { setShowNewSSO } = useSsoActions()
  const authData = useAuthData()
  const endpoint = useGlobalsEndpoint()
  const docuLinks = useGlobalsDocumentationLinks()

  // fetch the certificates
  const { isLoading, isError, data, error } = getCertificates(
    authData?.JWT,
    endpoint,
    ca?.name
  )

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  useEffect(() => {
    if (error) {
      addMessage({
        variant: "error",
        text: parseError(error),
      })
    }
  }, [error])

  const onAddClicked = () => {
    setShowNewSSO(true)
  }

  return (
    <>
      <h1 className={Heading}>{ca?.display_name || ca?.name}</h1>
      <div>{ca?.description} </div>
      {docuLinks[ca.name] && (
        <a href={docuLinks[ca.name]} target="_blank">
          Read more about {ca.display_name || ca.name} in our documentation
        </a>
      )}

      <Container px={false} py>
        {isLoading && !data ? (
          <HintLoading text="Loading certificates..." />
        ) : (
          <>
            {data && data.length > 0 && (
              <>
                <DataGridToolbar>
                  <ButtonRow>
                    <AddNewSSOButton
                      disabled={!data || showPanel}
                      onClick={onAddClicked}
                    />
                  </ButtonRow>
                </DataGridToolbar>
                <DataGrid gridColumnTemplate="2fr 2.25fr 0.75fr min-content 1.5fr min-content">
                  <DataGridRow>
                    <DataGridHeadCell nowrap={true}>Name / ID</DataGridHeadCell>
                    <DataGridHeadCell>Description</DataGridHeadCell>
                    <DataGridHeadCell>User name / ID</DataGridHeadCell>
                    <DataGridHeadCell>State</DataGridHeadCell>
                    <DataGridHeadCell>Expiration date</DataGridHeadCell>
                    <DataGridHeadCell></DataGridHeadCell>
                  </DataGridRow>
                  {data.map((item, i) => (
                    <CertificateListItem key={i} item={item} ca={ca} />
                  ))}
                </DataGrid>
              </>
            )}
            {data && data.length === 0 && (
              <Stack
                alignment="center"
                distribution="center"
                direction="vertical"
                className="mt-[10vh]"
              >
                <p className="text-xl">
                  It seems that no <b>{ca?.display_name || ca?.name}</b>{" "}
                  certificates have been created yet.
                </p>
                <p className="text-xl">Do you want to create a new one?</p>
                <AddNewSSOButton
                  className="mt-4"
                  label={`Add new cert`}
                  onClick={onAddClicked}
                />
              </Stack>
            )}
          </>
        )}
      </Container>
    </>
  )
}

export default CertificateList
