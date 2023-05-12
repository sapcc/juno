import React from "react"
import { Form } from "./index.js"
import { FormRow } from "../FormRow/index.js"
import { TextInput } from "../TextInput/index.js"
import { Button } from "../Button/index.js"
import { ButtonRow } from "../ButtonRow/index.js"

export default {
  title: "Forms/Form",
  component: Form,
  argTypes: {
    items: {
      table: {
        disable: true
      }
    }
  }
}

const Template = ({ children, ...args }) => (
  <Form {...args}>
    { children }
  </Form>
)

export const Default = Template.bind({})
Default.args = {
  title: "A Simple Form",
  children: [
    <FormRow>
      <TextInput label="First Name" id="first-name"/>
    </FormRow>,
    <FormRow>
      <TextInput label="Last Name" id="last-name"/>
    </FormRow>,
    <FormRow>
      <TextInput label="Email" id="email" type="email" required />
    </FormRow>,
    <ButtonRow>
      <Button>Cancel</Button>
      <Button variant="primary">Submit</Button>
    </ButtonRow>
  ],
}



