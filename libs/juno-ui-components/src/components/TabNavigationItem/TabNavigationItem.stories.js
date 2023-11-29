import React from 'react';
import { TabNavigation } from "../TabNavigation/index"
import { TabNavigationItem } from './index.js'
import { knownIcons } from "../Icon/Icon.component.js"

export default {
  title: 'Components/TabNavigation/TabNavigationItem',
  component: TabNavigationItem,
  argTypes: {
    icon: {
      options: [null, ...knownIcons],
      control: { type: 'select' },
    },
    onClick: {
      control: false,
    }
  },
  decorators: [(story) => <TabNavigation>{story()}</TabNavigation>],
};

export const Default = {
  args: {
    label: "Tab 1",
  }
}

export const Active = {
  args: {
    label: "Active TabNavigationItem",
    active: true,
  }
}

export const Disabled = {
  args: {
    label: "Disabled TabNavigationItem",
    disabled: true,
  }
}