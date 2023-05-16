import React from "react"
import { Form } from "./index.js"
import { FormRow } from "../FormRow/index.js"
import { FormSection } from "../FormSection/index.js"
import { TextInput } from "../TextInput/index.js"
import { Select } from "../Select/index.js"
import { SelectOption } from "../SelectOption/index.js"
import { Switch } from "../Switch/index.js"
import { Textarea } from "../Textarea/index.js"
import { RadioGroup } from "../RadioGroup/index.js"
import { RadioRow } from "../RadioRow/index.js"
import { CheckboxGroup } from "../CheckboxGroup/index.js"
import { CheckboxRow } from "../CheckboxRow/index.js"
import { Button } from "../Button/index.js"
import { ButtonRow } from "../ButtonRow/index.js"
import { IntroBox } from "../IntroBox/index.js"

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


export const ComplexForm = Template.bind({})
ComplexForm.args = {
  title: "A Complex Form",
  children: [
    <IntroBox text="In order to get to know you, we need to talk about colors."/>,
    <FormSection title="First Section of the Form">
      <FormRow>
        <Select label="Your Favorite Color" placeholder="Select your favorite color…" id="color">
          <SelectOption value="red" key="1">Red</SelectOption>
          <SelectOption value="blue" key="2">Blue</SelectOption>
          <SelectOption value="other" key="3">Other</SelectOption>
        </Select>
      </FormRow>
      <FormRow>
        <TextInput label="First Name" id="first-name"/>
      </FormRow>
      <FormRow>
        <TextInput label="Last Name" id="last-name"/>
      </FormRow>
    </FormSection>,
    <FormSection title="Second Section of the Form">
      <RadioGroup name="color-radios" label="In case you are not sure, select your true favorite color:">
        <RadioRow id="color-red" label="Red" value="red"/>
        <RadioRow id="color-blue" label="Blue" value="blue"/>
        <RadioRow id="color-green" label="Green" value="green"/>
        <RadioRow id="color-yellow" label="Yellow" value="yellow"/>
      </RadioGroup>
      <CheckboxGroup name="all-about-red" label="What is your opinion towards the color Red?">
        <CheckboxRow id="overrated" label="Red is vastly overrated" value="overrated"/>
        <CheckboxRow id="blackisred" label="Black is better" value="blackisbetter"/>
      </CheckboxGroup>
      <FormRow>
        <Textarea label="Your Message" id="message" placeholder="If there is something else we should know about you – now is the time!"/>
      </FormRow>
      <FormRow>
        <Switch label="Wake me up at 4.30am" />
      </FormRow>
      <FormRow>
        <Switch label="Send me an email, too" />
      </FormRow>
    </FormSection>,
    <ButtonRow>
      <Button>Cancel</Button>
      <Button variant="primary-danger">Clear</Button>
      <Button variant="primary">Submit</Button>
    </ButtonRow>
  ]
}



