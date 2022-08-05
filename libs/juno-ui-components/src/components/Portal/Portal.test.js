import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Portal } from "./index"


describe("Portal", () => {
	
	test("renders stuff into a portal", async () => {
		render(<Portal><span data-testid="portal-content" >stuff</span></Portal>)
		expect(screen.getByTestId("portal-content")).toBeInTheDocument()
		expect(screen.getByTestId("portal-content")).toHaveTextContent("stuff")
	})
	
})