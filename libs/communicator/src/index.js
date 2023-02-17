import Storage from "./storage"

const ID = "JUNO_COMMUNICATOR:"
const { get: getStoredMessage, set: storeMessage } = Storage(ID)

/**
 *
 * @returns epoch timestamp (count of seconds since 1970)
 */
const timeStamp = () => Math.floor(Date.now() / 1000)

const log = (...params) =>
  console.log("Communicator Debug [" + ID + "]:", ...params)
const warn = (...params) => console.warn("Communicator Warning:", ...params)
const error = (...params) => console.error("Communicator Error:", ...params)

/**
 * Send messages via BroadcastChannel across contexts (e.g. several tabs on
 * the same origin). The last message is stored by default. However, it
 * is possible to influence the storage period using the expire option.
 * @param {string} name
 * @param {any} data
 * @param {object} options (optional) allowed options are debug:undefined|boolean and expires:undefined|number
 * @returns void
 */
const send = (name, data, options) => {
  try {
    if (typeof name !== "string")
      throw new Error("(send) the message name must be given.")
    if (data == undefined)
      throw new Error(
        "(send) the message data must be given (null is allowed)."
      )
    const { expires, debug } = options || {}
    if (expires != undefined && typeof expires !== "number")
      warn("(send) expires must be a number (epoch timestamp)")
    const bc = new BroadcastChannel(ID + name)
    if (debug) log(`send message ${name} with data `, data)

    // broadcast message
    bc.postMessage(data)
    bc.close() 
    // store message
    storeMessage(name, { data, expires, updatedAt: timeStamp() }, { debug })
  } catch (e) {
    error(e.message)
  }
}

/**
 * Register a listener for a specific message. Messages are observed
 * across contexts (e.g. several tabs on the same origin).
 * If a current saved message already exists for the name,
 * then the listener is executed immediately with this message.
 * The expires option set by the "send" method has an effect here.
 * In addition, the age of the listened messages can be determined
 * with the youngerThan option.
 * @param {string} name
 * @param {function} callback:(data) => void
 * @param {object} options
 * @returns {function} unregister:()=>void, a function to stop listening
 */
const listen = (name, callback, options) => {
  try {
    if (typeof name !== "string")
      throw new Error("(listen) the message name must be given.")
    if (typeof callback !== "function")
      throw new Error("(listen) the callback parameter must be a function.")

    const { youngerThan, debug, ...otherOptions } = options || {}

    if (otherOptions && Object.keys(otherOptions).length > 0)
      warn(`(listen) unknown options: ${Object.keys(otherOptions)}`)
    if (youngerThan != undefined && typeof youngerThan !== "number")
      warn("(listen) youngerThan option must be a boolean or number")

    const bc = new BroadcastChannel(ID + name)

    const message = getStoredMessage(name, { debug })
    if (message) {
      const { data, expires, updatedAt } = message
      const now = timeStamp()
      // send last stored message until expired or too old
      if (
        (!expires || expires > now) &&
        (!youngerThan || now - updatedAt <= youngerThan)
      ) {
        if (debug) log("(listen): receive last stored message")
        callback(data)
      }
    }

    bc.onmessage = (e) => callback(e.data)
    return () => bc.close()
  } catch (e) {
    error(e.message)
  }
}

export { send, listen }
