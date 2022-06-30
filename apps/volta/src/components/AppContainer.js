import React, { useState } from "react"
import CertificateList from "./CertificateList"
import NewCertificate from "./NewCertificate"
import { getCAs } from "../queries"
import { useGlobalState } from "./StateProvider"
import { useMessagesDispatch } from "./MessagesProvider"
import { useSearchParams } from "react-router-dom"
import {
  Spinner,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "juno-ui-components"

const AppContainer = () => {
  const dispatchMessage = useMessagesDispatch()
  const auth = useGlobalState().auth
  const endpoint = useGlobalState().globals.endpoint
  const showNewSSO = useGlobalState().globals.showNewSSO
  const [tabIndex, setTabIndex] = useState(0)
  let [searchParams, setSearchParams] = useSearchParams()

  // fetch the certificates
  const { isLoading, isError, data, error } = getCAs(
    auth.attr?.id_token,
    endpoint
  )

  const updateUrlParam = React.useCallback(
    (index) => {
      // fetch the tab name
      if (data && data.length > 0 && data[index]?.name) {
        return setSearchParams({ ca: data[index]?.name })
      }
    },
    [data]
  )

  // read current url state and call main fetch method if state is presented
  React.useEffect(() => {
    if (data && data.length > 0 && searchParams.get("ca")) {
      // update tab from url
      const index = data.findIndex((e) => e.name == searchParams.get("ca"))
      if (index >= 0) {
        setTabIndex(index)
      }
    }
  }, [data, searchParams.get("ca")])

  const onSelectTab = (index) => {
    // control of the Tabs state and behaviour.
    if (!showNewSSO) {
      // update URL state
      setTabIndex(index)
      updateUrlParam(index)
    }
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
            <Tabs onSelect={onSelectTab} selectedIndex={tabIndex}>
              <TabList variant="content">
                {data.map((item, i) => (
                  <Tab key={i}>{item?.name}</Tab>
                ))}
              </TabList>
              {data.map((item, i) => (
                <TabPanel key={i}>
                  <NewCertificate ca={item?.name} />
                  <CertificateList ca={item} />
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
