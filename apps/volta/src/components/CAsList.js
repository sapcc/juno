import React, { useMemo } from "react"
import { DetailSection, DetailSectionHeader, DetailSectionBox } from "../styles"
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
} from "juno-ui-components"

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
      {cas.length > 0 ? (
        <>
          {cas.map((ca, index) => (
            <div key={index} className={DetailSection}>
              <div className={DetailSectionBox}>
                <p className={DetailSectionHeader}>
                  {ca.displayName || ca.name}
                </p>
                <div className="mt-4">{ca.description}</div>
                <Stack alignment="center" className="mt-4" distribution="end">
                  <Button label="Show" onClick={() => onCASelected(ca.name)} />
                </Stack>
              </div>
            </div>
          ))}
        </>
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
