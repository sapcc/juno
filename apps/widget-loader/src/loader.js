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
 * This hook creates and adds a script tag to the head.
 * After the unmount, the script tag is automatically removed.
 * @param {string} url
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
    console.log(factory)
    const Module = factory()
    return Module
  }
}

export const load = () => {
  let scripts = document.getElementsByTagName("script")
  let currentScript = scripts[scripts.length - 1]

  if (!currentScript?.dataset?.url) return
  const wrapper = document.createElement("div")
  currentScript.replaceWith(wrapper)

  loadDynamicScript(currentScript.dataset.url)
    .then(() => {
      const [scope, module] = currentScript.dataset.name.split("/")
      return loadComponent(scope, `./${module}`)()
    })
    .then((loadWidget) => {
      loadWidget.default(wrapper)
    })
    .catch((e) => console.log(e))
}
