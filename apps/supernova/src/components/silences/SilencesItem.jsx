/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react"
import { DataGridRow, DataGridCell, Pill, Stack } from "juno-ui-components"
import SilencesTimestamp from "./shared/SilencesTimestamp"

import { useSilencesActions } from "../../hooks/useAppStore"

// function that cuts the value of a string to max 40 characters
const cutString = (str) => {
  return str.length > 40 ? str.substring(0, 40) + "..." : str
}

const SilencesItem = (prop) => {
  const silence = prop.silence
  const { setShowDetailsForSilence } = useSilencesActions()

  // handle show details
  const handleShowDetails = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setShowDetailsForSilence(silence)
  }

  return (
    <DataGridRow className="no-hover" onClick={(e) => handleShowDetails(e)}>
      <DataGridCell>
        <SilencesTimestamp timestamp={silence?.startsAt} />
        <SilencesTimestamp timestamp={silence?.endsAt} />
      </DataGridCell>
      <DataGridCell>
        <div>{silence?.comment}</div>
        <div className="text-theme-light">Created by {silence?.createdBy}</div>
      </DataGridCell>
      <DataGridCell className="overflow-hidden">
        <Stack gap="2" alignment="start" wrap={true}>
          {silence?.matchers?.map((matcher, index) => (
            <Pill
              key={index}
              pillKey={matcher.name}
              pillValue={cutString(matcher.value)}
            />
          ))}
        </Stack>
      </DataGridCell>
    </DataGridRow>
  )
}

export default SilencesItem
