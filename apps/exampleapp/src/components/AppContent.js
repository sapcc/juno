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
import { useGlobalsActions, useGlobalsTabIndex } from "./StoreProvider"
import ModalManager from "./ModalManager"
import PanelManager from "./PanelManager"
import Peaks from "./peaks/Peaks"

const AppContent = (props) => {
  const { setTabIndex } = useGlobalsActions()
  const tabIndex = useGlobalsTabIndex()

  const onTabSelected = (index) => {
    setTabIndex(index)
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
            <PanelManager />
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
      <ModalManager />
    </>
  )
}

export default AppContent
