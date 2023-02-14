# Communicator

This lib makes it possible to exchange messages across contexts (e.g. several tabs on the same origin) using events. Depending on the options, the last message is saved in such a way that a new listener immediately receives the last message. The notification itself is done with the help of BroadcastChannel, the storage of the messages is done with LocalStoare.

# Install

```js
// package.json
//...
"dependencies": {
  // ...
  "communicator": "https://assets.juno.global.cloud.sap/libs/communicator@latest/package.tgz"
},
//...
```

or via import

```js
import {
  send,
  listen,
} from "https://assets.juno.global.cloud.sap/libs/communicator@latest/package.tgz"
```

or via importmap

```js
<script
 defer
 src="https://assets.juno.global.cloud.sap/apps/widget-loader@latest/build/app.js"
 data-importmap-only="true"
></script>

<script type="module">
 import { send, listen } from "@juno/communicator@latest"
</script>

```

# Usage

```js
import { send, listen } from "communicator"
```

## send(name, data, options) ⇒ <code>void</code>

Send messages via BroadcastChannel across contexts (e.g. several tabs on the same origin). The last message is stored by default. However, it is possible to influence the storage period using the expire option.

**Kind**: module function

| Param                            | Type                | Description                                                             |
| -------------------------------- | ------------------- | ----------------------------------------------------------------------- |
| name (required)                  | <code>string</code> | message name                                                            |
| data (required, null is allowed) | <code>any</code>    | data of the message                                                     |
| options (optional)               | <code>object</code> | - expires <code>epoch timestamp</code><br/>- debug <code>boolean</code> |

example:

```js
import { send } from "communicator"

send(
  "AUTH_TOKEN_UPDATED",
  { token: "TOKEN" },
  {
    expires: Math.floor(Date.now() / 1000) + 60 * 60 * 8, // 8 hours from now
    debug: true,
  }
)
```

## listen(name, callback, options) ⇒ <code>function</code>

Register a listener for a specific message. Messages are observed across contexts (e.g. several tabs on the same origin). If a current saved message already exists for the name, then the listener is executed immediately with this message. The expires option set by the "send" method has an effect here. In addition, the age of the listened messages can be determined with the youngerThan option.

**Kind**: module function

| Param               | Type                  | Description                                                                                             |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| name (required)     | <code>string</code>   | message name                                                                                            |
| callback (required) | <code>function</code> | A function that is executed when a message is sent for the registered name. <code>(data) => void</code> |
| options (optional)  | <code>object</code>   | - youngerThan <code>number</code> count of seconds<br/>- debug <code>boolean</code>                     |

example:

```js
import { listen } from "communicator"

const unregister = listen(
  "AUTH_TOKEN_UPDATED",
  (data) => {
    // receive message data
    console.log(data)
  },
  {
    youngerThan: 300, // younger than 5 minutes
    debug: false, // default
  }
)

// ...
unregister()
```
