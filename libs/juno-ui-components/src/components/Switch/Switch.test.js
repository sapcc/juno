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
  
  test("renders a disabled switch as passed", async () => {
    render(<Switch disabled />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toBeDisabled()
  })
  
  test("renders an aria-checked switch as passed", async () => {
    render(<Switch on />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveAttribute('aria-checked')
  })
  

  test("renders an aria-checked attribute set to false if off", async () => {
    render(<Switch />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveAttribute('aria-checked', "false")
  })
  
  test("renders a custom className", async () => {
    render(<Switch className="my-custom-class" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveClass('my-custom-class')
  })
  
  test("renders all props as passed", async () => {
    render(<Switch id="switch-1" data-test="23" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveAttribute('id', "switch-1")
    expect(screen.getByRole("switch")).toHaveAttribute('data-test', "23")
  })
  
  test("executes custom handler on change as passed", async () => {	
    const onChangeSpy = jest.fn();
    render(<Switch onChange={onChangeSpy} />);
    screen.getByRole('switch').click();
    expect(onChangeSpy).toHaveBeenCalled();	
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
