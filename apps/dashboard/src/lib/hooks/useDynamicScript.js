import { useState, useEffect } from "react"
import { hashCode } from "../../lib/utils"

/**
 * This hook creates and adds a script tag to the head.
 * After the unmount, the script tag is automatically removed.
 * @param {map} props url
 */
export const useDynamicScript = (url) => {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!url) return

    setReady(false)
    setFailed(false)

    const elementId = hashCode(url)
    let element = document.getElementById(elementId)

    // prevent to load same script twice
    if (element) {
      // script with this url already exists
      if (element.dataset.loaded) {
        // script already loaded
        setReady(true)
      } else {
        // add onload listener
        element.addEventListener("load", () => {
          setReady(true)
        })
        element.addEventListener("error", () => {
          setFailed(true)
        })
      }
    } else {
      // create a new script tag

      element = document.createElement("script")
      element.id = elementId
      element.src = url
      element.type = "text/javascript"
      element.async = true

      element.onload = () => {
        console.log(`Dynamic Script Loaded: ${url}`)
        setReady(true)
        element.setAttribute("data-loaded", true)
      }

      element.onerror = () => {
        console.error(`Dynamic Script Error: ${url}`)
        setFailed(true)
      }

      document.head.appendChild(element)

      return () => {
        console.log(`Dynamic Script Removed: ${url}`)
        //document.head.removeChild(element)
      }
    }
  }, [url])

  return {
    ready,
    failed,
  }
}
