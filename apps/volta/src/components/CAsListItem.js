import React, { useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { Stack, Button } from "juno-ui-components"
import IconCertificateAuthority from "../img/Icon_Certificate_Authority.svg"
import { useGlobalsDocumentationLinks } from "../hooks/useStore"

export const cardHeaderCss = `
font-bold
text-lg
`

const cardCss = `
card
bg-theme-background-lvl-1
rounded
p-8
h-full
w-full
`

const CAsListItem = ({ ca }) => {
  let [_, setSearchParams] = useSearchParams()
  const docuLinks = useGlobalsDocumentationLinks()

  const onCASelected = (caName) => {
    // update URL state
    setSearchParams({ ca: caName })
  }

  return (
    <div className={cardCss}>
      <Stack direction="vertical" alignment="start" className="h-full w-full">
        <div className={cardHeaderCss}>{ca.display_name || ca.name}</div>
        <div className="mt-4">{ca.description}</div>
        <div className="mb-12">
          {docuLinks[ca.name] && (
            <a href={docuLinks[ca.name]} target="_blank">
              Read more...
            </a>
          )}
        </div>
        <div className="mt-auto w-full">
          <Stack alignment="center">
            <div className="w-full">
              <Button
                label="Show"
                icon="description"
                onClick={() => onCASelected(ca.name)}
              />
            </div>
            <IconCertificateAuthority
              width={150}
              className="fill-current text-theme-background-lvl-0"
              alt="Certificate Authority"
              title="Icon certificate authority"
              role="img"
            />
          </Stack>
        </div>
      </Stack>
    </div>
  )
}

export default CAsListItem
