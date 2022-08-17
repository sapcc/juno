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
	
	test.skip("renders stuff at a targetNode as passed", async () => {
		// Create a parent node for the portal Parent first to avoid warnings from React:
		const app = document.createElement('div')
		app.setAttribute('id', "App")
		document.body.appendChild(app)
		await waitFor(
		  () => {
			expect(document.getElementById('App')).toBeInTheDocument();
		  },
		  { timeout: 500 }
		);
		// Once the parent Node for the portal parent is created in the DOM, create an ReactNode to later reference as a parent fort he contents to render into the portal:
		const reactNode = React.createElement('div', {id: 'portal-root'})
		ReactDOM.render(reactNode, document.getElementById('App'))
		await waitFor(
		  () => {
			expect(document.getElementById('portal-root')).toBeInTheDocument();
		  },
		  { timeout: 500 }
		);
		// get hold of the inserted ReactNode to pass on to Portal:
		const tNode = document.getElementById('portal-root')
		render(
			<Portal targetNode={tNode}><span data-testid="portal-content" id="test-content">stuff</span></Portal>	
		)
		expect(screen.getByTestId("portal-content")).toBeInTheDocument()
		expect(screen.getByTestId("portal-content").parentNode).toBeInTheDocument()
		expect(screen.getByTestId("portal-content").parentNode).toHaveAttribute("id", "portal-root")
		// Teardown:
		ReactDOM.unmountComponentAtNode(tNode)
		document.body.removeChild(app)
	})
	
})