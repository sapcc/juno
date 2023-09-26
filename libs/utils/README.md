# utils

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

**utils** is a collection of utility functions, libraries, and hooks that are commonly used in building a Juno application.

## Features

- **Infinite scrolling**: react hook to facilitate the integration of an infinite scroll list.
- **Mock REST API**: library designed to replicate the behavior of a REST API by utilizing a db.js file within your application.

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
