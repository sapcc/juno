import React from 'react';
import { TopNavigationItem } from './index.js';

export default {
  title: 'Layout/TopNavigation/TopNavigationItem',
  component: TopNavigationItem,
  argTypes: {
    children: {
      control: false,
    },
  },
  parameters: { actions: { argTypesRegex: null } },
};

export const Default = {
  args: {
    label: 'Navigation Item',
  },
};

export const WithIcon = {
  args: {
    label: 'Navigation Item',
    icon: 'warning',
  },
};

export const AsAnchor = {
  args: {
    label: 'Navigation Item',
    href: '#',
  },
};

export const AsButton = {
  args: {
    label: 'Navigation Item',
    onClick: () => {
      console.log('clicked');
    },
  },
};

export const Active = {
  args: {
    label: 'Navigation Item',
    active: true,
  },
};
