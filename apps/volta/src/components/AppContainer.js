import React from "react"
import CertificateList from "./CertificateList"
import NewCertificate from "./NewCertificate"
import { getCAs } from "../queries"
import { useGlobalState, useDispatch } from "./StateProvider"
import { useMessagesDispatch } from "./MessagesProvider"
import {
  Spinner,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "juno-ui-components"

const CA_NAME = "galvani-pki"

const AppContainer = () => {
  const dispatchMessage = useMessagesDispatch()
  const auth = useGlobalState().auth
  const endpoint = useGlobalState().globals.endpoint

  // fetch the certificates
  const { isLoading, isError, data, error } = getCAs(
    auth.attr?.id_token,
    endpoint
  )

  const onSelectTab = () => {
    // on change tab remove messages
    dispatchMessage({
      type: "RESET_MESSAGE",
    })
  }

  return (
    <>
      {isLoading && !data ? (
        <Stack alignment="center">
          <Spinner variant="primary" />
          Loading CAs...
        </Stack>
      ) : (
        <>
          {data && data.length > 0 && (
            <Tabs onSelect={onSelectTab}>
              <TabList variant="content">
                {data.map((item, i) => (
                  <Tab key={i}>{item?.name}</Tab>
                ))}
              </TabList>
              {data.map((item, i) => (
                <TabPanel key={i}>
                  <NewCertificate ca={item?.name} />
                  <CertificateList ca={item?.name} />
                </TabPanel>
              ))}
            </Tabs>
          )}
        </>
      )}
    </>
  )
}

export default AppContainer
