import React, { useMemo } from "react"
import { Stack } from "juno-ui-components"
import CAsListItem from "./CAsListItem"

const cardsContainerCss = `
card-container 
grid 
gap-4
grid-cols-3
`

const CAsList = ({ cas }) => {
  cas = useMemo(() => {
    if (!cas) return []
    return cas
  }, [cas])

  return (
    <>
      <h1 className="font-bold text-xl mb-8 mt-16">
        Please select the Certificate Authority you need
      </h1>
      {cas.length > 0 ? (
        <div className={cardsContainerCss}>
          {cas.map((ca, index) => (
            <CAsListItem key={index} ca={ca} />
          ))}
        </div>
      ) : (
        <Stack
          alignment="center"
          distribution="center"
          direction="vertical"
          className="h-full"
        >
          <span>No CAs found</span>
        </Stack>
      )}
    </>
  )
}

export default CAsList
