import React from "react"

import { FloatingLabelSelect } from "./index.js"

export default {
  title: "Design System/Forms/FloatingLabelSelect",
  component: FloatingLabelSelect,
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    value: { control: "text" },
    onChange: { action: "change value" },
  },
}

export const Options = ({ ...props }) => {
  const [option, setOption] = React.useState(props.value || "")
  return (
    <FloatingLabelSelect
      {...props}
      value={option}
      onChange={(e) => setOption(e.target.value)}
    >
      <option value="1">test option 1</option>
      <option value="2">test option 2</option>
      <option value="3">test option 3</option>
      <option value="4">test option 4</option>
      <option value="5">test option 5</option>
    </FloatingLabelSelect>
  )
}
