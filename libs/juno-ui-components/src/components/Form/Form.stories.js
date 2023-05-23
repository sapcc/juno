import React from "react"
import { Form } from "./index.js"
import { FormRow } from "../FormRow/index.js"
import { FormSection } from "../FormSection/index.js"
import { FormHint } from "../FormHint/index.js"
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
    <FormRow key="f-1">
      <TextInput label="First Name" id="first-name"/>
    </FormRow>,
    <FormRow key="f-2">
      <TextInput label="Last Name" id="last-name"/>
    </FormRow>,
    <FormRow key="f-3">
      <TextInput label="Email" id="email" type="email" required />
    </FormRow>,
    <ButtonRow key="f-4">
      <Button>Cancel</Button>
      <Button variant="primary">Submit</Button>
    </ButtonRow>
  ],
}


export const ComplexForm = Template.bind({})
ComplexForm.args = {
  title: "A Complex Form",
  children: [
    <IntroBox text="In order to get to know you, we need to talk about colors." key="ib-1"/>,
    <FormSection title="First Section of the Form" key="fs-1">
      <FormRow key="fr-1">
        <Select label="Your Favorite Color" placeholder="Select your favorite color…" id="color">
          <SelectOption value="red" key="so-1">Red</SelectOption>
          <SelectOption value="blue" key="so-2">Blue</SelectOption>
          <SelectOption value="other" key="so-3">Other</SelectOption>
        </Select>
        <FormHint text="Your favorite color to the best of your knowledge" />
      </FormRow>
      <FormRow key="fr-2">
        <TextInput label="First Name" id="first-name"/>
      </FormRow>
      <FormRow key="fr-3">
        <TextInput label="Last Name" id="last-name"/>
      </FormRow>
    </FormSection>,
    <FormSection title="Second Section of the Form" key="fs-2">
      <RadioGroup name="color-radios" label="In case you are not sure, select your true favorite color:">
        <RadioRow key="r-1" id="color-red" label="Red" value="red"/>
        <RadioRow key="r-2" id="color-blue" label="Blue" value="blue"/>
        <RadioRow key="r-3" id="color-green" label="Green" value="green"/>
        <RadioRow key="r-4" id="color-yellow" label="Yellow" value="yellow"/>
      </RadioGroup>
      <CheckboxGroup name="all-about-red" label="What is your opinion towards the color Red?">
        <CheckboxRow key="c-1" id="overrated" label="Red is vastly overrated" value="overrated"/>
        <CheckboxRow key="c-2" id="blackisred" label="Black is better" value="blackisbetter"/>
      </CheckboxGroup>
      <FormRow key="fr-4">
        <Textarea label="Your Message" id="message" placeholder="If there is something else we should know about you – now is the time!"/>
      </FormRow>
      <FormRow>
        <TextInput invalid value="Error!" />
        <FormHint variant="error" text="A textInput with an error for no reason whatsoever." />
      </FormRow>
      <FormRow key="fr-5">
        <Switch label="Wake me up at 4.30am" id="wakey" />
      </FormRow>
      <FormRow key="fr-6">
        <Switch label="Send me an email, too" id="email-too"/>
      </FormRow>
    </FormSection>,
    <ButtonRow key="br-1">
      <Button>Cancel</Button>
      <Button variant="primary-danger">Clear</Button>
      <Button variant="primary">Submit</Button>
    </ButtonRow>
  ]
}



