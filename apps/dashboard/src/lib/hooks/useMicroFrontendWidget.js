import React from "react"
import useDynamicScript from "./useDynamicScript"

/**
 * This hook loads a remote MFE via script tag.
 */

const useMicroFrontendWidget = ({ url, wrapper, props }) => {
  wrapper = wrapper || document.body
  const dataset = { "data-url": url }
  for (let prop in props) {
    dataset[`data-props-${prop}`] = props[prop]
  }
  return useDynamicScript({
    url: "https://juno.eu-nl-1.cloud.sap/cdn/widget-loader/0_0_1/app.js",
    wrapper,
    dataset,
  })
}

export default useMicroFrontendWidget
