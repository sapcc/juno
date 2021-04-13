import useMicroFrontendWidget from "../lib/hooks/useMicroFrontendWidget"

// Content Delivery Network (CDN) Host
const HOST =
  process.env.NODE_ENV === "development" ? "https://juno.qa-de-1.cloud.sap" : ""

// load dynamically the requested micro frontend (mfe)
const MicroFrontend = ({ name, version, ...props }) => {
  useMicroFrontendWidget({
    url: `${HOST}/cdn/${name}/${version}/widget.js`,
    props,
  })
  return null
}

export default MicroFrontend
