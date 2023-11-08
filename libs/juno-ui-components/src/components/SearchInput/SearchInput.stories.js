import React from 'react';
import { SearchInput } from './index.js';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {},
};

export const Default = {
  args: {},
};

export const Rounded = {
  args: {
    variant: 'rounded',
  },
};

export const Hero = {
  args: {
    variant: 'hero',
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};
