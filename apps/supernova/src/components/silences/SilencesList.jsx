/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react"
import {
  DataGrid,
  DataGridHeadCell,
  DataGridRow,
  DataGridCell,
  SearchInput,
  Stack,
  Select,
  SelectOption,
  Icon,
} from "juno-ui-components"

import { useSilencesItems } from "../../hooks/useAppStore"
import SilencesItem from "./SilencesItem"

const filtersStyles = `
bg-theme-background-lvl-1
py-2
px-4
my-px
`

const SilencesList = () => {
  const silences = useSilencesItems()
  const [visibleSilences, setVisibleSilences] = useState(silences)
  console.log("silences", silences)

  return (
    <>
      <Stack direction="horizontal" className={`${filtersStyles}`}>
        <Select className="w-3/12" label="Status" defaultValue="active">
          <SelectOption value="active" />
          <SelectOption value="pending" />
          <SelectOption value="expired" />
        </Select>

        <SearchInput
          placeholder="search term or regular expression"
          className="ml-auto w-7/12"
        />
      </Stack>

      <DataGrid
        columns={6}
        minContentColumns={[0]}
        cellVerticalAlignment="top"
        className="alerts"
      >
        <DataGridRow>
          <DataGridHeadCell>Id</DataGridHeadCell>
          <DataGridHeadCell>Comment</DataGridHeadCell>
          <DataGridHeadCell>Created By</DataGridHeadCell>
          <DataGridHeadCell>Starts At</DataGridHeadCell>
          <DataGridHeadCell>Ends At</DataGridHeadCell>
          <DataGridHeadCell>Matchers</DataGridHeadCell>
        </DataGridRow>

        {visibleSilences?.length > 0 ? (
          visibleSilences.map((silence) => (
            <SilencesItem silence={silence} key={silence.id} />
          ))
        ) : (
          <DataGridRow className="no-hover">
            <DataGridCell colSpan={6}>
              <Stack gap="3">
                <Icon icon="info" color="text-theme-info" />
                <div>We couldn't find any matching silences.</div>
              </Stack>
            </DataGridCell>
          </DataGridRow>
        )}
      </DataGrid>
    </>
  )
}

export default SilencesList
