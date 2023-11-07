import React from 'react';
import { FilterPill } from './index.js';

export default {
  title: 'Deprecated/Filter/FilterPill',
  component: FilterPill,
  argTypes: {},
};

export const Default = {
  args: {
    filterKey: 'os',
    filterKeyLabel: 'OS',
    filterValue: 'mac_os',
    filterValueLabel: 'Mac OS',
  },
};
