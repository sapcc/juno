window.__junoBootstrap =
  window.__junoBootstrap ||
  async function () {
    // //return import("./apps/shell/index.js")
    window.process = { env: { NODE_ENV: "production" } }
    // window.esmsInitOptions = {
    //   shimMode: true,
    // }
    // if (
    //   !document.querySelector(
    //     'script[src="https://ga.jspm.io/npm:es-module-shims@1.6.2/dist/es-module-shims.js"]'
    //   )
    // ) {
    //   const shimScriptTag = document.createElement("script")
    //   shimScriptTag.setAttribute("async", true)
    //   shimScriptTag.setAttribute(
    //     "src",
    //     "https://ga.jspm.io/npm:es-module-shims@1.6.2/dist/es-module-shims.js"
    //   )
    //   document.head.append(shimScriptTag)
    // }
    // if (!document.querySelector("script[data-juno-importmap]")) {
    //   const importmapScriptTag = await fetch(
    //     "https://cdn.ap.ws2.eu-nl-1.cloud.sap/v2/importmap.json"
    //   )
    //     .then((r) => r.json())
    //     .then((importmap) => {
    //       const script = document.createElement("script")
    //       script.setAttribute("type", "importmap-shim")
    //       script.setAttribute("data-juno-importmap", true)
    //       script.text = JSON.stringify(importmap)
    //       return script
    //     })
    //   document.head.append(importmapScriptTag)
    // }
  }

window.__junoWidgetLoader =
  window.__junoWidgetLoader ||
  async function () {
    let currentScript = document.currentScript

    // fall back for IE
    if (!currentScript) {
      let scripts = document.getElementsByTagName("script")
      currentScript = scripts[scripts.length - 1]
    }

    // TODO: fetch manifest from assets server to get the right path
    const currentURL = new URL(currentScript.src)

    const { name, version, url, debug, ...props } = currentScript.dataset

    const appURL = url
      ? new URL(url)
      : new URL(window.location.origin + `/${name}/${version}/index.js`)

    if (debug) {
      console.log("===WIDGET LOADER")
      console.log("name:", name, "url:", url, "props: ", props)
    }

    let appProps = { currentHost: appURL?.origin }
    for (let key in props) {
      if (key.indexOf("props") === 0)
        appProps[key.replace("props", "").toLowerCase()] = props[key]
    }

    // import(appURL).then((app) => console.log("==APP", app))
    const appWrapper = document.createElement("div")
    appWrapper.setAttribute("data-juno-app", name || appURL)

    import(appURL.href + "?" + Date.now()) //importShim(appURL + "?" + Date.now())
      .then((app) => {
        const mount = app.mount || app.default
        mount(appWrapper, { props: appProps })
      })
      .catch((error) => console.warn(error.message))
    currentScript.replaceWith(appWrapper)
  }

window.__junoBootstrap().then(window.__junoWidgetLoader)
