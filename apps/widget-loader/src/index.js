// scope and cache widget loader functions under __junoWidgetLoader
window.__junoWidgetLoader =
  window.__junoWidgetLoader ||
  (function () {
    const shimUrl =
      "https://ga.jspm.io/npm:es-module-shims@1.6.2/dist/es-module-shims.js"
    // console.log("=============DEFINE============")

    window.process = { env: { NODE_ENV: "production" } }
    window.esmsInitOptions = {
      shimMode: true,
      mapOverrides: true,
    }

    const originManifests = {}
    const importmapLoaders = {}

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

    const loadImportmap = async (params = {}) => {
      const { origin, importmapUrl } = params

      if (document.querySelector(`script[data-juno-importmap="${origin}"]`))
        return Promise.resolve(true)

      await loadShim
      importmapLoaders[origin] =
        importmapLoaders[origin] ||
        fetch(importmapUrl)
          .then((r) => r.json())
          .then((importmap) => {
            // first load of the importmap, replace BASE_URL placeholder
            // in importmap with origin
            const importmapOrigin = new URL(importmapUrl).origin
            importmap = JSON.parse(
              JSON.stringify(importmap).replaceAll(
                "%BASE_URL%",
                importmapOrigin
              )
            )
            const script = document.createElement("script")
            script.setAttribute("type", "importmap-shim")
            script.setAttribute("data-juno-importmap", origin)
            script.text = JSON.stringify(importmap)
            document.head.append(script)
          })

      // console.log(".............")
      return importmapLoaders[origin]
    }

    const load = async () => {
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
        importmapUrl = `${origin}/importmap.json`,
        showLoading,
        debug,
        ...props
      } = currentScript.dataset
      debug = debug === "true"
      showLoading = showLoading === "true"

      if (debug) {
        console.log("===WIDGET LOADER", {
          name,
          version,
          url,
          origin,
          importmapOnly,
          importmapUrl,
          showLoading,
          debug,
          props,
        })
      }

      loadImportmap({ origin, importmapUrl }).then(async () => {
        const loadedEvent = new CustomEvent("junoImportmapLoaded", {
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
          // window.__junoWidgetLoader.originManifests[origin].manifest is the cache for the current
          // widget loader
          if (!originManifests[origin] || !originManifests[origin].manifest) {
            // load mainfest.json once
            await fetch(`${origin}/manifest.json`)
              .then((res) => res.json())
              .then(
                (manifest) =>
                  (originManifests[origin] = {
                    manifest,
                  })
              )
          }

          if (
            debug &&
            (!originManifests[origin].manifest ||
              !originManifests[origin].manifest[name] ||
              !originManifests[origin].manifest[name][version])
          ) {
            console.log(
              `===WIDGET LOADER: could not find app ${name} with version ${version} in manifest`
            )
          }
          // final url
          appURL = new URL(
            originManifests[origin].manifest[name][version].entryFile,
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
      })
    }
    return { load }
  })()

window.__junoWidgetLoader.load()
