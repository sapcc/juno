import React from 'react';
import { ThemeToggle } from './index.js';

export default {
  title: 'WiP/ThemeToggle',
  component: ThemeToggle,
  argTypes: {},
};

const Template = (args) => <ThemeToggle {...args} />;

export const Default = Template.bind({});
Default.args = {}