import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  Icon,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Container,
} from "juno-ui-components"
import {
  DetailSection,
  DetailSectionBox,
  DetailContentHeading,
  DetailSectionHeader,
} from "../styles"
import useStore from "../hooks/useStore"
import { useStore as useMessageStore } from "../messageStore"
import HintLoading from "./HintLoading"
import ServerGroupsList from "./SupportGroupsList"

const ITEMS_PER_PAGE = 10

const SupportGroups = () => {
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)

  return (
    <Container px={false}>
      <ServerGroupsList />
    </Container>
  )
}

export default SupportGroups
