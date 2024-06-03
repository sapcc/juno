/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState, useEffect } from "react"
import { Stack, Button } from "juno-ui-components"

const Pagination = ({ count, limit, onChanged, isFetching, disabled }) => {
  const [offset, setOffset] = useState(0)
  const [actualPage, setactualPage] = useState(1)

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
    const newOffset = offset - limit
    setOffset(newOffset)
    if (onChanged) onChanged(newOffset)
    setactualPage(actualPage - 1)
  }

  const onNextChanged = () => {
    if (actualPage === pages) return
    const newOffset = offset + limit
    setOffset(newOffset)
    if (onChanged) onChanged(newOffset)
    setactualPage(actualPage + 1)
  }

  return (
    <>
      <Stack alignment="center" className="mt-4" distribution="end">
        {isFetching ? <span> Loading...</span> : null}{" "}
        <Button
          className="ml-4"
          disabled={actualPage === 1 || disabled}
          label="<"
          onClick={onPrevChanged}
          size="small"
        />
        <p className="ml-4">
          {actualPage} / {pages}
        </p>
        <Button
          disabled={actualPage === pages || disabled}
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
