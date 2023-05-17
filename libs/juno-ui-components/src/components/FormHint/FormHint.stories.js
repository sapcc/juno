import React from 'react';
import { FormHint } from './index.js'

export default {
  title: 'Forms/FormHint',
  component: FormHint,
};

const Template = ({ children, ...args}) => (
  <FormHint {...args}>
    { children }
  </FormHint>
)

export const Default = Template.bind({})
Default.args = {
  text: "A simple hint to be associated with a form input"
}

export const WithChildren = Template.bind({})
WithChildren.args = {
  children: <>A FormHint with a <a href="#">Link</a>.</>
}

export const ErrorVariant = Template.bind({})
ErrorVariant.args = {
  variant: "error",
  text: "A FormHint containing an error or invalidation message"
}

export const SuccessVariant = Template.bind({})
SuccessVariant.args = {
  variant: "success",
  text: "A FormHint containg a success or validation message"
}
