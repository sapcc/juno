window.__junoWidgetLoader = { ...window.__junoWidgetLoader }

let currentScript = document.currentScript

// fall back for IE
if (!currentScript) {
  let scripts = document.getElementsByTagName("script")
  currentScript = scripts[scripts.length - 1]
}

const currentURL = new URL(currentScript.src)
let { name, version, url, origin, importmapOnly, debug, ...props } =
  currentScript.dataset

origin = origin || currentURL.origin

if (debug) {
  console.log("===WIDGET LOADER")
  console.log(
    "name:",
    name,
    "url:",
    url,
    "props: ",
    "origin: ",
    origin,
    "importmapOnly: ",
    importmapOnly,
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

  fetch(`${origin}/importmap.json`)
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
Promise.all([loadShim, loadImportmap]).then(async () => {
  if (importmapOnly === "true") return

  if (!url && !window.__junoWidgetLoader[origin]) {
    await fetch(`${origin}/manifest.json`)
      .then((res) => res.json())
      .then(
        (manifest) => (window.__junoWidgetLoader[origin].manifest = manifest)
      )
  }

  let appURL =
    url ||
    window.__junoWidgetLoader[origin].manifest[name][version || "latest"]
      .entryFile

  let appProps = { currentHost: url || origin }
  for (let key in props) {
    if (key.indexOf("props") === 0)
      appProps[key.replace("props", "").toLowerCase()] = props[key]
  }

  const appWrapper = document.createElement("div")
  appWrapper.setAttribute("data-juno-app", name || url)
  appWrapper.setAttribute("style", "height: 100%;")

  importShim(appURL + "?" + Date.now())
    .then((app) => {
      const mount = app.mount || app.default
      mount(appWrapper, { props: appProps })
    })
    .catch((error) => console.warn(error.message))

  currentScript.replaceWith(appWrapper)
})
