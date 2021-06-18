import React from "react"


const DummyComponentList = ({count}) => {

  return (
    <>
      {
        [...Array(count)].map((_, i) => {
          return (
            <div 
              className="
                bg-sap-blue
                rounded
                text-white
                px-4
                py-3
                border
                border-sap-blue-70
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