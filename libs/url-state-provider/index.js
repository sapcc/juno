var LZString = require("lz-string")

var SEARCH_KEY = "__s"
var STATE_KEY = "__url_state_provider"
var URL_REGEX = new RegExp(`${SEARCH_KEY}=[^&]*`, "g")

/**
 * Encode json data using lz-string
 * @param {JSON} json data to be encoded
 * @returns encoded string
 */
function encode(json) {
  try {
    return LZString.compressToEncodedURIComponent(JSON.stringify(json))
  } catch (e) {
    console.info("URL State Router: Could not encode data", data)
    return ""
  }
}

/**
 * Decode using lz-string
 * @param {string} string to be decoded
 * @returns json
 */
function decode(string) {
  try {
    return JSON.parse(LZString.decompressFromEncodedURIComponent(string))
  } catch (e) {
    console.info("URL State Router: Could not decode string", string, e)
    return {}
  }
}

/**
 * find search param by key and convert it to json
 * @param {string} searchKey
 * @returns json
 */
function URLToState() {
  // get current search string from location
  var queryString = window.location.search
  // convert query string toURLSearchParam
  var params = queryString && new URLSearchParams(queryString)
  // find the state param
  var urlStateString = params && params.get(SEARCH_KEY)
  // decode the param or return an empty state
  return (urlStateString && decode(urlStateString)) || {}
}

/**
 * Converts state data to url string
 * @param {JSON} state data
 * @returns new url string with encoded data
 */
function stateToURL(state) {
  var stateParam = `${SEARCH_KEY}=${encode(state)}`

  var location = window.location.toString()
  var [url, searchParams] = location.split("?")
  if (!searchParams) searchParams = ""

  // remove last &
  searchParams.replace(/(.*)&+$/, "$1")

  if (searchParams.match(URL_REGEX)) {
    searchParams = searchParams.replace(URL_REGEX, stateParam)
  } else if (searchParams.match(/^.+=.*/)) {
    searchParams = searchParams + `&${stateParam}`
  } else {
    searchParams = stateParam
  }
  return url + "?" + searchParams
}

/**
 * Variable where to host the global state
 */
window[STATE_KEY] = window[STATE_KEY] || URLToState()
console.log("===========INITIAL STATE", window[STATE_KEY])

/**
 *
 * @param {string} stateID
 * @returns state for stateID
 */
function currentState(stateID) {
  return window[STATE_KEY][stateID]
}
/**
 *
 * @param {string} stateID a key of the state
 * @param {JSON} state
 * @returns new url string
 */
function updateState(stateID, state) {
  // update global state
  window[STATE_KEY][stateID] = state
  // convert global state to URL
  return stateToURL(window[STATE_KEY])
}

/**
 * Convert and push new state to the history
 * @param {string} stateID key of the specific state in the search params
 * @param {JSON} state
 * @param {Object} historyOptions options for the window.history (state, title)
 */
function push(stateID, state, historyOptions) {
  historyOptions = historyOptions || {}
  var newUrl = updateState(stateID, state)

  window.history.pushState(
    historyOptions.state || "",
    historyOptions.title || "",
    newUrl
  )

  informListener(stateID, state)
}

/**
 * Convert and replace new url in the history
 * @param {string} stateID key of the specific state in the search params
 * @param {JSON} state
 * @param {Object} historyOptions options for the window.history (state, title)
 */
function replace(stateID, state, historyOptions) {
  historyOptions = historyOptions || {}
  var newUrl = updateState(stateID, state)

  window.history.replaceState(
    historyOptions.state || "",
    historyOptions.title || "",
    newUrl
  )

  informListener(stateID, state)
}

/**
 * Variable where to host listeners for history changes
 */
var onHistoryChangeListeners = {}

/**
 * Add Listener for history changes for stateID
 * @param {string} stateID
 * @param {function} listener
 */
function addOnChangeListener(stateID, listener) {
  onHistoryChangeListeners[stateID] = listener
}

/**
 * Remove listener for stateID
 * @param {string} stateID
 */
function removeOnChangeListener(stateID) {
  delete onHistoryChangeListeners[stateID]
}

/**
 * Inform the listener that the condition has changed. If oldState is given,
 * this function compares the new state with the old one and only executes
 * the listener if they differ.
 * @param {string} stateID
 * @param {object} newState required
 * @param {object} oldState optional
 * @returns
 */
function informListener(stateID, newState, oldState) {
  var listener = onHistoryChangeListeners[stateID]
  if (!listener) return

  if (oldState) {
    // convert old and new states to strings and compare them
    if (JSON.stringify(oldState) === JSON.stringify(newState)) return
  }

  console.log("INFORM_LISTENER", stateID, newState)
  // inform listener
  listener(newState)
}

/**
 * Handle history pop events.
 * onpopstate is fired every time the browser back and forward buttons are clicked.
 * If the event is fired we update th global state to the state in URL and we inform
 * every listener but only if the individual state has changed.
 */
window.onpopstate = function () {
  // get current state from URL
  var state = URLToState()
  if (!state) return

  // save old state and update global state to the current url state
  var oldState = window[STATE_KEY]
  window[STATE_KEY] = state

  // get keys from listeners (key is stateID)
  var stateIDs = Object.keys(onHistoryChangeListeners)

  // for all keys in listeners
  for (var i = 0; i < stateIDs.length; i++) {
    var stateID = stateIDs[i]
    informListener(stateID, state[stateID], oldState[stateID])
  }
}

function registerConsumer(stateID) {
  return {
    currentState: function () {
      return currentState(stateID)
    },
    onChange: function (callback) {
      addOnChangeListener(stateID, callback)
      return function () {
        removeOnChangeListener(stateID)
      }
    },
    push: function (state, historyOptions) {
      console.log("PUSH", stateID, state)
      push(stateID, state, historyOptions)
    },
    replace: function (state, historyOptions) {
      console.log("REPLACE", stateID, state)
      replace(stateID, state, historyOptions)
    },
  }
}

module.exports = {
  currentState,
  push,
  replace,
  addOnChangeListener,
  removeOnChangeListener,
  registerConsumer,
}
