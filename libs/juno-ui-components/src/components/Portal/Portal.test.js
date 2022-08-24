import * as React from "react"
import ReactDOM from "react-dom";
import { render, screen, waitFor  } from "@testing-library/react"
import { Portal } from "./index"


describe("Portal", () => {
	
	test("renders stuff into a portal", async () => {
		render(<Portal><span data-testid="portal-content" >stuff</span></Portal>)
		expect(screen.getByTestId("portal-content")).toBeInTheDocument()
		expect(screen.getByTestId("portal-content")).toHaveTextContent("stuff")
	})
	
	test("renders stuff as last children of the document body by default", async () => {
		render(<Portal data-testid="portal"><span data-testid="portal-content" >stuff</span></Portal>)
		expect(screen.getByTestId("portal-content")).toBeInTheDocument()
		expect(screen.getByTestId("portal-content").nextSibling).toBe(null)
	})
	
	test("renders stuff at a targetSelector as passed", async () => {
		const portalRoot = document.createElement('div')
		portalRoot.setAttribute('id', "portal-root")
		document.body.appendChild(portalRoot)
		render(
			<Portal targetSelector="#portal-root"><span data-testid="portal-content" id="test-content">stuff</span></Portal>	
		)
		expect(screen.getByTestId("portal-content")).toBeInTheDocument()
		expect(screen.getByTestId("portal-content").parentNode).toBeInTheDocument()
		expect(screen.getByTestId("portal-content").parentNode).toHaveAttribute("id", "portal-root")
		document.body.removeChild(portalRoot)
	})
	
})