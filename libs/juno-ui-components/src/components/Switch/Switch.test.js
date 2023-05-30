import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { act } from 'react-dom/test-utils'
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
  
  test("renders a switch with an id as passed", async () => {
    render(<Switch id="my-switch" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveAttribute('id', "my-switch")
  })
  
  test("renders a Switch with an associated label as passed", async () => {
    render(<Switch id="my-switch" label="My Switch"/>)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByLabelText("My Switch")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("My Switch")
  })
  
  test("renders a disabled switch as passed", async () => {
    act(() => {
      render(<Switch disabled />)
    })
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toBeDisabled()
  })
  
  test("renders an invalid Switch as passed", async () => {
    act(() => {
      render(<Switch invalid />)
    })
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveClass("juno-switch-invalid")
    expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  })
  
  test("renders a valid Switch as passed", async () => {
    act(() => {
      render(<Switch valid />)
    })
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveClass("juno-switch-valid")
    expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  })
  
  test("renders a default size switch by default", async () => {
    render(<Switch />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveClass("juno-switch-default")
  })
  
  test("renders a small switch as passed", async () => {
    render(<Switch size="small" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveClass("juno-switch-small")
  })
  
  test("renders a large switch as passed", async () => {
    render(<Switch size="large" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveClass("juno-switch-large")
  })
  
  test("renders an aria-checked switch as passed", async () => {
    act(() => {
      render(<Switch on />)
    })
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveAttribute('aria-checked')
  })
  
  test("renders an aria-checked attribute set to false if off", async () => {
    render(<Switch />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toHaveAttribute('aria-checked', "false")
  })
  
  test("renders a helptext as passed", async () => {
    render(<Switch helptext="this is a helptext"/>)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-help")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is a helptext")
  })
  
  test("renders a successtext as passed and validates the Element", async () => {
    render(<Switch successtext="great success!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-success")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("great success!")
    expect(screen.getByRole("switch")).toHaveClass("juno-switch-valid")
  })
  
  test("renders an errortext as passed and invalidates the Element", async () => {
    render(<Switch errortext="this is an error!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-error")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is an error!")
    expect(screen.getByRole("switch")).toHaveClass("juno-switch-invalid")
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
    act(() => {
      screen.getByRole('switch').click();
    })
    expect(onChangeSpy).toHaveBeenCalled();	
  })
  
  test("executes handler on click as passed", async () => {	
    const onClickSpy = jest.fn();
    render(<Switch onClick={onClickSpy} />);
    act(() => {
      screen.getByRole('switch').click();
    })
    expect(onClickSpy).toHaveBeenCalled();	
  })
  
  test("does not execute handler on change when disabled", async () => {	
      const onChangeSpy = jest.fn();
      render(<Switch onChange={onChangeSpy} disabled/>);
      act(() => {
        screen.getByRole('switch').click();
      })
      expect(onChangeSpy).not.toHaveBeenCalled();	
    })
    
  test("does not execute handler on click when disabled", async () => {	
    const onClickSpy = jest.fn();
    render(<Switch onClick={onClickSpy} disabled/>);
    act(() => {
      screen.getByRole('switch').click();
    })
    expect(onClickSpy).not.toHaveBeenCalled();	
  })

})
