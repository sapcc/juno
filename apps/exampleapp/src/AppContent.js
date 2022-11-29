import React from "react"
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
import ModalManager from "./components/ModalManager"
import EditItemPanel from "./components/EditItemPanel"
import { useQuery } from "react-query"
import { fetchPeaks } from "./actions"
import PeaksList from "./components/PeaksList/PeaksList"

const AppContent = (props) => {
  const endpoint = useStore((state) => state.endpoint)

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

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem icon="home" label="Example App Home" />
      </Breadcrumb>

      {/* Modularize? -> create views/pages?*/}
      <MainTabs>
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

            {/* Edit an Item using a panel. TODO: show data for selected peak in panel, save changes to state(?) */}
            <EditItemPanel />

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
      <ModalManager />
    </>
  )
}

export default AppContent
