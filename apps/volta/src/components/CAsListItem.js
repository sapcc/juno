import React from "react"
import { useSearchParams } from "react-router-dom"
import { Stack, Button } from "juno-ui-components"
import IconCertificateAuthority from "../img/Icon_Certificate_Authority.svg"
import { useGlobalState } from "./StateProvider"

export const cardHeaderCss = `
font-bold
text-lg
`

const cardCss = `
card
bg-theme-background-lvl-1
rounded
p-8
`

const CAsListItem = ({ ca }) => {
  let [searchParams, setSearchParams] = useSearchParams()
  const docuLinks = useGlobalState().globals.documentationLinks

  const onCASelected = (caName) => {
    // update URL state
    setSearchParams({ ca: caName })
  }

  return (
    <div className={cardCss}>
      <div className={cardHeaderCss}>{ca.display_name || ca.name}</div>
      <div className="mt-4">{ca.description}</div>
      {docuLinks[ca.name] && (
        <a href={docuLinks[ca.name]} target="_blank">
          Read more...
        </a>
      )}
      <Stack alignment="center" className="mt-12">
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
  )
}

export default CAsListItem
