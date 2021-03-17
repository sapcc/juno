import React from "react"

import { Modal } from "../components/Modal/index.js"
import { Button } from "../components/Button/index.js"

export default {
  title: "Example/Modal",
  component: Modal,
  argTypes: {
    backgroundColor: { control: "color" },
    labelColor: { control: "color" },
    hoverColor: { control: "color" },
    outlineColor: { control: "color" },
  },
}

const Template = (args) => <Modal {...args} />

export const Open = Template.bind({})
Open.args = {
  isOpen: true,
}

export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button mode="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

// export const Danger = Template.bind({})
// Danger.args = {
//   mode: "danger",
//   label: "Button",
// }

// export const Warning = Template.bind({})
// Warning.args = {
//   mode: "warning",
//   label: "Button",
// }

// export const Secondary = Template.bind({})
// Secondary.args = {
//   label: "Button",
// }

// export const Large = Template.bind({})
// Large.args = {
//   size: "large",
//   label: "Button",
// }

// export const Small = Template.bind({})
// Small.args = {
//   size: "small",
//   label: "Button",
// }
