import * as React from "react"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Modal } from "./index"
import { PortalProvider, usePortalRef } from "../PortalProvider/PortalProvider.component"

// const setup = ({ handleClick = null } = {}) => {
//   const root = usePortalRef()

//   const { container } = render(<PortalProvider><Modal open={true} /></PortalProvider>)

//   return { ...within(root), root, container }
// }

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
  
  // // button labels
  
  // // icons
  
  // // handlers
  
  // // open close

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
