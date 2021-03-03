import regeneratorRuntime from "regenerator-runtime"

let currentScript = document.currentScript

// fall back for IE
if (!currentScript) {
  let scripts = document.getElementsByTagName("script")
  currentScript = scripts[scripts.length - 1]
}

if (window._junoWidgetLoader) {
  window._junoWidgetLoader.load(currentScript)
} else {
  import("./loader").then((loader) => {
    window._junoWidgetLoader = loader
    window._junoWidgetLoader.load(currentScript)
  })
}
