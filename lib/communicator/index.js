const COMMUNICATOR_NODE = window

// /**
//  * request data. It creates an custom event.
//  * @param {string} eventName
//  * @param {function} callback
//  * @example get("AUTH_GET_TOKEN", (token) => console.log(token))
//  */
// export function get(eventName, callback) {
//   console.info("COMMUNICATOR GET: ", eventName)
//   const event = new CustomEvent(eventName, {
//     detail: {
//       receiveResponse: callback,
//     },
//   })

//   COMMUNICATOR_NODE.dispatchEvent(event)
// }

// /**
//  * responds to a get event
//  * @param {string} eventName
//  * @param {function} callback
//  * @returns {function} remove listener
//  * @example onGet("AUTH_GET_TOKEN", (requestor) => requestor.receive("authToken"))
//  */
// export function onGet(eventName, callback) {
//   const handler = (e) => {
//     console.info("COMMUNICATOR ON GET: ", eventName)
//     if (e.detail && e.detail.receiveResponse && callback) {
//       callback({ receive: e.detail.receiveResponse })
//     }
//   }
//   COMMUNICATOR_NODE.addEventListener(eventName, handler)
//   return () => COMMUNICATOR_NODE.removeEventListener(eventName, handler)
// }

// /**
//  * responds to an event.
//  * @param {string} eventName
//  * @param {function} callback
//  * @returns {function} remove listener
//  * @example on("AUTH_UPDATE_TOKEN", (newToken) => console.log(newToken))
//  */
// export function on(eventName, callback) {
//   const handler = (e) => {
//     console.info("COMMUNICATOR ON: ", eventName)
//     callback(e.detail)
//   }

//   COMMUNICATOR_NODE.addEventListener(eventName, handler)
//   return () => COMMUNICATOR_NODE.removeEventListener(eventName, handler)
// }

// /**
//  * sends an event (broadcast)
//  * @param {string} eventName
//  * @param {object} payload
//  * @example send("AUTH_UPDATE_TOKEN", "NEW_TOKEN")
//  */
// export function send(eventName, payload) {
//   console.info("COMMUNICATOR SEND: ", eventName)
//   const event = new CustomEvent(eventName, {
//     detail: payload,
//   })

//   COMMUNICATOR_NODE.dispatchEvent(event)
// }

/**
 * responds to an event.
 * @param {string} eventName
 * @param {function} callback
 * @returns {function} remove listener
 * @example on("AUTH_UPDATE_TOKEN", ({authToken,token}) => console.log(token))
 * @example on("AUTH_GET_TOKEN", ({receiveResponse}) => receiveResponse("TOKEN"))
 */
export function on(eventName, callback) {
  const handler = (e) => {
    console.info("COMMUNICATOR ON: ", eventName)
    const receiveResponse =
      (e.detail && e.detail.receiveResponse) || (() => null)
    callback({ ...e.detail, receiveResponse })
  }

  COMMUNICATOR_NODE.addEventListener(eventName, handler)
  return () => COMMUNICATOR_NODE.removeEventListener(eventName, handler)
}

/**
 * sends an event (broadcast)
 * @param {string} eventName
 * @param {object} payload
 * @example send("AUTH_UPDATE_TOKEN", {token: "NEW_TOKEN"})
 * @example send("AUTH_GET_TOKEN", {receiveResponse: ({token}) => console.log(token)})
 */
export function send(eventName, payload) {
  console.info("COMMUNICATOR SEND: ", eventName, payload)
  const event = new CustomEvent(eventName, {
    detail: payload,
  })

  COMMUNICATOR_NODE.dispatchEvent(event)
}
