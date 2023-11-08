import React from 'react';
import { TabPanel } from './index.js';

export default {
  title: 'Layout/Tabs/TabPanel',
  component: TabPanel,
  argTypes: {
    children: {
      control: false,
    },
  },
};

export const Default = {
  args: {
    children: 'Tab panel content goes here.',
  },
};
