import React from "react"
import { InputGroup } from "./index.js"
import { Button } from "../Button/index"
import { Select } from "../Select/index"
import { SelectOption } from "../SelectOption/index"
import { TextInput } from "../TextInput/index"

export default {
  title: "WiP/InputGroup",
  component: InputGroup,
  argTypes: {},
}

const Template = (args) => <InputGroup {...args} />

export const Default = Template.bind({})
Default.args = {
  children: [
    <Button label="Button 1"/>,
    <Button>Button 2</Button>,
    <Button label="Button 3"/>
  ]
}

export const PrimaryInputGroup = Template.bind({})
PrimaryInputGroup.args = {
  variant: "primary",
  children: [
    <Button label="Primary Button" />,
    <Button label="Primary Button" />,
    <Button label="Primary Button" />
  ]
}

export const PrimaryDangerInputGroup = Template.bind({})
PrimaryDangerInputGroup.args = {
  variant: "primary-danger",
  children: [
    <Button label="Primary Danger Button" />,
    <Button label="Primary Danger Button" variant="primary" />,
    <Button label="Primary Danger Button" />
  ]
}

export const SubduedInputGroup = Template.bind({})
SubduedInputGroup.args = {
  variant: "subdued",
  children: [
    <Button label="Subdued Button" />,
    <Button label="Subdued Button" />,
    <Button label="Subdued Button" />
  ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: [
    <Button label="Button" />,
    <Button label="Button" />,
    <Button label="Button" />
  ]
}

export const IconButtons = Template.bind({})
IconButtons.args = {
  children: [
    <Button icon="home" />,
    <Button icon="help" />,
    <Button icon="forum" />
  ]
}

export const TextInputWithButton = Template.bind({})
TextInputWithButton.args = {
  children: [
    <TextInput placeholder="Enter a value…" />,
    <Button label="Submit"/>
  ]
}

export const MultipleTextInputsWithButton = Template.bind({})
MultipleTextInputsWithButton.args = {
  children: [
    <TextInput placeholder="First Name" />,
    <TextInput placeholder="Last Name" />,
    <Button label="Submit"/>
  ]
}

export const ButtonWithOptions = Template.bind({})
ButtonWithOptions.args = {
  children: [
    <Button label="Button with Options" />,
    <Select>
      <SelectOption value="1" label="Action 1"/>
      <SelectOption value="2" label="Action 2"/>
    </Select>
  ]
}

export const SelectWithTextInput = Template.bind({})
SelectWithTextInput.args = {
  children: [
    <Select>
      <SelectOption value="1" label="Action 1"/>
      <SelectOption value="2" label="Action 2"/>
    </Select>,
    <TextInput placeholder="Value…"/>
  ]
}

export const TextInputWithButtonAndOptions = Template.bind({})
// The placeholder below will render once implemented in Select:
TextInputWithButtonAndOptions.args = {
  children: [
    <TextInput placeholder="Enter Value…" />,
    <Button label="Submit" />,
    <Select placeholder="Other Actions…"> 
      <SelectOption value="1" label="Save"/>
      <SelectOption value="2" label="Delete"/>
    </Select>
  ]
}

export const SelectWithSelect = Template.bind({})
SelectWithSelect.args = {
  children: [
    <Select>
      <SelectOption value="1" label="Action 1"/>
      <SelectOption value="2" label="Action 2"/>
    </Select>,
    <Select>
      <SelectOption value="2-1" label="Action 1"/>
      <SelectOption value="2-2" label="Action 2"/>
    </Select>,
  ]
}
