import React from "react"
import DummyBox from "./DummyBox"

const DummyBoxList = ({count, size}) => {

  return (
    <>
      {[...Array(count)].map((_,i) => {
          return (<DummyBox key={i} label={i} size={size} />)
        })
      }
    </>
  )
}

export default DummyBoxList