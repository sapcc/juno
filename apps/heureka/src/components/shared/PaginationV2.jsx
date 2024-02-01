import React, { useMemo, useState, useEffect } from "react"
import { Stack, Button, Pagination } from "juno-ui-components"

const PaginationV2 = ({ pagesInfo, isFetching, isLoading, disabled }) => {
  // create currentPageIndex, startIndex, endIndex in useMemo
  const { currentPage, totalPages } = useMemo(() => {
    if (!pagesInfo?.pages) return []
    const pages = pagesInfo?.pages
    let currentPage = null
    const currentPageIndex = pages?.findIndex((page) => page?.isCurrent)
    if (currentPageIndex > -1) {
      currentPage = pages[currentPageIndex]?.pageNumber
    }
    const totalPages = pages?.length
    return { currentPage, totalPages }
  }, [pagesInfo?.pages])

  console.log("pagesInfo", currentPage, totalPages)

  return (
    <Stack alignment="center" className="mt-4" distribution="end">
      {isFetching ? <span className="mr-2"> Loading...</span> : null}
      <Pagination
        disabled={disabled}
        currentPage={currentPage}
        onKeyPress={function noRefCheck() {}}
        onPressNext={function noRefCheck() {}}
        onPressPrevious={function noRefCheck() {}}
        onSelectChange={function noRefCheck() {}}
        pages={totalPages}
        variant="select"
      />
      {/* )} */}
    </Stack>
  )
}

export default PaginationV2
