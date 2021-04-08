# communicator

## send

Send a GET event. For this, payload must contain a function called "receiveResponse". The receiver of this event will call this function.

```js
send("AUTH_GET_TOKEN", {
  receiveResponse: ({ token, authToken }) => console.log(token),
})
```

Send a BROADCAST event. All listeners from this event will get the payload.

```js
send("AUTH_UPDATE_TOKEN", { token: "TOKEN", authToken: "AUTH_TOKEN" })
```

## on

Listen for a GET event. The callback function contains the function called receiveResponse as a parameter. This should be called in order to answer the requester directly.

```js
on("AUTH_GET_TOKEN", ({ receiveResponse }) => {
  receiveResponse({ token: "TOKEN", authToken: "AUTH_TOKEN" })
})
```

Listen to a BROADCAST event.

```js
on("AUTH_UPDATE_TOKEN", ({ token: "TOKEN", authToken: "AUTH_TOKEN" }) =>
  console.log(token)
)
```
