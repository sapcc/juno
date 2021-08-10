import useDynamicScript from "../lib/hooks/useDynamicScript"
import { useRef, useState, useEffect, useMemo } from "react"

// Content Delivery Network (CDN) Host
const HOST =
  process.env.NODE_ENV === "development"
    ? "juno.qa-de-1.cloud.sap"
    : window.location.host

const CDN_HOST = `https://cdn.${HOST}`

// load dynamically the requested micro frontend (mfe)
const MicroFrontend = ({ name, version, ...props }) => {
  // wrapper reference
  const refContainer = useRef()
  // wrapper
  const [wrapper, setWrapper] = useState()
  // update wrapper if reference element is available
  useEffect(() => setWrapper(refContainer.current), [refContainer.current])

  // data attributes on the script tag
  const dataset = useMemo(() => {
    const data = { "data-url": `${CDN_HOST}/${name}/${version}/widget.js` }
    for (let prop in props) {
      data[`data-props-${prop}`] = props[prop]
    }
    return data
  }, [name, props])

  // load widget via script tag
  // this hook does nothing if wrapper is unset!
  // In this case it waits until the wrapper is available (render at least 1 time)
  useDynamicScript({
    url: `${CDN_HOST}/widget-loader/0_0_2/app.js`,
    wrapper,
    dataset,
  })

  // clear wrapper on change (avoid double rendering)
  useEffect(() => {
    return () => {
      if (wrapper) wrapper.innerHTML = ""
    }
  }, [wrapper])

  // wrapper!
  return <div ref={refContainer} name={name} />
}

export default MicroFrontend
