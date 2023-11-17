import React from "react"
import DummyComponent from "./DummyComponent"

const DummyComponentList = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => {
        return <DummyComponent key={i} label={i} />
      })}
    </>
  )
}

export default DummyComponentList
