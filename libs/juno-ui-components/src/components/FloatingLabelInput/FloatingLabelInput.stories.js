import React from "react"

import { FloatingLabelInput } from "./index.js"

export default {
  title: "Design System/Forms/FloatingLabelInput",
  component: FloatingLabelInput,
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    value: { control: "text" },
    type: {
      control: { type: "select", options: ["text", "password", "number"] },
    },
    onChange: { action: "change value" },
  },
}

export const TextInput = ({ ...props }) => {
  const [user, setUser] = React.useState(props.value || "")
  return (
    <FloatingLabelInput
      type="text"
      {...props}
      value={user}
      onChange={(e) => setUser(e.target.value)}
    />
  )
}

export const PasswordInput = ({ ...props }) => {
  const [user, setUser] = React.useState(props.value || "")
  return (
    <FloatingLabelInput
      label="Password"
      type="password"
      {...props}
      value={user}
      onChange={(e) => setUser(e.target.value)}
    />
  )
}
