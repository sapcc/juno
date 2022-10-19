import React, { useCallback } from "react"
import { exampleFetch as fetchStuff } from "./actions"
import useStore from "./store"
import ModalManager from "./components/ModalManager"
import EditItemPanel from "./components/EditItemPanel"
import PeaksList from "./components/PeaksList/PeaksList"

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
} 
from "juno-ui-components"

import { currentState, push } from "url-state-provider"
/* IMPORTANT: Replace this with your app's name */
const URL_STATE_KEY = "exampleapp"
/* --------------------------- */

const App = (props) => {
  const [processing, setProcessing] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [statusCode, setStatusCode] = React.useState(null)
  const { embedded } = props

  const apiCallExample = React.useCallback((term, options) => {
    if (!term) return

    // update URL state
    push(URL_STATE_KEY, { p: term })

    // set/reset status before searching
    setError(null)
    setStatusCode(200)
    setProcessing(true)

    // main fetch method (usually a list call)
    fetchStuff(term, options)
      .then((response) => {
        // get status code from response
        setStatusCode(response.status)
        // read input stream from response and return body as an object
        return response.json()
      })
      .then((data) => {
        console.log("DATA ITEMS", data)
        setItems(data)
      })
      .catch((error) => {
        setItems([]) // if error: set items to empty, otherwise the previous result would stay in state
        setStatusCode(error.statusCode)
        let message = error.message || error
        try {
          message = JSON.parse(message)
          message = message.error || message
        } catch (e) {}
        if (message === "not found") setError("Couldn't find anything")
        else setError(message)
      })
      .finally(() => {
        setProcessing(false)
      })
  }, [])

  // read current url state and call main fetch method if state is presented
  React.useEffect(() => {
    const urlState = currentState(URL_STATE_KEY)
    if (urlState && urlState.p) {
      apiCallExample(urlState.p)
    }
  }, [apiCallExample])

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
                {statusCode === 404 && <>Custom error message for status code 404</>}
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
            Content Panel two. Normally you will probably want to put the TabPanel content into separate components.
          </Container>
        </TabPanel>

      </MainTabs>
      <ModalManager />
    </AppShell>
  )
}

export default App
