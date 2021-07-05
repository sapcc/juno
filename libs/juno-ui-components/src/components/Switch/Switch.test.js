import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Switch } from "./index"

describe("Switch", () => {
  
  test("renders a switch button", async () => {
  	render(<Switch />)
  	expect(screen.getByRole("switch")).toBeInTheDocument()
  })
  
  test("renders a switch with a name as passed", async () => {
    render(<Switch name="My Switch" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveAttribute('name', "My Switch")
  })
  
  test("renders a switch with a value as passed", async () => {
    render(<Switch value="ValueAsPassed" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveAttribute('value', "ValueAsPassed")
  })
  
  /* TODO: */
  // test("renders a checked switch as passed", async () => {
  //   render(<Switch checked={true} />)
  //   expect(screen.getByRole("switch")).toBeInTheDocument()
  //   expect(screen.getByRole("switch")).toHaveAttribute('checked')
  // })
  
  
  test("renders no checked attribute if false", async () => {
    render(<Switch checked={false} />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).not.toHaveAttribute('checked')
  })
  
  test("renders all props as passed", async () => {
    render(<Switch id="switch-1" data-test="23" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveAttribute('id', "switch-1")
    expect(screen.getByRole("switch")).toHaveAttribute('data-test', "23")
  })
  
  /* TODO: */
  // test("fires onChange handler as passed", async () => {
  //   const handleChange = jest.fn()
  //   const { container } = render(
  //     <Switch onChange={handleChange} />
  //   )
  //   const swtch = container.firstChild
  //   fireEvent.change(swtch, { target: { value: 'a' } })
  //   expect(handleChange).toHaveBeenCalledTimes(1)
  // })

})
