import React from "react"


const DummyComponentList = ({count}) => {

  return (
    <>
      {
        [...Array(count)].map((_, i) => {
          return (
            <div 
              className="
                flex
                bg-juno-blue
                rounded
                text-white
                px-8
                py-3
                border
                border-juno-blue-7"
              key={i}  
            >
             <div className="m-auto">{i}</div>
            </div>
          )
        })
      }
    </>
  )
}

export default DummyComponentList