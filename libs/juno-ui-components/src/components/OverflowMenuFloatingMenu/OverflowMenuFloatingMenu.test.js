import * as React from "react"
import { render, screen} from "@testing-library/react"
import { OverflowMenuFloatingMenu } from "./index"

describe("OverflowMenuFloatingMenu", () => {
	
	test("renders an OverflowMenuFLoatingMenu", async () => {
		render(<OverflowMenuFloatingMenu data-testid="my-floating-menu" />)
		expect(screen.getByTestId("my-floating-menu")).toBeInTheDocument()
	})
	
	
})