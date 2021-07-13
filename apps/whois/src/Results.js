import React from "react"

const AccordianItem = ({ title, content }) => {
  const [active, setActive] = React.useState(false)
  const [height, setHeight] = React.useState("0px")

  const toggleAccordion = React.useCallback(() => {
    setActive(!active)
    setHeight(active ? "0px" : `${contentSpace.current.scrollHeight}px`)
  }, [contentSpace, active])

  const contentSpace = React.useRef(null)
  return (
    <div className="flex flex-col border border-blue-600 bg-blue-200 pl-3">
      <button
        className="py-6 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <p className="inline-block text-footnote light">{title}</p>
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out"
      >
        <div className="pb-10">
          <pre>{JSON.stringify(content, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

const Results = ({ items, processing }) => {
  return (
    <div>
      {processing ? (
        <span>Searching...</span>
      ) : (
        items &&
        (items.length > 0 ? (
          // <pre>{JSON.stringify(items, null, 2)}</pre>
          <div className="space-y-1">
            {items.map((item, index) => (
              <AccordianItem
                key={index}
                title={item.floatingIP}
                content={item}
              />
            ))}
          </div>
        ) : (
          "Not found"
        ))
      )}
    </div>
  )
}

export default Results
