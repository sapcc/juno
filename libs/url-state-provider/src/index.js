import LZString from "lz-string"
import JsonURL from "@jsonurl/jsonurl"

var SEARCH_KEY = "__s"
var URL_REGEX = new RegExp("[?&]" + SEARCH_KEY + "=([^&#]*)")

/**
 * Variable where to host listeners for history changes
 */
var onHistoryChangeListeners = {}
var onGlobalChangeListeners = []

/**
 * Encode json data using json-url or lz-string. It automatically detects the best encoding.
 * @param {JSON} json data to be encoded
 * @param {Object} options options for the encoding. Possible values: mode: "auto" or "humanize"
 * @returns encoded string
 */
function encode(json, options = {}) {
  try {
    let urlState = JsonURL.stringify(json, {
      AQF: true,
      //impliedStringLiterals: true,
      ignoreNullArrayMembers: true,
      ignoreNullObjectMembers: true,
    })
    if (options?.mode === "humanize") return urlState

    if (urlState.length > 1800) {
      urlState = LZString.compressToEncodedURIComponent(JSON.stringify(json))
    }
    //return LZString.compressToEncodedURIComponent(JSON.stringify(json))
    return urlState
  } catch (e) {
    console.warn("URL State Router: Could not encode data", data)
    return ""
  }
}

/**
 * Decode using json-url or lz-string. It automatically detects the encoding.
 * @param {string} string to be decoded
 * @returns json
 */
function decode(string) {
  try {
    // try to decode as jsonurl
    let json = JsonURL.parse(string, { AQF: true })

    // if parsed value is an object, return it
    if (json && typeof json === "object") return json

    // try to decode as lz-string
    return JSON.parse(LZString.decompressFromEncodedURIComponent(string))
  } catch (e) {
    console.warn("URL State Router: Could not decode string: ", string, e)
    return {}
  }
}

/**
 * find search param by key and convert it to json
 * @param {string} searchKey
 * @returns json
 */
function URLToState() {
  var urlStateParam = new URLSearchParams(window.location.search).get(
    SEARCH_KEY
  )
  if (!urlStateParam) return {}
  return decode(urlStateParam)
}

/**
 * Converts state data to query param
 * @param {JSON} state data
 * @returns new query param string with encoded data
 */
function stateToQueryParam(state) {
  var encodedState = encode(state)
  return SEARCH_KEY + "=" + encodedState
}

/**
 * Converts state data to url string
 * @param {JSON} state data
 * @returns new url string with encoded data
 */
function stateToURL(state) {
  var encodedState = encode(state)
  var newUrl = new URL(window.location.href)
  newUrl.searchParams.set(SEARCH_KEY, encodedState)
  return decodeURIComponent(newUrl.toString())
}

/**
 *
 * @param {string} stateID
 * @returns state for stateID
 */
function currentState(stateID) {
  return URLToState()[stateID]
}

/**
 *
 * @param {string} stateID a key of the state
 * @param {JSON} state
 * @returns new url string
 */
function updateState(stateID, state, options = {}) {
  // get current state from URL
  const newState = URLToState()
  // change state, overwrite or merge if "merge" option is true
  newState[stateID] = options?.merge
    ? { ...newState[stateID], ...state }
    : state

  // inform listeners for all changes in the url
  onGlobalChangeListeners.forEach((listener) => listener(newState))

  // convert to url
  return stateToURL(newState)
}

/**
 * Push new state. The old and the new state are merged.
 * @param {string} stateID key of the specific state in the search params
 * @param {JSON} state
 * @param {boolean} merge if true, the old and the new state are merged
 * @param {Object} historyOptions options for the window.history (state, title)
 * @param {boolean} historyOptions.state - The state object is a JavaScript object which is
 * associated with the new history entry created by pushState(). Whenever the user navigates to the new
 * state, a popstate event is fired, and the state property of the event contains a copy of the history
 * entry's state object.
 * @param {string} historyOptions.title - Most browsers currently ignores this parameter, although
 * they may use it in the future. Passing the empty string here should be safe against future
 * changes to the method.
 * @param {boolean} historyOptions.replace - If true it replaces the last state in the window history (default false).
 */
function updateStateAndHistory(stateID, state, merge, historyOptions) {
  historyOptions = historyOptions || {}
  const newUrl = updateState(stateID, state, { merge })
  const historyState = historyOptions.state || ""
  const historyTitle = historyOptions.title || ""

  if (historyOptions?.replace) {
    window.history.replaceState(historyState, historyTitle, newUrl)
  } else {
    window.history.pushState(historyState, historyTitle, newUrl)
  }
}

/**
 * Push new state. The old and the new state are merged.
 * @param {string} stateID key of the specific state in the search params
 * @param {JSON} state
 * @param {Object} historyOptions options for the window.history (state, title)
 * @param {boolean} historyOptions.state - The state object is a JavaScript object which is
 * associated with the new history entry created by pushState(). Whenever the user navigates to the new
 * state, a popstate event is fired, and the state property of the event contains a copy of the history
 * entry's state object.
 * @param {string} historyOptions.title - Most browsers currently ignores this parameter, although
 * they may use it in the future. Passing the empty string here should be safe against future
 * changes to the method.
 * @param {boolean} historyOptions.replace - If true it replaces the last state in the window history (default false).
 */
function push(stateID, state, historyOptions) {
  updateStateAndHistory(stateID, state, true, historyOptions)
}

/**
 * Replace state. The old state is overwritten.
 * @param {string} stateID key of the specific state in the search params
 * @param {JSON} state
 * @param {Object} historyOptions options for the window.history (state, title)
 * @param {boolean} historyOptions.state - The state object is a JavaScript object which is
 * associated with the new history entry created by pushState(). Whenever the user navigates to the new
 * state, a popstate event is fired, and the state property of the event contains a copy of the history
 * entry's state object.
 * @param {string} historyOptions.title - Most browsers currently ignores this parameter, although
 * they may use it in the future. Passing the empty string here should be safe against future
 * changes to the method.
 * @param {boolean} historyOptions.replace - If true it replaces the last state in the window history (default false).
 */
function replace(stateID, state, historyOptions) {
  updateStateAndHistory(stateID, state, false, historyOptions)
}

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
 * Add Listener for all changes to the state
 * @param {function} listener
 * @returns function to remove the listener
 */
function addOnGlobalChangeListener(listener) {
  onGlobalChangeListeners.push(listener)
  return () => {
    const index = onGlobalChangeListeners.indexOf(listener)
    if (index > -1) {
      onGlobalChangeListeners.splice(index, 1)
    }
  }
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

  //console.log("INFORM_LISTENER", stateID, newState)
  // inform listener
  listener(newState)
}

function onGlobalChange(callback) {
  return addOnGlobalChangeListener(callback)
}

/**
 * Handle history pop events.
 * onpopstate is fired every time the browser back and forward buttons are clicked.
 * If the event is fired we update th global state to the state in URL and we inform
 * every listener but only if the individual state has changed.
 */
window.addEventListener("popstate", function (event) {
  const newUrl = event.target.location.href
  const state = URLToState(newUrl)
  Object.keys(state).forEach((stateID) => {
    informListener(stateID, state[stateID])
  })
})

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
    onGlobalChange,
    push: function (state, historyOptions) {
      //console.log("PUSH", stateID, state)
      push(stateID, state, historyOptions)
    },
    replace: function (state, historyOptions) {
      //console.log("REPLACE", stateID, state)
      replace(stateID, state, historyOptions)
    },
  }
}

export {
  currentState,
  push,
  replace,
  addOnChangeListener,
  removeOnChangeListener,
  registerConsumer,
  stateToURL,
  stateToQueryParam,
  onGlobalChange,
  decode,
  encode,
}
