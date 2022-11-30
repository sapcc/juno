import React from "react"

import {
  AppShell,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ContentAreaToolbar,
  Container,
  DataGrid,
  DataGridCell,
  DataGridHeadCell,
  DataGridRow,
  DataGridToolbar,
  Icon,
  IntroBox,
  Message,
  Spinner,
  MainTabs,
  Modal,
  Stack,
  Tab,
  TabList,
  TabPanel,
} from "juno-ui-components"

import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"

// IMPORTANT: Replace this with your app's name
const URL_STATE_KEY = "exampleapp"

const App = (props) => {
  const setEndpoint = useStore((state) => state.setEndpoint)
  const setUrlStateKey = useStore((state) => state.setUrlStateKey)
  const { embedded } = props
  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  React.useEffect(() => {
    // set to empty string to fetch local test data in dev mode
    setEndpoint(props.endpoint || "")
    setUrlStateKey(URL_STATE_KEY)
  }, [])

  return (
    <AppShell
      pageHeader="Converged Cloud | Example App"
      contentHeading="Example App"
      embedded={embedded === "true"}
    >
      {/* TODO: use routes, create another page */}
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
            {error && (
              <Message variant="danger">
                {error}
                {statusCode === 404 && (
                  <>Custom error message for status code 404</>
                )}
              </Message>
            )}
            {/* Loading indicator for page content */}
            {processing && <Spinner variant="primary" />}

            {/* Edit an Item using a panel. TODO: show data for selected peak in panel, save changes to state(?) */}
            <EditItemPanel />

            {/* Render List of Peaks: */}
            <PeaksList />
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
    </AppShell>
  )
}

const StyledApp = (props) => {
  // default props
  props = {
    endpoint: process.env.ENDPOINT,
    theme: process.env.THEME,
    embedded: process.env.EMBEDDED,
    ...props,
  }
  return (
    <StyleProvider
      stylesWrapper="shadowRoot"
      theme={`${props.theme ? props.theme : "theme-dark"}`}
    >
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <App {...props} />
    </StyleProvider>
  )
}
export default StyledApp
