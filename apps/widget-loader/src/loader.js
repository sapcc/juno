// __webpack_public_path__ = window.location.origin

/**
 * Returns a hash code for a string.
 * (Compatible to Java's String.hashCode())
 *
 * The hash code for a string object is computed as
 *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * @param {string} s a string
 * @return {number} a hash code value for the given string.
 */
const hashCode = (s) => {
  var h = 0,
    l = s.length,
    i = 0
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0
  return h
}

/**
 * Converts a string to var name
 * @param {string} string
 */
function toVarName(str) {
  return str.replace(/(-|\/)(\w)/g, (word) => word[1].toUpperCase())
}

/**
 * This hook creates and adds a script tag to the head.
 * After the unmount, the script tag is automatically removed.
 * @param {string} url
 * @return {Promise}
 */
const loadDynamicScript = (url) => {
  const elementId = hashCode(url)

  let element = document.getElementById(elementId)
  if (!element) {
    element = document.createElement("script")
    element.id = elementId
    element.src = url
    element.type = "text/javascript"
    element.async = true
    document.head.appendChild(element)
  }

  return new Promise((resolve, reject) => {
    // script with this url already exists
    if (element.dataset.loaded) {
      // script already loaded
      resolve()
    } else {
      // add onload listener
      element.addEventListener("load", () => {
        resolve()
        element.setAttribute("data-loaded", true)
      })
      element.addEventListener("error", reject)
    }
  })
}

/**
 * Connect dynamically a remote container.
 * @see https://webpack.js.org/concepts/module-federation/#motivation
 * @param {string} scope library name in remote container
 * @param {string} module exposed module in remote container
 */
function loadComponent(scope, module) {
  return async () => {
    // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default")

    const container = window[scope] // or get the container somewhere else

    if (!container) return null
    try {
      // Initialize the container, it may provide shared modules
      await container.init(__webpack_share_scopes__.default)
    } catch (e) {
      if (e.message.indexOf("already been initialized") < 0)
        console.info("ERROR", e)
    }

    const factory = await window[scope].get(module)
    const Module = factory()
    return Module
  }
}

/**
 * Extract data from element
 * data-url
 * data-name
 * data-version
 * data-scope
 * data-module
 *
 * Required data is data-url or data-name and data-version
 * @param {documentElement} script
 */
const extractDataFromScript = (script) => {
  const data = script?.dataset
  // return if no script found or dataset is undefined
  if (!data) return {}

  let { scope, name, version, module, url } = data

  if (url) {
    // widget url is provided -> try to match name and version
    const path = url.replace(/https?:\/\//, "").replace(/^[^\/]*(.*$)/, "$1")
    const found = path.match(/^\/([^/]+)\/([^/]+)\/.*$/)
    if (found) {
      name = name || found[1]
      version = version || found[2]
    }
  }

  if (!name) return {}
  // scope is variable name where the remote entry (widget) is hosted
  // we assume that the scope is name is the same as the app name.
  scope = scope || toVarName(name)
  // module is the name of exposed widget module
  // we assume that the default module name is widget
  module = module || "widget"

  if (!url) {
    // url is not provided -> build it from provided data
    const host = script.src.match(/^(https?:\/\/[^/]+).*?$/)
    if (host) url = `${host[1]}/${name}/${version}/widget.js`
  }

  return { scope, name, version, module, url }
}

const extractPropsFromScript = (script) => {
  if (!script?.dataset) return {}
  let props = {}
  for (let key in script?.dataset) {
    if (key.indexOf("props") === 0)
      props[key.replace("props", "").toLowerCase()] = script?.dataset[key]
  }

  return props
}

export const load = (currentScript) => {
  try {
    if (!currentScript) return

    let { scope, name, version, module, url } =
      extractDataFromScript(currentScript)

    // do not accept name widget-loader or missing required data
    if (
      name === "widget-loader" ||
      !(scope && name && version && module && url)
    ) {
      console.log("Could not load widget", currentScript)
      //currentScript.remove()
      return
    }

    console.info("Load widget!")
    console.info(
      "url:",
      url,
      "scope:",
      scope,
      "name:",
      name,
      "version:",
      version,
      "module:",
      module
    )
    const props = extractPropsFromScript(currentScript)
    const wrapper = document.createElement("div")
    wrapper.setAttribute("data-name", name)
    wrapper.setAttribute("data-version", version)
    currentScript.replaceWith(wrapper)

    console.log("===", url, scope, module)
    loadDynamicScript(url)
      .then(() => {
        return loadComponent(scope, `./${module}`)()
      })
      .then((Module) => {
        Module.default(wrapper, props)
      })
      .catch((e) => console.log(e))
  } catch (e) {
    console.log("ERROR", e)
  }
}
