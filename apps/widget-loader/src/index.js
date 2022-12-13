window.__junoWidgetLoader = { ...window.__junoWidgetLoader }

let currentScript = document.currentScript

// fall back for IE
if (!currentScript) {
  let scripts = document.getElementsByTagName("script")
  currentScript = scripts[scripts.length - 1]
}

const currentURL = new URL(currentScript.src)
let {
  name,
  version,
  url,
  origin,
  importmapOnly,
  importmapUrl,
  debug,
  ...props
} = currentScript.dataset

origin = origin || currentURL.origin
version = version || "latest"
debug = debug === "true"
importmapUrl = importmapUrl || `${origin}/importmap.json`

if (debug) {
  console.log(
    "===WIDGET LOADER: ",
    "name:",
    name,
    ", version: ",
    version,
    ", url:",
    url,
    ", origin: ",
    origin,
    ", importmapOnly: ",
    importmapOnly,
    ", importmapUrl: ",
    importmapUrl,
    ", props: ",
    props
  )
}

// load shim
let loadShim = new Promise((resolve, reject) => {
  const url =
    "https://ga.jspm.io/npm:es-module-shims@1.6.2/dist/es-module-shims.js"
  if (document.querySelector(`script[src="${url}"]`)) return resolve(true)

  window.process = { env: { NODE_ENV: "production" } }
  window.esmsInitOptions = {
    shimMode: true,
    mapOverrides: true,
  }

  const shimScriptTag = document.createElement("script")
  shimScriptTag.setAttribute("async", true)
  shimScriptTag.setAttribute("src", url)
  shimScriptTag.onload = (e) => resolve(true)
  shimScriptTag.onerror = () => reject("Could not load es-module-shim")
  document.head.append(shimScriptTag)
})

// load importmap
let loadImportmap = new Promise((resolve, reject) => {
  if (document.querySelector(`script[data-juno-importmap="${origin}"]`))
    return resolve(true)

  fetch(importmapUrl)
    .then((r) => r.json())
    .then((importmap) => {
      const script = document.createElement("script")
      script.setAttribute("type", "importmap-shim")
      script.setAttribute("data-juno-importmap", origin)
      script.text = JSON.stringify(importmap)
      document.head.append(script)
      resolve(true)
    })
    .catch((error) => reject(error))
})

// load widget after importmap has been loaded
Promise.all([loadShim, loadImportmap])
  .then(async () => {
    // return here if only the importmap was requested
    if (importmapOnly === "true") return

    // het the app URL
    // url can be given via data-url attribute on the widget script tag or
    // if not the widget loader tries to load get it from the manifest.json
    let appURL = url
    if (!appURL) {
      // window.__junoWidgetLoader[origin].manifest is the cache for the current
      // widget loader
      if (
        !window.__junoWidgetLoader[origin] ||
        !window.__junoWidgetLoader[origin].manifest
      ) {
        // load mainfest.json once
        await fetch(`${origin}/manifest.json`)
          .then((res) => res.json())
          .then(
            (manifest) => (window.__junoWidgetLoader[origin] = { manifest })
          )
      }

      if (
        debug &&
        (!window.__junoWidgetLoader[origin].manifest ||
          !window.__junoWidgetLoader[origin].manifest[name] ||
          !window.__junoWidgetLoader[origin].manifest[name][version])
      ) {
        console.log(
          `===WIDGET LOADER: could not find app ${name} with version ${version} in manifest`
        )
      }
      // final url
      appURL = new URL(
        window.__junoWidgetLoader[origin].manifest[name][version].entryFile,
        origin
      ).href
    }

    // get app props from the data-props-* arguments
    let appProps = { currentHost: url || origin }
    for (let key in props) {
      if (key.indexOf("props") === 0) {
        let newKey = key.replace("props", "")
        newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1)
        appProps[newKey] = props[key]
        // support old format -> the whole key to lowercase
        appProps[newKey.toLowerCase()] = props[key]
      }
    }

    // create a wrapper for the app
    const appWrapper = document.createElement("div")
    appWrapper.setAttribute("data-juno-app", name || url)
    appWrapper.setAttribute("style", "height: 100%;")

    // load the app via importShim
    if (debug) console.log(`===WIDGET LOADER: load ${appURL}`)
    importShim(appURL + "?" + Date.now())
      .then((app) => {
        const mount = app.mount || app.default
        mount(appWrapper, { props: appProps })
      })
      .catch((error) => console.warn(error.message))

    // finally replace the script tag with the wrapper element
    currentScript.replaceWith(appWrapper)
  })
  .catch((error) => console.log("===WIDGET LOADER", error))
