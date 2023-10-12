const CHANNEL_PREFIX = "JUNO_COMMUNICATOR#"

/**
 *
 * @returns epoch timestamp (count of seconds since 1970)
 */
const uniqString = () => Math.random().toString(36).substring(2)

const log = (...params) =>
  console.log("Communicator Debug [" + CHANNEL_PREFIX + "]:", ...params)
const warn = (...params) => console.warn("Communicator Warning:", ...params)
const error = (...params) => console.error("Communicator Error:", ...params)

// create an uniq id for current window (current context)
// this id is used to identify the current when intra-window communication is used
window.__juno_communicator_tab_id =
  window.__juno_communicator_tab_id || uniqString()

console.log("===", window.__juno_communicator_tab_id, "===")
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

    const { debug, crossWindow = false, ...unknownOptions } = options || {}
    const unknownOptionsKeys = Object.keys(unknownOptions)
    if (unknownOptionsKeys.length > 0)
      warn(`(broadcast) unknown options: ${unknownOptionsKeys.join(", ")}`)
    if (debug != undefined && typeof debug !== "boolean")
      warn("(broadcast) debug must be a boolean")
    if (typeof crossWindow !== "boolean")
      warn("(broadcast) crossWindow must be a boolean")

    let channelName = CHANNEL_PREFIX + name
    if (crossWindow === false) {
      channelName = `${window.__juno_communicator_tab_id}:${channelName}`
    }
    let bc = new BroadcastChannel(channelName)

    if (debug)
      log(
        `broadcast message ${name} ${
          crossWindow ? "cross-window" : "intra-window"
        } with data `,
        data
      )

    bc.postMessage({ payload: data, source: window.__juno_communicator_tab_id })
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

    const { debug, crossWindow = false, ...unknownOptions } = options || {}
    const unknownOptionsKeys = Object.keys(unknownOptions)
    if (unknownOptionsKeys.length > 0)
      warn(`(watch) unknown options: ${unknownOptionsKeys.join(", ")}`)

    let channelName = CHANNEL_PREFIX + name

    if (debug)
      log(
        `watch for ${
          crossWindow ? "cross-window" : "intra-window"
        } message ${name}`
      )

    // listen to cross-window messages if crossWindow is true
    let bc
    if (crossWindow === true) {
      bc = new BroadcastChannel(channelName)
      bc.onmessage = (e) => {
        callback(e.data?.payload, {
          sourceWindowId: e.data?.source,
          thisWindowId: window.__juno_communicator_tab_id,
        })
      }
    }

    // listen ever for intra-window messages
    let bcIntra = new BroadcastChannel(
      `${window.__juno_communicator_tab_id}:${channelName}`
    )
    bcIntra.onmessage = (e) => {
      callback(e.data, {
        sourceWindowId: e.data?.source,
        thisWindowId: window.__juno_communicator_tab_id,
      })
    }

    return () => {
      if (bc) bc.close()
      bcIntra.close()
    }
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
    const {
      debug,
      getOptions,
      crossWindow = false,
      ...unknownOptions
    } = options || {}
    const unknownOptionsKeys = Object.keys(unknownOptions)
    if (unknownOptionsKeys.length > 0)
      warn(`(get) unknown options: ${unknownOptionsKeys.join(", ")}`)
    if (debug)
      log(
        `get data for ${
          crossWindow ? "cross-window" : "intra-window"
        } message ${name}`
      )

    let channelName = CHANNEL_PREFIX + name
    if (crossWindow === false) {
      channelName = `${window.__juno_communicator_tab_id}:${channelName}`
    }
    const requesterID = channelName + ":GET"
    const receiverID = channelName + requesterID + ":RESPONSE:" + uniqString()

    // create a listener for the response
    let receiver = new BroadcastChannel(receiverID)
    receiver.onmessage = (e) => {
      callback(e.payload?.data, {
        sourceWindowId: e.data?.source,
        thisWindowId: window.__juno_communicator_tab_id,
      })
      //receiver.close()
    }

    // create broadcast channel for the request
    let requester = new BroadcastChannel(requesterID)
    requester.postMessage({
      payload: { receiverID, getOptions },
      source: window.__juno_communicator_tab_id,
    })
    requester.close()

    // return cancel function
    // close receiver before his onmessage is called
    return () => {
      receiver.close()
    }
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
    const { debug, crossWindow = false, ...unknownOptions } = options || {}
    const unknownOptionsKeys = Object.keys(unknownOptions)
    if (unknownOptionsKeys.length > 0)
      warn(`(onGet) unknown options: ${unknownOptionsKeys.join(", ")}`)
    if (debug)
      log(
        `send data for ${
          crossWindow ? "cross-window" : "intra-window"
        } message ${name}`
      )

    let channelName = CHANNEL_PREFIX + name
    if (crossWindow === false) {
      channelName = `${window.__juno_communicator_tab_id}:${channelName}`
    }

    // request channel name, should be the same as the one used in get
    const requesterID = channelName + ":GET"
    // create receiver broadcast channel
    const receiver = new BroadcastChannel(requesterID)

    receiver.onmessage = (e) => {
      if (!e.data?.payload?.receiverID) return
      const { receiverID, getOptions } = e.data?.payload
      const data = callback(getOptions, {
        sourceWindowId: e.data?.source,
        thisWindowId: window.__juno_communicator_tab_id,
      })

      // send data back to get requester
      const bc = new BroadcastChannel(receiverID)
      bc.postMessage({
        payload: data,
        source: window.__juno_communicator_tab_id,
      })
      bc.close()
    }

    // return cancel function
    // close receiver before his onmessage is called
    return () => {
      receiver.close()
    }
  } catch (e) {
    error(e.message)
  }
}

export { broadcast, watch, get, onGet }
