import React from "react"

export default ({ color }) => {
  console.log("====render app2")
  React.useState()
  return (
    <div style={{ margin: "20px" }}>
      <h2 style={{ color: color || "red" }}>Hello this is Auth App 2</h2>
    </div>
  )
}
