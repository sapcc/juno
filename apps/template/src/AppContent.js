import React from "react"
import {
  Button,
  ContentAreaToolbar,
  Container,
  IntroBox,
  Message,
  Spinner,
  MainTabs,
  Tab,
  TabList,
  TabPanel,
  CodeBlock,
} from "juno-ui-components"
import useStore from "./store"
import NewItemForm from "./components/NewItemForm"
import heroImage from "./img/app_bg_example.svg?url"
import { useQuery } from "@tanstack/react-query"
import { exampleFetch as fetchStuff } from "./actions"
import { currentState, push } from "url-state-provider"

const AppContent = (props) => {
  const endpoint = useStore((state) => state.endpoint)
  const urlStateKey = useStore((state) => state.urlStateKey)

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["colors", endpoint, {}],
    queryFn: fetchStuff,
    // enable the query also if the endpoint is set. For fetching local
    // data is not necessary since it should be empty
    // enabled: !!endpoint,
    // If set to Infinity, the data will never be considered stale
    //  until a browser reload is triggered
    staleTime: Infinity,
    // refer to this documentation to see more options
    // https://tanstack.com/query/v4/docs/guides/queries
  })

  const openNewItemForm = () => {
    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, newItemFormOpened: true })
  }

  return (
    <MainTabs>
      <TabList variant="main">
        <Tab>Tab One</Tab>
        <Tab>Tab Two</Tab>
      </TabList>

      <TabPanel>
        {/* You'll normally want to use a Container as a wrapper for your content because it has padding that makes everything look nice */}
        <Container px py>
          {/* Set the background graphic using css background image syntax as below. You must import the image from the correct location in your app
           * Ensure your webpack config has the rule for "config for background svgs in jsx." as seen in the webpack config of this template app.
           */}
          <IntroBox variant="hero" heroImage={`url(${heroImage})`}>
            This is the fancy introbox variant for apps that have some app
            specific flavor branding with a special background graphic.
          </IntroBox>
          {/* Messages always at the top of the content area or if there is a hero introbox directly underneath that */}
          <Message>
            Welcome to the template app. Shown here is an example layout with
            tab navigation for the whole content.
          </Message>
          {isError && (
            <Message variant="danger">
              {`${error.statusCode}, ${error.message}`}
            </Message>
          )}
          {/* Loading indicator for page content */}
          {isLoading && <Spinner variant="primary" />}
          {/* Example component using a Panel */}
          <NewItemForm />
          {/* Add a toolbar  */}
          <ContentAreaToolbar>
            <Button icon="addCircle" onClick={openNewItemForm}>
              Add Action
            </Button>
          </ContentAreaToolbar>
          {/*
           *
           *
           * CONTENT GOES HERE
           *
           *
           *
           * */}
          <p>
            Content goes here (adjust the endpoint <b>{props.endpoint}</b>{" "}
            defined in env.local)
          </p>
          <p>
            Shown below is the response data from a fetch request against the
            local server using react-query
          </p>

          <CodeBlock lang="json" content={data || {}} />

          <Container px={false} py></Container>
        </Container>
      </TabPanel>

      <TabPanel>
        <Container>
          Content Panel two. Normally you will probably want to put the TabPanel
          content into separate components.
        </Container>
      </TabPanel>
    </MainTabs>
  )
}

export default AppContent
