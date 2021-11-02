import * as React from "react"
import { render, screen} from "@testing-library/react"
import { OverflowMenuItem } from "./index"

describe("OverflowMenuItem", () => {
	
	test("renders an OverflowMenuItem", async () => {
		render(<OverflowMenuItem data-testid="my-floating-menu-item" />)
		expect(screen.getByTestId("my-floating-menu-item")).toBeInTheDocument()
	})
	
	
})