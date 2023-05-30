const CHANNEL_PREFIX = "JUNO_COMMUNICATOR#"

/**
 *
 * @returns epoch timestamp (count of seconds since 1970)
 */
const uniqString = () => Date.now() + ":" + Math.floor(Math.random() * 1000)

const log = (...params) =>
  console.log("Communicator Debug [" + CHANNEL_PREFIX + "]:", ...params)
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
const broadcast = (name, data, options) => {
  try {
    if (typeof name !== "string")
      throw new Error("(broadcast) the message name must be given.")
    if (data === undefined) data = null

    const { debug, ...unknownOptions } = options || {}
    const unknownOptionsKeys = Object.keys(unknownOptions)
    if (unknownOptionsKeys.length > 0)
      warn(`(broadcast) unknown options: ${unknownOptionsKeys.join(", ")}`)
    if (debug != undefined && typeof debug !== "boolean")
      warn("(broadcast) debug must be a boolean")
    const bc = new BroadcastChannel(CHANNEL_PREFIX + name)
    if (debug) log(`broadcast message ${name} with data `, data)

    // broadcast message
    bc.postMessage(data)
    bc.close()
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
const watch = (name, callback, options) => {
  try {
    if (typeof name !== "string")
      throw new Error("(watch) the message name must be given.")
    if (typeof callback !== "function")
      throw new Error("(watch) the callback parameter must be a function.")

    const { debug, ...unknownOptions } = options || {}
    const unknownOptionsKeys = Object.keys(unknownOptions)
    if (unknownOptionsKeys.length > 0)
      warn(`(watch) unknown options: ${unknownOptionsKeys.join(", ")}`)

    const bc = new BroadcastChannel(CHANNEL_PREFIX + name)
    if (debug) log(`watch for message ${name}`)

    bc.onmessage = (e) => callback(e.data)
    return () => bc.close()
  } catch (e) {
    error(e.message)
  }
}

/**
 * This function implements a 1:1 communication
 * @param {string} name
 * @param {function} callback
 * @param {object} options
 * @returns cancel function
 */
const get = (name, callback, options) => {
  try {
    if (typeof name !== "string")
      throw new Error("(get) the message name must be given.")
    if (typeof callback !== "function")
      throw new Error("(get) the callback parameter must be a function.")

    const { debug, getOptions, ...unknownOptions } = options || {}
    const unknownOptionsKeys = Object.keys(unknownOptions)
    if (unknownOptionsKeys.length > 0)
      warn(`(get) unknown options: ${unknownOptionsKeys.join(", ")}`)

    if (debug) log(`get data for message ${name}`)

    const requesterID = "GET:" + name
    const receiverID = requesterID + ":RESPONSE:" + uniqString()

    let unwatch = watch(receiverID, (data) => {
      callback(data)
      unwatch()
    })
    broadcast(requesterID, { receiverID, getOptions })
    return unwatch
  } catch (e) {
    error(e.message)
  }
}

/**
 * Listen to get messages
 * @param {string} name
 * @param {function} callback
 * @param {object} options
 * @returns cancel function
 */
const onGet = (name, callback, options = {}) => {
  try {
    if (typeof name !== "string")
      throw new Error("(onGet) the message name must be given.")
    if (typeof callback !== "function")
      throw new Error("(onGet) the callback parameter must be a function.")

    const { debug, ...unknownOptions } = options || {}
    const unknownOptionsKeys = Object.keys(unknownOptions)
    if (unknownOptionsKeys.length > 0)
      warn(`(onGet) unknown options: ${unknownOptionsKeys.join(", ")}`)

    if (debug) log(`send data for message ${name}`)

    const requesterID = "GET:" + name
    const unwatch = watch(requesterID, (data) => {
      if (!data?.receiverID) return
      broadcast(data.receiverID, callback())
    })

    return unwatch
  } catch (e) {
    error(e.message)
  }
}

export { broadcast, watch, get, onGet }
