import React from 'react';
import { Pill } from './index.js';

export default {
  title: 'Components/Pill',
  component: Pill,
  argTypes: {},
};

export const Default = {
  args: {
    pillKey: 'os',
    pillKeyLabel: 'OS',
    pillValue: 'mac_os',
    pillValueLabel: 'Mac OS',
  },
};

export const Closeable = {
  args: {
    pillKey: 'os',
    pillKeyLabel: 'OS',
    pillValue: 'mac_os',
    pillValueLabel: 'Mac OS',
    closeable: true,
  },
};

export const ValueOnly = {
  args: {
    pillValue: 'mac_os',
    pillValueLabel: 'Mac OS',
  },
};

export const ValueOnlyCloseable = {
  args: {
    pillValue: 'mac_os',
    pillValueLabel: 'Mac OS',
    closeable: true,
  },
};
