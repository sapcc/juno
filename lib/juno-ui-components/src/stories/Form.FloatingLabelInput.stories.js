// import React from "react"

// import { FloatingLabelInput } from "../components/Form/FloatingLabelInput.js"

// export default {
//   title: "Example/Form",
//   component: FloatingLabelInput,
//   argTypes: {
//     label: { control: "text" },
//     name: { control: "text" },
//     value: { control: "text" },
//     onChange: { control: "func" },
//   },
// }

// const Template = (args) => <FloatingLabelInput {...args} />

// export const TextInput = Template.bind({})
// FloatingLabelInput.args = {
//   label: "Label",
//   name: "test",
//   value: "Hello",
// }

import React from "react"

import { FloatingLabelInput } from "../components/Form/index.js"

export default {
  title: "Example/Form/FloatingLabelInput",
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
