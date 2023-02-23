# Communicator Interface


This documentation describes the interface for communicating with the outside world. This app uses the juno lib communicator which provides four methods for sending messages and listening for messages.


 - **broadcast**, send a message to the whole world
 - **watch**, listen for a message
 - **get**, request a message and wait for the reply (one to one communication)
 - **onGet**, listen for and reply to get messages


These methods are always to be considered in pairs as opponents.<br/>**broadcast <-> watch**<br/>**get <-> onGet**


For example, if an app sends a message with **broadcast**, then this message can be received with **watch**. And correspondingly, **get** requests are answered with **onGet**. Where **get** is answered directly (one to one).


All messages sent or consumed by this app are listed here

> This documentation was generated automatically based on all communication calls found in auth.

## broadcast


 - **AUTH_UPDATE_DATA**


How to use

```js
watch("AUTH_UPDATE_DATA", (data) => {/* handle data here */})
```

## watch


 - **AUTH_LOGIN**
 - **AUTH_LOGOUT**


How to use

```js
broadcast("AUTH_LOGIN", { /*data*/ } )
broadcast("AUTH_LOGOUT", { /*data*/ } )
```

## onGet


 - **AUTH_GET_DATA**


How to use

```js
get("AUTH_GET_DATA", (data) => {/* handle data here */})
```
