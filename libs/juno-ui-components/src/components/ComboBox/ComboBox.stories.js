import React, { useState, useEffect } from "react"
import { ComboBox } from "./index.js"
import { ComboBoxOption } from "../ComboBoxOption/index.js"


export default {
  title: "Forms/ComboBox/ComboBox",
  component: ComboBox,
  argTypes: {},
}

const Template = ({children, ...args}) => {
  return (
    <ComboBox {...args}>
      { children }
    </ComboBox>
  )
}

const ConstrainedWidthTemplate = ({children, ...args}) => {
  return (
    <div style={ {width: "300px"} }>
      <ComboBox {...args}>
        { children }
      </ComboBox>
    </div>
  )
}

const ControlledTemplate = ( { value, children, ...args} ) => {
  const [v, setV] = useState(value)
  
  useEffect(() => {
    setV(value)
  }, [value])
  
  return (
    <ComboBox
      value={v}
    >
      { children }
    </ComboBox>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
    <ComboBoxOption value="Eggplant" key="7">Eggplant</ComboBoxOption>,
    <ComboBoxOption value="Zucchini" key="8">Zucchini</ComboBoxOption>,
    <ComboBoxOption value="Brussels sprouts" key="9">Brussels Sprouts</ComboBoxOption>,
    <ComboBoxOption value="Horseradish" key="10">Horseradish</ComboBoxOption>,
    <ComboBoxOption value="Green beans" key="11">Green Beans</ComboBoxOption>,
    <ComboBoxOption value="Mushrooms" key="12">Mushrooms</ComboBoxOption>,
    <ComboBoxOption value="Leek" key="13">Leek</ComboBoxOption>,
    <ComboBoxOption value="Artichokes" key="14">Artichokes</ComboBoxOption>,
    <ComboBoxOption value="Peas" key="15">Peas</ComboBoxOption>,
    <ComboBoxOption value="Potatoes" key="16">Potatoes</ComboBoxOption>,
  ]
}

export const ControlledComboBox = ControlledTemplate.bind({})
ControlledComboBox.args = {
  value: "Houdini",
  label: "A controlled ComboBox",
  children: [
    <ComboBoxOption value="Caligari" key="1">Caligari</ComboBoxOption>,
    <ComboBoxOption value="Houdini" key="2">Houdini</ComboBoxOption>,
    <ComboBoxOption value="Lencia" key="3"></ComboBoxOption>,
  ]
}

export const UncontrolledComboBox = Template.bind({})
UncontrolledComboBox.args = {
  defaultValue: "Lencia",
  label: "An uncontrolled ComboBox",
  children: [
    <ComboBoxOption value="Caligari" key="1">Caligari</ComboBoxOption>,
    <ComboBoxOption value="Houdini" key="2">Houdini</ComboBoxOption>,
    <ComboBoxOption value="Lencia" key="3"></ComboBoxOption>,
  ]
}


export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "ComboBox",
  placeholder: "",
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
    <ComboBoxOption value="Eggplant" key="7">Eggplant</ComboBoxOption>,
    <ComboBoxOption value="Zucchini" key="8">Zucchini</ComboBoxOption>,
    <ComboBoxOption value="Brussels sprouts" key="9">Brussels Sprouts</ComboBoxOption>,
    <ComboBoxOption value="Horseradish" key="10">Horseradish</ComboBoxOption>,
    <ComboBoxOption value="Green beans" key="11">Green Beans</ComboBoxOption>,
    <ComboBoxOption value="Mushrooms" key="12">Mushrooms</ComboBoxOption>,
    <ComboBoxOption value="Leek" key="13">Leek</ComboBoxOption>,
    <ComboBoxOption value="Artichokes" key="14">Artichokes</ComboBoxOption>,
    <ComboBoxOption value="Peas" key="15">Peas</ComboBoxOption>,
    <ComboBoxOption value="Potatoes" key="16">Potatoes</ComboBoxOption>,
  ]
}

export const WithLabelAndPlaceholder = Template.bind({})
WithLabelAndPlaceholder.args = {
  label: "ComboBox",
  placeholder: "Type or select an Option…",
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
    <ComboBoxOption value="Eggplant" key="7">Eggplant</ComboBoxOption>,
    <ComboBoxOption value="Zucchini" key="8">Zucchini</ComboBoxOption>,
    <ComboBoxOption value="Brussels sprouts" key="9">Brussels Sprouts</ComboBoxOption>,
    <ComboBoxOption value="Horseradish" key="10">Horseradish</ComboBoxOption>,
    <ComboBoxOption value="Green beans" key="11">Green Beans</ComboBoxOption>,
    <ComboBoxOption value="Mushrooms" key="12">Mushrooms</ComboBoxOption>,
    <ComboBoxOption value="Leek" key="13">Leek</ComboBoxOption>,
    <ComboBoxOption value="Artichokes" key="14">Artichokes</ComboBoxOption>,
    <ComboBoxOption value="Peas" key="15">Peas</ComboBoxOption>,
    <ComboBoxOption value="Potatoes" key="16">Potatoes</ComboBoxOption>,
  ]
}

export const Required = Template.bind({})
Required.args = {
  label: "Required ComboBox",
  required: true,
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
    <ComboBoxOption value="Eggplant" key="7">Eggplant</ComboBoxOption>,
    <ComboBoxOption value="Zucchini" key="8">Zucchini</ComboBoxOption>,
    <ComboBoxOption value="Brussels sprouts" key="9">Brussels Sprouts</ComboBoxOption>,
    <ComboBoxOption value="Horseradish" key="10">Horseradish</ComboBoxOption>,
    <ComboBoxOption value="Green beans" key="11">Green Beans</ComboBoxOption>,
    <ComboBoxOption value="Mushrooms" key="12">Mushrooms</ComboBoxOption>,
    <ComboBoxOption value="Leek" key="13">Leek</ComboBoxOption>,
    <ComboBoxOption value="Artichokes" key="14">Artichokes</ComboBoxOption>,
    <ComboBoxOption value="Peas" key="15">Peas</ComboBoxOption>,
    <ComboBoxOption value="Potatoes" key="16">Potatoes</ComboBoxOption>,
  ]
}

export const Valid = Template.bind({})
Valid.args = {
  label: "Valid ComboBox",
  valid: true,
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
    <ComboBoxOption value="Eggplant" key="7">Eggplant</ComboBoxOption>,
    <ComboBoxOption value="Zucchini" key="8">Zucchini</ComboBoxOption>,
    <ComboBoxOption value="Brussels sprouts" key="9">Brussels Sprouts</ComboBoxOption>,
    <ComboBoxOption value="Horseradish" key="10">Horseradish</ComboBoxOption>,
    <ComboBoxOption value="Green beans" key="11">Green Beans</ComboBoxOption>,
    <ComboBoxOption value="Mushrooms" key="12">Mushrooms</ComboBoxOption>,
    <ComboBoxOption value="Leek" key="13">Leek</ComboBoxOption>,
    <ComboBoxOption value="Artichokes" key="14">Artichokes</ComboBoxOption>,
    <ComboBoxOption value="Peas" key="15">Peas</ComboBoxOption>,
    <ComboBoxOption value="Potatoes" key="16">Potatoes</ComboBoxOption>,
  ]
}

export const Invalid = Template.bind({})
Invalid.args = {
  label: "invalid ComboBox",
  invalid: true,
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
    <ComboBoxOption value="Eggplant" key="7">Eggplant</ComboBoxOption>,
    <ComboBoxOption value="Zucchini" key="8">Zucchini</ComboBoxOption>,
    <ComboBoxOption value="Brussels sprouts" key="9">Brussels Sprouts</ComboBoxOption>,
    <ComboBoxOption value="Horseradish" key="10">Horseradish</ComboBoxOption>,
    <ComboBoxOption value="Green beans" key="11">Green Beans</ComboBoxOption>,
    <ComboBoxOption value="Mushrooms" key="12">Mushrooms</ComboBoxOption>,
    <ComboBoxOption value="Leek" key="13">Leek</ComboBoxOption>,
    <ComboBoxOption value="Artichokes" key="14">Artichokes</ComboBoxOption>,
    <ComboBoxOption value="Peas" key="15">Peas</ComboBoxOption>,
    <ComboBoxOption value="Potatoes" key="16">Potatoes</ComboBoxOption>,
  ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled ComboBox",
  disabled: true,
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
    <ComboBoxOption value="Eggplant" key="7">Eggplant</ComboBoxOption>,
    <ComboBoxOption value="Zucchini" key="8">Zucchini</ComboBoxOption>,
    <ComboBoxOption value="Brussels sprouts" key="9">Brussels Sprouts</ComboBoxOption>,
    <ComboBoxOption value="Horseradish" key="10">Horseradish</ComboBoxOption>,
    <ComboBoxOption value="Green beans" key="11">Green Beans</ComboBoxOption>,
    <ComboBoxOption value="Mushrooms" key="12">Mushrooms</ComboBoxOption>,
    <ComboBoxOption value="Leek" key="13">Leek</ComboBoxOption>,
    <ComboBoxOption value="Artichokes" key="14">Artichokes</ComboBoxOption>,
    <ComboBoxOption value="Peas" key="15">Peas</ComboBoxOption>,
    <ComboBoxOption value="Potatoes" key="16">Potatoes</ComboBoxOption>,
  ]
}

export const DisabledOption = Template.bind({})
DisabledOption.args = {
  label: "ComboBox with a Disabled Option",
  helptext: "Option Carrots should be disabled",
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2" disabled >Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>
  ]
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
  label: "ComboBox",
  helptext: "Helptext to describe meaning and significance of the ComboBox",
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
    <ComboBoxOption value="Eggplant" key="7">Eggplant</ComboBoxOption>,
    <ComboBoxOption value="Zucchini" key="8">Zucchini</ComboBoxOption>,
    <ComboBoxOption value="Brussels sprouts" key="9">Brussels Sprouts</ComboBoxOption>,
    <ComboBoxOption value="Horseradish" key="10">Horseradish</ComboBoxOption>,
    <ComboBoxOption value="Green beans" key="11">Green Beans</ComboBoxOption>,
    <ComboBoxOption value="Mushrooms" key="12">Mushrooms</ComboBoxOption>,
    <ComboBoxOption value="Leek" key="13">Leek</ComboBoxOption>,
    <ComboBoxOption value="Artichokes" key="14">Artichokes</ComboBoxOption>,
    <ComboBoxOption value="Peas" key="15">Peas</ComboBoxOption>,
    <ComboBoxOption value="Potatoes" key="16">Potatoes</ComboBoxOption>,
  ]
}

export const WithHelpTextAsNode = Template.bind({})
WithHelpTextAsNode.args = {
  label: "ComboBox",
  helptext: <>This is a helptext with a <a href="#">Link</a></>,
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
    <ComboBoxOption value="Eggplant" key="7">Eggplant</ComboBoxOption>,
    <ComboBoxOption value="Zucchini" key="8">Zucchini</ComboBoxOption>,
    <ComboBoxOption value="Brussels sprouts" key="9">Brussels Sprouts</ComboBoxOption>,
    <ComboBoxOption value="Horseradish" key="10">Horseradish</ComboBoxOption>,
    <ComboBoxOption value="Green beans" key="11">Green Beans</ComboBoxOption>,
    <ComboBoxOption value="Mushrooms" key="12">Mushrooms</ComboBoxOption>,
    <ComboBoxOption value="Leek" key="13">Leek</ComboBoxOption>,
    <ComboBoxOption value="Artichokes" key="14">Artichokes</ComboBoxOption>,
    <ComboBoxOption value="Peas" key="15">Peas</ComboBoxOption>,
    <ComboBoxOption value="Potatoes" key="16">Potatoes</ComboBoxOption>,
  ]
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  label: "ComboBox",
  errortext: "Invalidated by passing an errortext",
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
    <ComboBoxOption value="Eggplant" key="7">Eggplant</ComboBoxOption>,
    <ComboBoxOption value="Zucchini" key="8">Zucchini</ComboBoxOption>,
    <ComboBoxOption value="Brussels sprouts" key="9">Brussels Sprouts</ComboBoxOption>,
    <ComboBoxOption value="Horseradish" key="10">Horseradish</ComboBoxOption>,
    <ComboBoxOption value="Green beans" key="11">Green Beans</ComboBoxOption>,
    <ComboBoxOption value="Mushrooms" key="12">Mushrooms</ComboBoxOption>,
    <ComboBoxOption value="Leek" key="13">Leek</ComboBoxOption>,
    <ComboBoxOption value="Artichokes" key="14">Artichokes</ComboBoxOption>,
    <ComboBoxOption value="Peas" key="15">Peas</ComboBoxOption>,
    <ComboBoxOption value="Potatoes" key="16">Potatoes</ComboBoxOption>,
  ]
}

export const WithSuccessText = Template.bind({})
WithSuccessText.args = {
  label: "ComboBox",
  successtext: "Validated by passing a successtext",
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
    <ComboBoxOption value="Eggplant" key="7">Eggplant</ComboBoxOption>,
    <ComboBoxOption value="Zucchini" key="8">Zucchini</ComboBoxOption>,
    <ComboBoxOption value="Brussels sprouts" key="9">Brussels Sprouts</ComboBoxOption>,
    <ComboBoxOption value="Horseradish" key="10">Horseradish</ComboBoxOption>,
    <ComboBoxOption value="Green beans" key="11">Green Beans</ComboBoxOption>,
    <ComboBoxOption value="Mushrooms" key="12">Mushrooms</ComboBoxOption>,
    <ComboBoxOption value="Leek" key="13">Leek</ComboBoxOption>,
    <ComboBoxOption value="Artichokes" key="14">Artichokes</ComboBoxOption>,
    <ComboBoxOption value="Peas" key="15">Peas</ComboBoxOption>,
    <ComboBoxOption value="Potatoes" key="16">Potatoes</ComboBoxOption>,
  ]
}

export const NonNullable = Template.bind({})
NonNullable.args = {
  nullable: false,
  label: "Non-Nullable ComboBox",
  helptext: "This Select can not be reset to having no value selected. The last selected value will remian selected when emptying the input field.",
  children: [
    <ComboBoxOption value="Rhubarb" key="1">Rhubarb</ComboBoxOption>,
    <ComboBoxOption value="Carrots" key="2">Carrots</ComboBoxOption>,
    <ComboBoxOption value="Spinach" key="3">Spinach</ComboBoxOption>,
    <ComboBoxOption value="Tomatoes" key="4">Tomatoes</ComboBoxOption>,
    <ComboBoxOption value="Cucumbers" key="5">Cucumbers</ComboBoxOption>,
    <ComboBoxOption value="Cauliflower" key="6">Cauliflower</ComboBoxOption>,
  ]
}

export const NonTruncatedOptions = ConstrainedWidthTemplate.bind({})
NonTruncatedOptions.args = {
  children: [
    <ComboBoxOption value="Option with a very long title that is so long it will most likely not fit into the menu width, not at all really." key="1"></ComboBoxOption>,
    <ComboBoxOption value="Yet another option with a very long title that is so long it will most likely not fit into the menu width, not at all really." key="2"></ComboBoxOption>
  ]
}

export const TruncatedOptions = ConstrainedWidthTemplate.bind({})
TruncatedOptions.args = {
  truncateOptions: true,
  children: [
    <ComboBoxOption value="Option with a very long title that is so long it will most likely not fit into the menu width, not at all really." key="1"></ComboBoxOption>,
    <ComboBoxOption value="Yet another option with a very long title that is so long it will most likely not fit into the menu width, not at all really." key="2"></ComboBoxOption>
  ]
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  helptext: "ComboBox busy loading options",
}

export const Error = Template.bind({})
Error.args = {
  error: true,
  errortext: "ComboBox having trouble loading options"
}


export const ValueAndDefaultValue = Template.bind({})
ValueAndDefaultValue.args = {
  value: "Option 1",
  defaultValue: "Option 2",
  children: [
    <ComboBoxOption value="Option 1" />,
    <ComboBoxOption value="Option 2" />,
    <ComboBoxOption value="Option 3" />
  ]
}

