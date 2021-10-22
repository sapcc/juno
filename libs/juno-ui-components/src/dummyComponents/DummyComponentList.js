import React from "react"


const DummyComponentList = ({count}) => {

  return (
    <>
      {
        [...Array(count)].map((_, i) => {
          return (
            <div 
              className="
                bg-juno-blue
                rounded
                text-white
                px-4
                py-3
                border
                border-juno-blue-7
                text-center"
              key={i}  
            >
              {i}
            </div>
          )
        })
      }
    </>
  )
}

export default DummyComponentList