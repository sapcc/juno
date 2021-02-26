import regeneratorRuntime from "regenerator-runtime"

if (window._junoWidgetLoader) {
  window._junoWidgetLoader.load()
} else {
  import("./loader").then((loader) => {
    window._junoWidgetLoader = loader
    window._junoWidgetLoader.load()
  })
}
