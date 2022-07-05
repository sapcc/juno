import React, { useMemo, useState, useEffect } from "react"
import { Stack, Button } from "juno-ui-components"

const Pagination = ({ count, limit, onChanged }) => {
  const [offset, setOffset] = useState(0)
  const [actualPage, setactualPage] = useState(1)

  useEffect(() => {
    if (onChanged) onChanged(offset)
  }, [offset])

  count = useMemo(() => {
    if (!count) return 0
    return count
  }, [count])

  limit = useMemo(() => {
    if (!limit) return 10
    return limit
  }, [limit])

  const pages = useMemo(() => {
    return Math.ceil(count / limit)
  }, [count, limit])

  const onPrevChanged = () => {
    if (actualPage === 1) return
    setOffset(offset - limit)
    setactualPage(actualPage - 1)
  }

  const onNextChanged = () => {
    if (actualPage === pages) return
    setOffset(offset + limit)
    setactualPage(actualPage + 1)
  }

  return (
    <>
      <Stack alignment="center" className="mt-4" distribution="end">
        <Button
          disabled={actualPage === 1}
          label="<"
          onClick={onPrevChanged}
          size="small"
        />
        <p className="ml-4">
          {actualPage} / {pages}
        </p>
        <Button
          disabled={actualPage === pages}
          className="ml-4"
          label=">"
          onClick={onNextChanged}
          size="small"
        />
      </Stack>
    </>
  )
}

export default Pagination
