import React, { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import {
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridToolbar,
  ButtonRow,
  Spinner,
  Stack,
  Button,
  Icon,
} from "juno-ui-components"
import IconCertificateAuthority from "../img/Icon_Certificate_Authority.svg"

const cardsContainerCss = `
card-container 
grid 
grid-flow-col 
auto-cols-[1fr] 
gap-4
`

const cardCss = `
card
bg-theme-background-lvl-1
p-8
rounded
`

export const cardHeaderCss = `
font-bold
text-lg
`

const CAsList = ({ cas }) => {
  let [searchParams, setSearchParams] = useSearchParams()

  cas = useMemo(() => {
    if (!cas) return []
    return cas
  }, [cas])

  const onCASelected = (caName) => {
    // update URL state
    setSearchParams({ ca: caName })
  }

  return (
    <>
      <h1 className="font-bold text-xl mb-8 mt-16">
        Please select the Certificate Authority you need
      </h1>
      {cas.length > 0 ? (
        <div className={cardsContainerCss}>
          {cas.map((ca, index) => (
            <div key={index} className={cardCss}>
              <Stack direction="vertical" className="h-full">
                <div className="h-full">
                  <div className={cardHeaderCss}>
                    {ca.display_name || ca.name}
                  </div>
                  <div className="mt-4">{ca.description}</div>
                </div>
                <Stack alignment="center" className="mt-4">
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
              </Stack>
            </div>
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
