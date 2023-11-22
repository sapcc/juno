import * as React from "react"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Modal } from "./index"
import { PortalProvider, usePortalRef } from "../PortalProvider/PortalProvider.component"



describe("Modal", () => {
  test("renders a Modal", async () => {
		render(<PortalProvider><Modal open /></PortalProvider>)
		expect(screen.getByRole("dialog")).toBeInTheDocument()
		expect(screen.getByRole("dialog")).toHaveClass("juno-modal")
  })
  
  test("renders a title as passed", async () => {
	  render(<PortalProvider><Modal title="My Modal" open /></PortalProvider>)
	  expect(screen.getByRole("dialog")).toBeInTheDocument()
	  expect(screen.getByRole("dialog")).toHaveTextContent("My Modal")
  })
  
  test("renders children as passed", async () => {
	  render(
	  		<PortalProvider>
	  			<Modal open>
		  			<button>Child Button</button>	 
					<span>Something here</span>
				</Modal>
	  		</PortalProvider>
		)
		expect(screen.getByRole("dialog")).toBeInTheDocument()
		expect(screen.getByRole("button", {name: "Child Button"})).toBeInTheDocument()
		expect(screen.getByRole("dialog")).toHaveTextContent("Something here")
  })
  
  test("renders a Modal with two Close buttons by default", async () => {
	  // there should be one in the header and one in the footer
	  render(<PortalProvider><Modal open /></PortalProvider>)
	  expect(screen.getByRole("dialog")).toBeInTheDocument()
	  expect(screen.queryAllByRole("button")).toHaveLength(2)
  })
  
  test("renders a non-closeable Modal as passed", async () => {
	  render(<PortalProvider><Modal open closeable={false} /></PortalProvider>)
	  expect(screen.getByRole("dialog")).toBeInTheDocument()
	  expect(screen.queryByRole("button")).not.toBeInTheDocument()
	  expect(screen.queryAllByRole("button")).toHaveLength(0)
  })
  
	test("renders a cancel button with a label as passed", async () => {
		render(<PortalProvider><Modal open cancelButtonLabel="Click here to Cancel" /></PortalProvider>)
		expect(screen.getByRole("dialog")).toBeInTheDocument()
		expect(screen.queryByRole("button", {name: "Click here to Cancel"})).toBeInTheDocument()
	})
	
	test("renders a confirm button with a label as passed", async () => {
		render(<PortalProvider><Modal open confirmButtonLabel="Click here to Proceed" /></PortalProvider>)
		expect(screen.getByRole("dialog")).toBeInTheDocument()
		expect(screen.queryByRole("button", {name: "Click here to Proceed"})).toBeInTheDocument()
		expect(screen.queryByRole("button", {name: "Click here to Proceed"})).toHaveClass("juno-button-primary")
	})
  
	test("closes the modal when clicking the close button in the title bar", async () => {
		render(<PortalProvider><Modal open /></PortalProvider>)
		expect(screen.getByRole("dialog")).toBeInTheDocument()
		const titleBarCloseButton = screen.queryAllByRole("button")[0]
		expect(titleBarCloseButton).toHaveAttribute("aria-label", "close")
		await userEvent.click(titleBarCloseButton)
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
	})
	
	test("closes the modal when clicking the default close button in the modal footer", async () => {
		render(<PortalProvider><Modal open cancelButtonLabel="Cancel all the things"/></PortalProvider>)
		expect(screen.getByRole("dialog")).toBeInTheDocument()
		const footerCloseButton = screen.queryAllByRole("button")[1]
		expect(footerCloseButton).toHaveTextContent("Cancel all the things")
		await userEvent.click(footerCloseButton)
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
	})
	
	test("does not close the modal when clicking on the backdrop by default", async () => {
		render(<PortalProvider><Modal open c/></PortalProvider>)
		expect(screen.getByRole("dialog")).toBeInTheDocument()
		const backdrop = document.querySelector(".juno-modal-container")
		await userEvent.click(backdrop)
		expect(screen.getByRole("dialog")).toBeInTheDocument()
	})
	
	test("closes the modal when clicking on the background and the modal is configured to do so", async () => {
		render(<PortalProvider><Modal open closeOnBackdropClick/></PortalProvider>)
		expect(screen.getByRole("dialog")).toBeInTheDocument()
		const backdrop = document.querySelector(".juno-modal-container")
		await userEvent.click(backdrop)
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
	})
	
	// confirm button closing, handlers
	
	// trap focus
	
	// initalFocus

  test("renders custom classNames as passed", async () => {
	render(<PortalProvider><Modal open className="my-custom-class" /></PortalProvider>)
	expect(screen.getByRole("dialog")).toHaveClass("my-custom-class")
  })

  test("renders all props as passed", async () => {
	render(<PortalProvider><Modal open name="My little Modal" /></PortalProvider>)
	expect(screen.getByRole("dialog")).toHaveAttribute(
	  "name",
	  "My little Modal"
	)
  })
})
