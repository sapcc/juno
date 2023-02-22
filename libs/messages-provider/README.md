# Messages Provider

This lib will help you to manage and show messages in your application. A Message holds generally important information to help understand the contents, purpose, or state of a whole page or view.

## Usage

The lib uses a **context** store based on Zustand to manage the messages. That means that you can add as many contexts as you need. This could be the case if your application uses a panel and you would like to show the messages in the panel but not in the app content.

1. Add the message **MessagesProvider** in the parent component where you display the messages or where you use the hook to manage them. Normally it is set on the top component so you can use it from everywhere underneath.

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

2. Add the messages component where the messages should be displayed.

```javascript
import React from "react"
import { Messages } from "messages-provider"

const AppContent = (props) => {
  return (
    <div>
      <Messages />
      Hello world!
    </div>
  )
}

export default AppContent
```

3. Now you can manage the messages from any component underneath the **App** component and they will displayed in the Messages component.

```javascript
import React from "react"
import { useMessageStore } from "messages-provider"

const SomeOtherComponent = (props) => {
  const addMessage = useMessageStore((state) => state.addMessage)

  const onButtonClick = () => {
    addMessage({
      variant: "info",
      text: "Hello world!",
    })
  }

  return <button onclick={onButtonClick()}>Send message</button>
}

export default SomeOtherComponent
```

# Options

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
