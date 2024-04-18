/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Tab } from './index.js';
import { Icon } from '../Icon/index.js';
import { knownIcons } from '../Icon/Icon.component.js';

export default {
  title: 'Layout/Tabs/Tab',
  component: Tab,
  argTypes: {
    icon: {
      options: ['default', ...knownIcons],
      control: { type: 'select' },
    },
    children: {
      control: false,
    },
  },
};

export const Default = {
  args: {
    label: 'A Tab Label',
    children: 'Tab 1',
  },
};

export const WithIcon = {
  args: {
    children: 'Tab with Icon',
    icon: 'danger',
  },
};
