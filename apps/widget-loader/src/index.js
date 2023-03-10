// scope and cache widget loader functions under __junoWidgetLoader
window.__junoWidgetLoader =
  window.__junoWidgetLoader ||
  (function () {
    const JUNO_IMPORTMAP_LOADED = "JUNO_IMPORTMAP_LOADED"
    // shim we use to support importmap in all browsers
    const shimUrl =
      "https://ga.jspm.io/npm:es-module-shims@1.6.2/dist/es-module-shims.js"

    // juno-ui-components accesses process.env. So we need to simulate it here
    window.process = { env: { NODE_ENV: "production" } }
    window.esmsInitOptions = {
      shimMode: true,
      mapOverrides: true,
    }

    // cache for manifests based on the origin
    const originManifests = {}
    const originImportmaps = {}

    /**
     * Shim loader
     * @return {Promise}
     */
    const loadShim = new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${shimUrl}"]`))
        return resolve(true)
      const shimScriptTag = document.createElement("script")
      shimScriptTag.setAttribute("async", true)
      shimScriptTag.setAttribute("src", shimUrl)
      shimScriptTag.onload = (e) => {
        resolve(true)
      }
      shimScriptTag.onerror = () => reject("Could not load es-module-shim")
      document.head.append(shimScriptTag)
    })

    /**
     * Importmap loader
     * @return {Promise}
     */
    const loadImportmap = async (importmapUrl) => {
      const importmapOrigin = new URL(importmapUrl).origin

      if (
        document.querySelector(
          `script[data-juno-importmap="${importmapOrigin}"]`
        )
      )
        return Promise.resolve(true)
      await loadShim

      // cache importmpa request.
      // Once the fetch promise has been resolved, no further requests are made.
      originImportmaps[importmapOrigin] =
        originImportmaps[importmapOrigin] ||
        fetch(importmapUrl)
          .then((r) => r.json())
          .then((importmap) => {
            // first load of the importmap, replace BASE_URL placeholder
            // in importmap with origin
            const script = document.createElement("script")
            script.setAttribute("type", "importmap-shim")
            script.setAttribute("data-juno-importmap", importmapOrigin)
            script.text = JSON.stringify(importmap)
            document.head.append(script)
          })
      return originImportmaps[importmapOrigin]
    }

    // manifest loader
    const loadManifest = async (origin) => {
      // load mainfest.json once
      // cache manifest requests.
      // Once the fetch promise has been resolved, no further requests are made.
      originManifests[origin] =
        originManifests[origin] ||
        fetch(`${origin}/manifest.json`)
          .then((res) => res.json())
          .then((manifest) => {
            if (!manifest)
              throw new Error(
                "===WIDGET LOADER: could not load manifest from ",
                origin
              )
            originManifests[origin] = manifest
            return originManifests[origin]
          })
      return originManifests[origin]
    }

    /**
     * main
     */
    const load = async () => {
      // get current script tag (widget-loader script)
      let currentScript = document.currentScript
      // fall back for IE
      if (!currentScript) {
        let scripts = document.getElementsByTagName("script")
        currentScript = scripts[scripts.length - 1]
      }
      let currentURL = new URL(currentScript.src)

      let {
        name,
        version = "latest",
        url,
        origin = currentURL.origin,
        importmapOnly,
        importmapUrl,
        showLoading,
        debug,
        dev,
        ...props
      } = currentScript.dataset
      debug = debug === "true"
      showLoading = showLoading === "true"
      dev = dev === "true"

      const manifest = await loadManifest(origin)
      debug && console.log("===WIDGET LOADER: manifest", manifest)
      origin = manifest._global?.baseUrl || origin
      debug && console.log("===WIDGET LOADER: origin", origin)

      // load manifest
      if (!importmapUrl)
        importmapUrl =
          origin + manifest?._global?.importMap[dev ? "dev" : "prod"]

      debug &&
        console.log("===WIDGET LOADER: params", {
          name,
          version,
          url,
          origin,
          importmapOnly,
          importmapUrl,
          showLoading,
          debug,
          dev,
          props,
        })

      // load importmap
      await loadImportmap(importmapUrl)

      const loadedEvent = new CustomEvent(JUNO_IMPORTMAP_LOADED, {
        detail: { origin: importmapUrl },
      })

      window.dispatchEvent(loadedEvent)

      //return here if only the importmap was requested
      if (importmapOnly === "true") return

      // het the app URL
      // url can be given via data-url attribute on the widget script tag or
      // if not the widget loader tries to load get it from the manifest.json
      let appURL = url
      if (!appURL) {
        if (
          debug &&
          (!manifest || !manifest[name] || !manifest[name][version])
        ) {
          console.log(
            `===WIDGET LOADER: could not find app ${name} with version ${version} in manifest`
          )
        }
        appURL = new URL(manifest[name][version].entryFile, origin).href
      }

      // get app props from the data-props-* arguments
      let appProps = { currentHost: url || origin }
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
      appWrapper.setAttribute("style", "display: inline; flex: 1;")
      if (showLoading) appWrapper.textContent = "Loading..."

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
    }
    return { load }
  })()

window.__junoWidgetLoader.load()
