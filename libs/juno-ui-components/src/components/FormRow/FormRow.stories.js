import React from 'react';
import { FormRow } from './index.js';
import { TextInput } from '../TextInput/index.js';

export default {
  title: 'Forms/FormRow',
  component: FormRow,
  argTypes: {
    children: {
      control: false,
    },
  },
};

const Template = ({ children, ...args }) => <FormRow {...args}>{children}</FormRow>;

export const Default = {
  render: Template,

  args: {
    children: [<TextInput label="TextInput in a FormRow" placeholder="Your input here…" key="1" />],
  },
};
