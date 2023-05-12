import React from 'react';
import { FormRow } from './index.js';
import { TextInput } from '../TextInput/index.js'

export default {
  title: 'Forms/FormRow',
  component: FormRow,
};

const Template = ({ children, ...args}) => (
  <FormRow {...args}>
    { children }
  </FormRow>
);

export const Default = Template.bind({});

Default.args = {
  children: [
    <TextInput label="TextInput in a FormRow" placeholder="Your input here…"/>
  ],
};


