# Messages Provider

Manage and display messages in your application easily and with the [Juno message component](https://ui.juno.qa-de-1.cloud.sap/?path=/docs/components-message--default).

A message holds generally important information to help understand the contents, purpose, or state of a whole page or view.

This lib uses a **context** store based on Zustand to manage the messages. That means that you can add as many contexts as you need. This is the case when you want to manage and display the messages in different locations in your application as for example in a panel or modal.

## Requirements

In order to run this library in your application you need to install also following libraries which are not included in the bundle:

- juno-ui-components
- react, recommended version ^18.2.0
- zustand, recommended version ^4.1.5

```bash
yarn add zustand@4.1.5, react@18.2.0 https://assets.juno.global.cloud.sap/libs/juno-ui-components@latest/package.tgz
```

## Usage

1. Import this lib

   ```bash
   yarn add https://assets.juno.global.cloud.sap/libs/messages-provider@latest/package.tgz
   ```

2. Add the message **MessagesProvider**. Normally it is set on the top of your application so you can use it from everywhere underneath.

   ```javascript
   import React from "react"
   import { MessagesProvider } from "messages-provider"
   import AppContent from "./AppContent"

   const App = (props) => {
     return (
       <MessagesProvider>
         <AppContent />
       </MessagesProvider>
     )
   }

   export default App
   ```

3. Add the **Messages** container. This component hold the Juno messages to display. The container should be placed as a child of the MessagesProvider.

```javascript
import React from "react"
import { MessagesProvider } from "messages-provider"
import AppContent from "./AppContent"

const App = (props) => {
  return (
    <MessagesProvider>
      <Messages />
      <AppContent />
    </MessagesProvider>
  )
}
```

4. Use the Hook **useMessageStore** to manage the messages from any component underneath and they will displayed in the Messages container.

   ```javascript
   import React from "react"
   import { useMessageStore } from "messages-provider"

   const AppContent = (props) => {
     const addMessage = useMessageStore((state) => state.addMessage)

     const onButtonClick = () => {
       addMessage({
         variant: "info",
         text: "Hello world!",
       })
     }

     return <button onclick={onButtonClick()}>Send message</button>
   }

   export default AppContent
   ```

## Availabe actions

- **messages**: return all messages int the store

  ```javascript
  import { useMessageStore } from "messages-provider"
  ...
  const messages = useMessageStore((state) => state.messages)
  ...
  ```

- **addMessage**: adds a message to the store
  Accepts an object containing:

  - variant (string). Variants are defined below.
  - text (string)

  ```javascript
  import { useMessageStore } from "messages-provider"
  ...
  const addMessage = useMessageStore((state) => state.addMessage)
  ...
  addMessage({
    variant: "info",
    text: "Hello world!",
  })
  ...
  ```

- **removeMessage**: removes the message with the given id from the store
  Accepts a paremeter containing the id as string from the message to remove.

  ```javascript
  import { useMessageStore } from "messages-provider"
  ...
  const removeMessage = useMessageStore((state) => state.removeMessage)
  ...
  removeMessage("message_ID")
  ...
  ```

- **resetMessages**: removes all messages in the store

  ```javascript
  import { useMessageStore } from "messages-provider"
  ...
  const resetMessages = useMessageStore((state) => state.resetMessages)
  ...
  resetMessages()
  ...
  ```

## Variants

Following variants are available:

- info
- warning
- danger
- error
- success

Variant **info** and **success** will be automatically dismissed after 10 seconds by default.
