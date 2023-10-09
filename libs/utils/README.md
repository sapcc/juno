# utils

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

**utils** is a collection of utility functions, libraries, and hooks that are commonly used in building a Juno application.

## Features

- **Infinite Scrolling**: react hook to facilitate the integration of an infinite scroll list.
- **Mock Rest API**: library designed to replicate the behavior of a Fetch REST API with mock data.

## Installation

Add utils to dependencies in package.json:

Within juno monorepo

```json

  "dependencies": {
    "utils": "*"
  },

```

Outside juno

```json

  "dependencies": {
    "utils": "https://assets.juno.global.cloud.sap/libs/utils@latest/package.tgz"
  },

```

## Usage

Here's how you can use **utils** in your project:

### Infinite scrolling

1. Import the react hook
2. Invoke the useEndlessScrollList hook by providing the complete set of items and desired options as a custom loading object and a function to be used to render the ref element. Please see below for more options.
3. Use the `scrollListItems` attribute to check if there are items to render. In case no items are available, display a corresponding message.
4. Use the iterator to iterate over the items to display. This will automatically handle the rendering of loading elements and reference objects whenever they are needed.

```js
//ViolationDetailsList.jsx
(1) import {useEndlessScrollList} from "utils"

const ViolationDetailsList = () => {
  const items = useGlobalsDetailsViolationItems()

  (2) const { scrollListItems, iterator } = useEndlessScrollList(
    items,
    {
      loadingObject: (
        <DataGridRow>
          <DataGridCell colSpan={2}>
            <span>Loading ...</span>
          </DataGridCell>
        </DataGridRow>
      ),
      refFunction: (ref) => (
        <DataGridRow>
          <DataGridCell colSpan={2} className="border-b-0 py-0">
            <span ref={ref} />
          </DataGridCell>
        </DataGridRow>
      ),
    }
  )

  return (
    <>
      (3) {scrollListItems?.length > 0 ? (
        <DataGrid
          cellVerticalAlignment="top"
          gridColumnTemplate="min-content 2fr"
        >
          (4) {iterator.map((item, index) => (
            <DataGridRow key={index}>
              [...]
            </DataGridRow>
          ))}
        </DataGrid>
      ) : (
        <Message
          text="No violations found. Everything OK!"
          variant="success"
        />
      )}
    </>
  )
}
```

Available options:

| Option        | description                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| delay         | the delay in ms between adding items to the list. Default is 500ms                                      |
| showLoading   | whether to show the loading indicator. Default is true and it renders a span with the text "Loading..." |
| loadingObject | the object to be rendered as the loading indicator. Default is a span with the text "Loading..."        |
| showRef       | whether to show the ref element                                                                         |
| refFunction   | the function to be used to render the ref element. It receives the ref as a parameter                   |

Return object attributes

| Option          | description                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| scrollListItems | the items to be displayed                                                                                                |
| lastLisItemRef  | the ref element to be used as the last item                                                                              |
| isAddingItems   | whether items are being added to the list                                                                                |
| iterator        | an iterator to be used to render the list. It has a map function that receives a function to be used to render each item |

### Mock REST API

Utilize this library to develop against mock data and without requiring any code modifications when switching to a real REST API. When utilizing fetchProxy with the `mock` flag, it utilizes a provided mock data. If the mock flag is unset, the request is then forwarded to the actual Fetch REST API.

#### Get started

1. Define the JSON data to use when mocking the REST API.

   ```json
   {
     "peaks": [
       { "id": 1, "name": "Ama Dablam", "height": "6814m", "region": "Khumbu" }
     ],
     "regions": [{ "id": 1, "name": "Khumbu", "countries": "Nepal" }]
   }
   ```

2. Save the data into a file, such as `db.json`. While it's optional to include the JSON directly as a parameter when initializing `fetchProxy`, for the sake of code cleanliness, we recommend storing it in a separate file.

3. Initialize the fetchProxy with the mock JSON data.

   ```js
   // App.jsx
   import React { useEffect} from "react"
   import AppContent from "./components/AppContent"
   import { fetchProxyInitDB } from "utils"
   import db from "../db.json"

   const App = (props = {}) => {
     // setup the mock db.json
     useEffect(() => {
       if (props.mockAPI) {
         fetchProxyInitDB(db)
       }
     }, [props.mockAPI])

     return <AppContent />
   }
   ```

4. Use the `fetchProxy` within your components to retrieve the mock JSON. Add the `mock` option to determine whether the API should be mocked or not.

   ```js
   // AppContent.jsx
   import React, { useEffect, useState } from "react"
   import { fetchProxy } from "utils"

   const AppContent = () => {
     const [data, setData] = useState(null)

     useEffect(() => {
       fetchProxy(`${window.location.origin}/peaks`, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           Accept: "application/json",
         },
         ...{ mock: true },
       })
         .then((response) => {
           if (!response.ok) {
             throw new Error("Network response was not ok")
           }
           return response.json()
         })
         .then((result) => {
           setData(result)
         })
     }, [])

     return <>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</>
   }
   ```

#### Conditions and Limitations

- fetchProxy

  1. Provide a Browser-compatible URL ([WHATWG URL Standard](https://nodejs.org/api/url.html#the-whatwg-url-api)) as you would use with the fetch API as for example `http://localhost:3001/peaks`.
  2. Additional query parameters will be disregarded. Currently, there is no functionality to paginate or sort based on query parameters yet.
  3. No PATCH method defined yet.

- Mock json data

  1. Flat collection of key-value pairs
  2. Key defines the name of the object category
  3. Value muss be an array.
  4. Each element in the array muss have the attribute id.

```react {linenos=inline,hl_lines=[3,6,"13-15"],linenostart=1}
// db.json
(1){
 (2)"peaks":
 (3)[
   {
     (4)"id": 1,
     "name": "Ama Dablam",
     "height": "6814m",
     "region": "Khumbu"
   }
 ]
}
```

#### Routes

Based on the previous mock JSON data, here are all the default routes. When making POST, PUT, or DELETE requests, any changes will be automatically saved to the 'db' object and reset upon browser reload.

```bash
GET    /peaks
GET    /peaks/1
POST   /peaks
PUT    /peaks/1
DELETE /peaks/1
```

#### Self Contained Running Example

Simply copy the following example and run it to explore how to use this library.

```js
import React, { useEffect, useState } from "react"
import { fetchProxy, fetchProxyInitDB } from "utils"

const App = () => {
  const [data, setData] = useState(null)

  // setup the mock db.json
  useEffect(() => {
    fetchProxyInitDB({
      peaks: [{ id: 1, name: "Ama Dablam", height: "6814m", region: "Khumbu" }],
    })
  }, [])

  useEffect(() => {
    fetchProxy(`${window.location.origin}/peaks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...{ mock: true },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((result) => {
        setData(result)
      })
  }, [])

  return <>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</>
}

export default App
```

## Testing

To run tests, use the following command:

```bash
npm run test
```

If you're working within the Juno monorepo using workspaces, you can use:

```bash
npm -w utils run test
```

Alternatively, from within the workspace:

```bash
wb npm -w utils run test
```

## Build

To build your project, run:

```bash
npm run build
```

For Juno monorepo users within workspaces, you can use:

```bash
npm -w utils run build
```

Or, from within the workspace:

```bash
wb npm -w utils run build
```

## Documentation

For detailed documentation, refer to [link to documentation].

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
