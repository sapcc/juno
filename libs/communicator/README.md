# Communicator

This lib makes it possible to exchange messages across contexts (e.g. several tabs on the same origin) using events. It offers both broadcast events and one-to-one communication.

The methods **broadcast <-> watch** and **get <-> onGet** each work as counterparts to each other. This means that if the sender uses the <code>broadcast</code> method for an event, then this event must be listened to elsewhere with <code>watch</code>. The same applies to <code>get</code> and <code>onGet</code>.

Where <code>get</code> and <code>onGet</code> are intended for one-to-one communication.

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
  broadcast,
  watch,
  get,
  onGet,
} from "https://assets.juno.global.cloud.sap/libs/communicator@latest/build/index.js"
```

or via importmap

```js
<script
 defer
 src="https://assets.juno.global.cloud.sap/apps/widget-loader@latest/build/app.js"
 data-importmap-only="true"
></script>

<script type="module">
 import { broadcast, watch, get, onGet} from "@juno/communicator@latest"
</script>

```

# Usage

```js
import { broadcast, watch, get, onGet } from "communicator"
```

## broadcast(name, data, options) ⇒ <code>void</code>

Send messages via BroadcastChannel across contexts (e.g. several tabs on the same origin).

**Kind**: module function

| Param                            | Type                | Description                  |
| -------------------------------- | ------------------- | ---------------------------- |
| name (required)                  | <code>string</code> | message name                 |
| data (required, null is allowed) | <code>any</code>    | data of the message          |
| options (optional)               | <code>object</code> | - debug <code>boolean</code> |

example:

```js
import { broadcast } from "communicator"

broadcast(
  "AUTH_TOKEN_UPDATED",
  { token: "TOKEN" },
  {
    debug: true,
  }
)
```

## watch(name, callback, options) ⇒ <code>function</code>

Register a listener for a specific message. Messages are observed across contexts (e.g. several tabs on the same origin).

**Kind**: module function

| Param               | Type                  | Description                                                                                             |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| name (required)     | <code>string</code>   | message name                                                                                            |
| callback (required) | <code>function</code> | A function that is executed when a message is sent for the registered name. <code>(data) => void</code> |
| options (optional)  | <code>object</code>   | - debug <code>boolean</code>                                                                            |

example:

```js
import { watch } from "communicator"

const unwatch = watch(
  "AUTH_TOKEN_UPDATED",
  (data) => {
    // receive message data
    console.log(data)
  },
  {
    debug: false, // default
  }
)

// ...
unwatch()
```

## get(name, callback, options) ⇒ <code>function</code>

Request for a message name and receive the data with the callback
**Kind**: module function

| Param               | Type                  | Description                                                              |
| ------------------- | --------------------- | ------------------------------------------------------------------------ |
| name (required)     | <code>string</code>   | message name                                                             |
| callback (required) | <code>function</code> | A function that is executed on get response. <code>(data) => void</code> |
| options (optional)  | <code>object</code>   | - debug <code>boolean</code>                                             |

example:

```js
import { get } from "communicator"

const cancel = get(
  "AUTH_TOKEN_UPDATED",
  (data) => {
    // receive message data
    console.log(data)
  },
  {
    debug: false, // default
  }
)

// ...
cancel()
```

## onGet(name, callback, options) ⇒ <code>function</code>

Response to get messages.
**Kind**: module function

| Param               | Type                  | Description                                                                             |
| ------------------- | --------------------- | --------------------------------------------------------------------------------------- |
| name (required)     | <code>string</code>   | message name                                                                            |
| callback (required) | <code>function</code> | A function that is executed on get events and returns the data. <code>() => data</code> |
| options (optional)  | <code>object</code>   | - debug <code>boolean</code>                                                            |

example:

```js
import { onGet } from "communicator"

const unwatch = onGet(
  "AUTH_TOKEN_UPDATED",
  () => {
    // return data
    return { name: "test" }
  },
  {
    debug: false, // default
  }
)

// ...
unwatch()
```
