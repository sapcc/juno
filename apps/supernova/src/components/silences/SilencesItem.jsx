/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react"
import { DataGridRow, DataGridCell, Pill } from "juno-ui-components"

const SilencesItem = (prop) => {
  const silence = prop.silence

  return (
    <DataGridRow className="no-hover">
      <DataGridCell>{silence?.id}</DataGridCell>
      <DataGridCell>{silence?.comment}</DataGridCell>
      <DataGridCell>{silence?.createdBy}</DataGridCell>
      <DataGridCell>{silence?.startsAt}</DataGridCell>
      <DataGridCell>{silence?.endsAt}</DataGridCell>
      <DataGridCell>
        {silence?.matchers?.map((matcher, index) => (
          <Pill key={index} pillKey={matcher.name} pillValue={matcher.value} />
        ))}
      </DataGridCell>
    </DataGridRow>
  )
}

export default SilencesItem
