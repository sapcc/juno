window.__junoBootstrap =
  window.__junoBootstrap ||
  async function () {
    let currentScript = document.currentScript

    // fall back for IE
    if (!currentScript) {
      let scripts = document.getElementsByTagName("script")
      currentScript = scripts[scripts.length - 1]
    }

    const currentURL = new URL(
      "https://cdn.ap.ws2.eu-nl-1.cloud.sap/apps/widget-loader@latest/build/app.js"
    )
    // const currentURL = new URL(currentScript.src)

    window.process = { env: { NODE_ENV: "production" } }
    window.esmsInitOptions = {
      shimMode: true,
    }

    let loadShim = new Promise((resolve, reject) => {
      const url =
        "https://ga.jspm.io/npm:es-module-shims@1.6.2/dist/es-module-shims.js"
      if (document.querySelector(`script[src="${url}"]`)) return resolve(true)

      const shimScriptTag = document.createElement("script")
      shimScriptTag.setAttribute("async", true)
      shimScriptTag.setAttribute("src", url)
      shimScriptTag.onload = (e) => resolve(true)
      shimScriptTag.onerror = () => reject("Could not load es-module-shim")
      document.head.append(shimScriptTag)
    })

    let loadImportmap = new Promise((resolve, reject) => {
      if (document.querySelector("script[data-juno-importmap]"))
        return resolve(true)

      fetch(`${currentURL.origin}/importmap.json`)
        .then((r) => r.json())
        .then((importmap) => {
          const script = document.createElement("script")
          script.setAttribute("type", "importmap-shim")
          script.setAttribute("data-juno-importmap", true)
          script.text = JSON.stringify(importmap)
          document.head.append(script)
          resolve(true)
        })
        .catch((error) => reject(error))
    })

    return Promise.all([loadShim, loadImportmap]).then(() => currentScript)
  }

window.__junoWidgetLoader =
  window.__junoWidgetLoader ||
  async function (currentScript) {
    const currentURL = new URL(currentScript.src)
    // console.log("==================", currentURL)
    const { name, version, url, debug, ...props } = currentScript.dataset

    if (debug) {
      console.log("===WIDGET LOADER")
      console.log("name:", name, "url:", url, "props: ", props)
    }

    let appProps = { currentHost: url || currentURL.origin }
    for (let key in props) {
      if (key.indexOf("props") === 0)
        appProps[key.replace("props", "").toLowerCase()] = props[key]
    }

    const appWrapper = document.createElement("div")
    appWrapper.setAttribute("data-juno-app", name || url)
    appWrapper.setAttribute("style", "height: 100%;")

    const endpoint = url
      ? url + "?" + Date.now()
      : `@juno/${name}@${version || "latest"}`

    importShim(endpoint)
      .then((app) => {
        const mount = app.mount || app.default
        mount(appWrapper, { props: appProps })
      })
      .catch((error) => console.warn(error.message))

    currentScript.replaceWith(appWrapper)
  }

window.__junoBootstrap().then(window.__junoWidgetLoader)
