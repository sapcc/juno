class StorageError extends Error {
  constructor(message, options) {
    // Need to pass `options` as the second parameter to install the "cause" property.
    super("Communicator Storage Error: " + message, options)
  }
}

/**
 *
 * @param {string} ID it is used as message prefix
 * @returns {object} contains set and get methods
 */
const Storage = (ID) => {
  // custom logger function
  const log = (...params) => console.log(ID, ...params)

  /**
   *
   * @param {string} name message name
   * @param {any} payload message data
   * @param {object} options allowed options are debug and expires:seconds
   */
  const set = (name, payload, options) => {
    if (typeof name !== "string")
      throw new StorageError("(set) the message name must be given.")
    if (payload === undefined)
      throw new StorageError(
        "(set) the message data must be given (null is allowed)."
      )

    const debug = options?.debug
    try {
      if (debug) log(`store ${name}`, payload)

      localStorage.setItem(ID + name, JSON.stringify(payload))
    } catch (e) {
      if (debug) log(`could not store ${key}`, e)
    }
  }

  /**
   *
   * @param {string} name name of the message
   * @param {object} options allowed props are debug
   * @returns message data
   */
  const get = (name, options) => {
    if (typeof name !== "string")
      throw new StorageError("(get) the message name must be given.")
    const debug = options?.debug

    try {
      let item = localStorage.getItem(ID + name)
      if (!item) {
        if (debug) log("no message for name " + name + " found")
        return null
      }
      const message = JSON.parse(item)
      if (debug) log("stored data ", message)

      return message
    } catch (e) {
      if (debug) log("ERROR", e)
      return null
    }
  }

  return { get, set }
}
export default Storage
