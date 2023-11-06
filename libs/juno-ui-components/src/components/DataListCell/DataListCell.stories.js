import React from 'react';
import { DataListCell } from './index.js';

export default {
  title: 'Deprecated/DataList/DataListCell',
  component: DataListCell,
  argTypes: {
    children: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'DataList is deprecated and will be removed. Please use DataGrid instead.',
      },
    },
  },
};

const Template = (args) => <DataListCell {...args}></DataListCell>;

export const Default = {
  render: Template,

  parameters: {
    docs: {
      description: {
        story: 'Juno DataListCell for displaying data',
      },
    },
  },

  args: {
    children: ['DataListCell'],
  },
};
