# Communicator

This lib makes it possible to exchange messages across tabs using events. Depending on the options, the last message is saved in such a way that a new listener immediately receives the last message. The notification itself is done with the help of BroadcastChannel, the storage of the messages is done with LocalStoare.

## send

send:(messageName:string, messageData:any, options:object)

```js
send(
  "AUTHENTICATION",
  { token: "TOKEN" },
  { expires: Math.floor(Date.now() / 1000) + 300 }
):void
```

- messageName: (string) the name of the message
- messageData: (any) the data of the message
- options: (object) allowed properties are expires and debug

## listen

listen:(messageName:string, callback:function(data), options:object)

```js
listen(
  "AUTHENTICATION",
  (data) => {
    console.log(data)
  }
  { youngerThan: 300 }
): () => void
```

- messageName: (string) the name of the message
- callback: (function) a function to proceed the received data
- options: (object) allowed properties are expires and debug

Returns a function to unregister the listener
