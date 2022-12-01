const COMMUNICATOR_NODE = window

/**
 * responds to an event.
 * @param {string} eventName
 * @param {function} callback
 * @returns {function} remove listener
 * @example on("AUTH_UPDATE_TOKEN", ({authToken,token}) => console.log(token))
 * @example on("AUTH_GET_TOKEN", ({receiveResponse}) => receiveResponse("TOKEN"))
 */
function on(eventName, callback) {
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
function send(eventName, payload) {
  console.info("COMMUNICATOR SEND: ", eventName, payload)
  const event = new CustomEvent(eventName, {
    detail: payload,
  })

  COMMUNICATOR_NODE.dispatchEvent(event)
}

module.exports = { send, on }
