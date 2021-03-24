import React from "react"
import useDynamicScript from "lib/hooks/useDynamicScript"

/**
 * This hook loads a remote MFE via script tag.
 */

const useMicroFrontendWidget = ({ url, wrapper }) => {
  wrapper = wrapper || document.body
  return useDynamicScript({
    url: "https://juno.eu-nl-1.cloud.sap/cdn/widget-loader/0_0_1/app.js",
    wrapper,
    dataset: { "data-url": url },
  })
}

export default useMicroFrontendWidget
