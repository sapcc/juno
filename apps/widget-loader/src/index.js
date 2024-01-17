import maxSatisfying from "semver/ranges/max-satisfying"
;(async function () {
  window.process = { env: { NODE_ENV: "production" } }
  window.esmsInitOptions = {
    shimMode: true,
    mapOverrides: true,
  }

  const JUNO_IMPORTMAP_LOADED_EVENT = "JUNO_IMPORTMAP_LOADED"
  const currentScript = document.currentScript
  const widgetLoaderUrl = new URL(currentScript.src)

  let {
    name,
    version = "latest",
    url,
    origin = widgetLoaderUrl.origin,
    importmapOnly,
    showLoading,
    debug,
    ...props
  } = currentScript.dataset

  // DEBUG
  if (debug === "true") {
    console.log("===WIDGET LOADER: params", {
      name,
      version,
      url,
      origin,
      importmapOnly,
      showLoading,
      debug,
      props,
    })
  }

  window.__JUNO_WIDGET_LOADER = window.__JUNO_WIDGET_LOADER || { [origin]: {} }
  window.__JUNO_WIDGET_LOADER[origin] =
    window.__JUNO_WIDGET_LOADER[origin] || {}
  const store = window.__JUNO_WIDGET_LOADER[origin]

  // create load Importmap Promise and cache it
  store.loadImportmap =
    store.loadImportmap ||
    new Promise((resolve, reject) => {
      // console.log("load shim", origin)
      const shimUrl = new URL(
        "/externals/npm:es-module-shims@1.6.2/dist/es-module-shims.js",
        origin
      )

      if (document.querySelector(`script[src="${shimUrl}"]`)) {
        return resolve(true)
      } else {
        document.head.appendChild(
          Object.assign(document.createElement("script"), {
            async: true,
            src: shimUrl,
            onload: resolve,
            onerror: reject,
          })
        )
      }
    }).then(() => {
      //######################## Load Importmap
      // console.log("load importmap", origin)
      const importmapUrl = new URL("/importmap.json", origin)

      return fetch(importmapUrl)
        .then((r) => r.json())
        .then((importmap) => {
          document.head.appendChild(
            Object.assign(document.createElement("script"), {
              type: "importmap-shim",
              innerHTML: JSON.stringify(importmap),
            })
          )
          // this works too
          // importShim.addImportMap(importmap)

          return importmap
        })
    })

  // create load Available Versions Promise and cache it
  store.loadAvailableVersions =
    store.loadAvailableVersions ||
    function (importmap) {
      return new Promise((resolve, reject) => {
        const result = {}
        // extract all avail
        Object.keys(importmap.imports).forEach((key) => {
          const match = key.match(/^@(?:juno|asset)\/([^@]+)@([^\/]+).*$/)
          if (match) {
            const version = match[2] === "latest" ? "*" : match[2]
            result[match[1]] = result[match[1]] || []
            if (result[match[1]].indexOf(version) === -1)
              result[match[1]].push(version)
          }
        })
        resolve(result)
      })
    }

  // wait until the loadImportmap promise is resolved
  const importmap = await store.loadImportmap
  // console.log("===============shim loaded", name)
  const availableVersions = await store.loadAvailableVersions(importmap)

  // broadcast custom event
  window.dispatchEvent(new CustomEvent(JUNO_IMPORTMAP_LOADED_EVENT))

  if (importmapOnly === "true" || importmap === true) return

  // APP LOADER
  // determine the version
  console.debug("availableVersions", availableVersions)
  version = maxSatisfying(
    availableVersions[name],
    version === "latest" ? "*" : version
  )

  // get the app URL
  // from given url or from importmap based on name and version
  let appURL = url || importmap.imports[`@juno/${name}@${version}`]

  // get app props from the data-props-* arguments
  let appProps = { currentHost: new URL(appURL).href }
  for (let key in props) {
    if (key.indexOf("props") === 0) {
      let newKey = key.replace("props", "")
      newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1)
      let value = props[key]
      // parse boolean values
      if (value === "true") value = true
      if (value === "false") value = false
      appProps[newKey] = value
      // support old format -> the whole key to lowercase
      appProps[newKey.toLowerCase()] = props[key]
    }
  }

  // create a wrapper for the app
  const appWrapper = document.createElement("div")
  appWrapper.setAttribute("data-juno-app", name || url)
  appWrapper.setAttribute("style", "display: inline;")
  if (showLoading) appWrapper.textContent = "Loading..."

  // load the app via importShim
  if (debug) console.log(`===WIDGET LOADER: load ${appURL}`)

  importShim(appURL)
    .then((app) => {
      const mount = app.mount || app.default
      mount(appWrapper, { props: appProps })
    })
    .catch((error) => console.warn(error.message))

  // finally replace the script tag with the wrapper element
  currentScript.replaceWith(appWrapper)
})().catch((e) => console.warn("WIDGET LOADER:", e))
