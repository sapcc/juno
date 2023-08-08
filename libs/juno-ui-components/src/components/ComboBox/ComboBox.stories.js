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


export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "ComboBox",
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