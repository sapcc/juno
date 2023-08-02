import LZString from "lz-string"

var SEARCH_KEY = "__s"
var URL_REGEX = new RegExp("[?&]" + SEARCH_KEY + "=([^&#]*)")

/**
 * Variable where to host listeners for history changes
 */
var onHistoryChangeListeners = {}
var onGlobalChangeListeners = []

/**
 * Encode json data using lz-string
 * @param {JSON} json data to be encoded
 * @returns encoded string
 */
function encode(json) {
  try {
    return LZString.compressToEncodedURIComponent(JSON.stringify(json))
  } catch (e) {
    console.warn("URL State Router: Could not encode data", data)
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
    console.warn("URL State Router: Could not decode string", string, e)
    return {}
  }
}

/**
 * find search param by key and convert it to json
 * @param {string} searchKey
 * @returns json
 */
function URLToState() {
  var match = window.location.href.match(URL_REGEX)
  if (!match) return {}
  return decode(match[1])
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
  var href = window.location.href
  var match = href.match(URL_REGEX)

  if (match) return href.replace(match[1], encodedState)

  return (
    href +
    (href.indexOf("?") >= 0 ? "&" : "?") +
    SEARCH_KEY +
    "=" +
    encodedState
  )
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
}
