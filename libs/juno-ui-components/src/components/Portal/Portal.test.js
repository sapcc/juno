import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { InPortal } from "./index"


describe("Portal", () => {
	
	test("renders stuff into a portal", async () => {
		render(<InPortal><span data-testid="portal-content" >stuff</span></InPortal>)
		expect(screen.getByTestId("portal-content")).toBeInTheDocument()
		expect(screen.getByTestId("portal-content")).toHaveTextContent("stuff")
	})
	
})