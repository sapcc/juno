// __webpack_public_path__ = window.location
// console.log(window.location)

import React from "react"

export default ({ color, title }) => {
  React.useState()
  return (
    <div style={{ margin: "20px" }}>
      <h2 style={{ color: color || "red" }}>Hello this is Auth App 1</h2>
      {title && <h3>{title}</h3>}
    </div>
  )
}
