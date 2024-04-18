/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Tooltip } from "./index"
import { TooltipTrigger } from "../TooltipTrigger/TooltipTrigger.component"
import { TooltipContent } from "../TooltipContent/TooltipContent.component"

describe("Tooltip", () => {
  test("renders a Tooltip", async () => {
    render(<Tooltip>tooltip</Tooltip>)
    expect(screen.getByText(/tooltip/i)).toBeInTheDocument()
  })

  test("renders a closed Tooltip: the trigger renders as passed and the content is not visible", async () => {
    await render(
      <Tooltip>
        <TooltipTrigger>trigger</TooltipTrigger>
        <TooltipContent>my content</TooltipContent>
      </Tooltip>
    )
    // screen.debug()
    expect(screen.getByText(/trigger/i)).toBeInTheDocument()
    expect(screen.queryByText(/my content/i)).not.toBeInTheDocument()
  })

  test("render an controlled open Tooltip: the trigger and content are visible", async () => { 
    await render(
      <Tooltip open={true}>
        <TooltipTrigger>trigger</TooltipTrigger>
        <TooltipContent>my content</TooltipContent>
      </Tooltip>
    )
    // screen.debug()
    expect(screen.getByText(/trigger/i)).toBeInTheDocument()
    expect(screen.getByText(/my content/i)).toBeInTheDocument()
  })

  test("render a Tooltip with initialOpen set to true: the trigger and content are visible", async () => {
    await render(
      <Tooltip initialOpen={true}>
        <TooltipTrigger>trigger</TooltipTrigger>
        <TooltipContent>my content</TooltipContent>
      </Tooltip>
    )
    // screen.debug()
    expect(screen.getByText(/trigger/i)).toBeInTheDocument()
    expect(screen.getByText(/my content/i)).toBeInTheDocument()
  })

  test("render an initialOpen Tooltip with variant set to info: the content should be visible and have a class matching the passed variant", async () => {
    await render(
      <Tooltip variant="info" initialOpen={true}>
        <TooltipTrigger>trigger</TooltipTrigger>
        <TooltipContent data-testid="tooltip-content">my content</TooltipContent>
      </Tooltip>
    )
    // screen.debug()
    expect(screen.getByText(/trigger/i)).toBeInTheDocument()
    expect(screen.getByText(/my content/i)).toBeInTheDocument()
    expect(screen.getByTestId("tooltip-content")).toHaveClass("juno-tooltip-info")
  })

  test("render a TooltipTrigger with asChild set to true: the trigger renders the child as passed, the trigger component is not rendered", async () => {
    await render(
      <Tooltip initialOpen={true}>
        <TooltipTrigger data-testid="trigger-component" asChild>
          <button data-testid="trigger-child">Click me to show tooltip</button>
        </TooltipTrigger>
        <TooltipContent>TEST</TooltipContent>
      </Tooltip>
    )
    // screen.debug()
    expect(screen.getByText("Click me to show tooltip")).toBeInTheDocument()
    expect(screen.queryByTestId("trigger-component")).not.toBeInTheDocument()
    expect(screen.getByTestId("trigger-child")).toBeInTheDocument()
  })

  test("render an uncontrolled Tooltip: by default the trigger event that opens the tooltip is click", async () => {
    await render(
      <Tooltip>
        <TooltipTrigger>trigger</TooltipTrigger>
        <TooltipContent>my content</TooltipContent>
      </Tooltip>
    )
    // screen.debug()
    expect(screen.getByText(/trigger/i)).toBeInTheDocument()
    expect(screen.queryByText(/my content/i)).not.toBeInTheDocument()
    await userEvent.click(screen.getByText(/trigger/i))
    expect(screen.getByText(/my content/i)).toBeInTheDocument()
  })

  test("render an uncontrolled Tooltip with triggerEvent set to hover: the content should become visible on trigger hover", async () => {
    await render(
      <Tooltip triggerEvent="hover">
        <TooltipTrigger>trigger</TooltipTrigger>
        <TooltipContent>my content</TooltipContent>
      </Tooltip>
    )
    // screen.debug()
    expect(screen.getByText(/trigger/i)).toBeInTheDocument()
    expect(screen.queryByText(/my content/i)).not.toBeInTheDocument()
    await userEvent.hover(screen.getByText(/trigger/i))
    expect(screen.getByText(/my content/i)).toBeInTheDocument()
  })

  test("render an uncontrolled Tooltip: the content should become visible on trigger focus", async () => {
    await render(
      <Tooltip>
        <TooltipTrigger>trigger</TooltipTrigger>
        <TooltipContent>my content</TooltipContent>
      </Tooltip>
    )
    // screen.debug()
    expect(screen.getByText(/trigger/i)).toBeInTheDocument()
    expect(screen.queryByText(/my content/i)).not.toBeInTheDocument()
    await userEvent.tab()
    expect(screen.getByText(/my content/i)).toBeInTheDocument()
  })

  test("render a disabled Tooltip: the content should not become visible on trigger click or hover or focus", async () => {
    await render(
      <Tooltip disabled={true}>
        <TooltipTrigger>trigger</TooltipTrigger>
        <TooltipContent>my content</TooltipContent>
      </Tooltip>
    )
    // screen.debug()
    expect(screen.getByText(/trigger/i)).toBeInTheDocument()
    expect(screen.queryByText(/my content/i)).not.toBeInTheDocument()
    await userEvent.click(screen.getByText(/trigger/i))
    expect(screen.queryByText(/my content/i)).not.toBeInTheDocument()
    await userEvent.hover(screen.getByText(/trigger/i))
    expect(screen.queryByText(/my content/i)).not.toBeInTheDocument()
    await userEvent.tab()
    expect(screen.queryByText(/my content/i)).not.toBeInTheDocument()
  })

})
