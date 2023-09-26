import React from "react"

const DummyComponent = ({label}) => {
  
  return (
    <div 
      className="
        jn-flex
        jn-bg-juno-blue
        jn-rounded
        jn-text-white
        jn-px-8
        jn-py-3
        jn-border
        jn-border-juno-blue-7"
      >
      <div className="jn-m-auto">{label}</div>
    </div>
  )
}

export default DummyComponent
