import React, { useEffect, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Message,
  Spinner,
  MainTabs,
  Tab,
  TabList,
  TabPanel,
} from "juno-ui-components"
import useStore from "./store"
import { currentState, push, addOnChangeListener } from "url-state-provider"
import ModalManager from "./components/ModalManager"
import PanelManager from "./components/PanelManager"
import { useQuery } from "react-query"
import { fetchPeaks } from "./actions"
import PeaksList from "./components/PeaksList/PeaksList"

const AppContent = (props) => {
  const endpoint = useStore((state) => state.endpoint)
  const urlStateKey = useStore((state) => state.urlStateKey)
  const [currentPanel, setCurrentPanel] = useState(null)
  const [currentModal, setCurrentModal] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)

  const { isLoading, isError, data, error } = useQuery(
    ["peaks", endpoint, {}],
    fetchPeaks,
    {
      // enable the query also if the endpoint is set. For fetching local
      // data is not necessary since it should be empty
      // enabled: !!endpoint,
      // If set to Infinity, the data will never be considered stale
      //  until a browser reload is triggered
      // staleTime: Infinity,
      // refer to this documentation to see more options
      // https://tanstack.com/query/v4/docs/guides/queries
    }
  )

  // wait until the global state is set to fetch the url state
  useEffect(() => {
    const urlState = currentState(urlStateKey)
    setCurrentPanel(urlState?.currentPanel)
    setCurrentModal(urlState?.currentModal)
    if (urlState?.tabIndex) setTabIndex(urlState?.tabIndex)
  }, [urlStateKey])

  // this listener reacts on any change on the url state
  addOnChangeListener(urlStateKey, (newState) => {
    setCurrentPanel(newState?.currentPanel)
    setCurrentModal(newState?.currentModal)
  })

  const onTabSelected = (index) => {
    setTabIndex(index)
    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, tabIndex: index })
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem icon="home" label="Example App Home" />
      </Breadcrumb>

      {/* Modularize? -> create views/pages?*/}
      <MainTabs selectedIndex={tabIndex} onSelect={onTabSelected}>
        <TabList>
          <Tab>Peaks</Tab>
          <Tab>Tab Two</Tab>
        </TabList>

        <TabPanel>
          {/* You'll normally want to use a Container as a wrapper for your content because it has padding that makes everything look nice */}
          <Container py>
            {/* Set the background graphic using tailwind background image syntax as below. The image must exist at the specified location in your app */}
            {/*<IntroBox variant="hero" heroImage="bg-[url('img/app_bg_example.svg')]">
              This is the fancy introbox variant for apps that have some app specific flavor branding with a special background graphic.
            </IntroBox> */}
            {/* Messages always at the top of the content area or if there is a hero introbox directly underneath that */}
            {isError && (
              <Message variant="danger">
                {`${error.statusCode}, ${error.message}`}
              </Message>
            )}
            {/* Loading indicator for page content */}
            {isLoading && <Spinner variant="primary" />}

            <PanelManager currentPanel={currentPanel} />

            {/* Render List of Peaks: */}
            <PeaksList peaks={data} />
          </Container>
        </TabPanel>
        <TabPanel>
          <Container py>
            Content Panel two. Normally you will probably want to put the
            TabPanel content into separate components.
          </Container>
        </TabPanel>
      </MainTabs>
      <ModalManager currentModal={currentModal} />
    </>
  )
}

export default AppContent
