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
import { useGlobalsUrlStateKey } from "./components/StoreProvider"
import { currentState, push, addOnChangeListener } from "url-state-provider"
import ModalManager from "./components/ModalManager"
import PanelManager from "./components/PanelManager"
import Peaks from "./components/Peaks/Peaks"

const AppContent = (props) => {
  const urlStateKey = useGlobalsUrlStateKey()
  const [currentPanel, setCurrentPanel] = useState(null)
  const [currentModal, setCurrentModal] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)

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
            <PanelManager currentPanel={currentPanel} />
            <Peaks />
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
