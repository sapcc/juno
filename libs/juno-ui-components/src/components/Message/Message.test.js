import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Message } from "./index"

describe("Message", () => {
  test("renders a Message", async () => {
    render(<Message data-testid="my-message" />)
    expect(screen.getByTestId("my-message")).toBeInTheDocument()
  })

  test("renders an info Message by default if no variant passed", async () => {
    render(<Message data-testid="my-message" />)
    expect(screen.getByTestId("my-message")).toHaveClass("juno-message-info")
    expect(screen.getByRole("img")).toHaveClass("text-theme-info")
  })

  test("renders a Message where the icon is not allowed to shrink", async () => {
    render(<Message data-testid="my-message" />)
    expect(screen.getByTestId("my-message")).toHaveClass("juno-message-info")
    expect(screen.getByRole("img")).toHaveClass("jn-shrink-0")
  })

  test("renders a Message that can be dismissed", async () => {
    render(<Message data-testid="my-message" dismissible={true} />)
    // not checking specifically for the close button here. So if there is more than one button in the message this test will fail
    // The reason is that it's hard to find specifically the close button because any classes added to a clickable Icon go to the image element, not the surrounding button
    expect(screen.getByRole("button")).toBeInTheDocument()
    userEvent.click(screen.getByRole("button"))
    await waitFor(() => {
      expect(screen.queryByTestId("my-message")).not.toBeInTheDocument()
    })
  })

  test("fires onDismiss handler when Message is manually dismissed", async () => {
    const handleDismiss = jest.fn()
    render(
      <Message
        data-testid="my-message"
        dismissible={true}
        onDismiss={handleDismiss}
      />
    )
    // not checking specifically for the close button here. So if there is more than one button in the message this test will fail
    // The reason is that it's hard to find specifically the close button because any classes added to a clickable Icon go to the image element, not the surrounding button
    expect(screen.getByRole("button")).toBeInTheDocument()
    userEvent.click(screen.getByRole("button"))
    await waitFor(() => {
      expect(screen.queryByTestId("my-message")).not.toBeInTheDocument()
      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })
  })

  test("renders a Message without dismiss button by default", async () => {
    render(<Message data-testid="my-message" />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  test("renders a Message without dismiss button", async () => {
    render(<Message data-testid="my-message" dismissible={false} />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  test("renders a Message that will be automatically dismissed", async () => {
    render(
      <Message
        data-testid="my-message"
        autoDismiss={true}
        autoDismissTimeout={500}
      />
    )
    await waitFor(
      () => {
        expect(screen.queryByTestId("my-message")).not.toBeInTheDocument()
      },
      { timeout: 1000 }
    )
  })

  test("fires onDismiss handler when Message is automatically dismissed", async () => {
    const handleDismiss = jest.fn()
    render(
      <Message
        data-testid="my-message"
        autoDismiss={true}
        autoDismissTimeout={500}
        onDismiss={handleDismiss}
      />
    )
    await waitFor(
      () => {
        expect(screen.queryByTestId("my-message")).not.toBeInTheDocument()
        expect(handleDismiss).toHaveBeenCalledTimes(1)
      },
      { timeout: 1000 }
    )
  })

  test("renders an info Message as passed", async () => {
    render(<Message data-testid="my-message" variant="info" />)
    expect(screen.getByTestId("my-message")).toHaveClass("juno-message-info")
    expect(screen.getByRole("img")).toHaveClass("text-theme-info")
  })

  test("renders a warning Message as passed", async () => {
    render(<Message data-testid="my-message" variant="warning" />)
    expect(screen.getByTestId("my-message")).toHaveClass("juno-message-warning")
    expect(screen.getByRole("img")).toHaveClass("text-theme-warning")
  })

  test("renders a danger message as passed", async () => {
    render(<Message data-testid="my-message" variant="danger" />)
    expect(screen.getByTestId("my-message")).toHaveClass("juno-message-danger")
    expect(screen.getByRole("img")).toHaveClass("text-theme-danger")
  })

  test("renders an error Message as passed", async () => {
    render(<Message data-testid="my-message" variant="error" />)
    expect(screen.getByTestId("my-message")).toHaveClass("juno-message-error")
    expect(screen.getByRole("img")).toHaveClass("text-theme-error")
  })

  test("renders a success Message as passed", async () => {
    render(<Message data-testid="my-message" variant="success" />)
    expect(screen.getByTestId("my-message")).toHaveClass("juno-message-success")
    expect(screen.getByRole("img")).toHaveClass("text-theme-success")
  })

  test("renders a title as passed", async () => {
    render(<Message data-testid="my-message" title="My Message Heading" />)
    expect(screen.getByTestId("my-message")).toHaveTextContent(
      "My Message Heading"
    )
  })

  test("renders a text as passed", async () => {
    render(
      <Message data-testid="my-message" text="My Message text goes here." />
    )
    expect(screen.getByTestId("my-message")).toHaveTextContent(
      "My Message text goes here."
    )
  })

  test("renders text as passed as children", async () => {
    render(
      <Message data-testid="my-message">
        {"My Message children text goes here!"}
      </Message>
    )
    expect(screen.getByTestId("my-message")).toHaveTextContent(
      "My Message children text goes here!"
    )
  })

  test("renders text as passed as children if both children and 'text' prop were passed", async () => {
    render(
      <Message data-testid="my-message" text="I should not be here.">
        {"My Message children text goes here!"}
      </Message>
    )
    expect(screen.getByTestId("my-message")).toHaveTextContent(
      "My Message children text goes here!"
    )
  })

  test("renders custom classNames as passed", async () => {
    render(<Message data-testid="my-message" className="my-custom-class" />)
    expect(screen.getByTestId("my-message")).toHaveClass("my-custom-class")
  })

  test("renders all props as passed", async () => {
    render(<Message data-testid="my-message" name="My shiny little Message" />)
    expect(screen.getByTestId("my-message")).toHaveAttribute(
      "name",
      "My shiny little Message"
    )
  })
})
