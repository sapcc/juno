import React from 'react';

import { AppShell } from './index.js';
import { PageHeader } from '../PageHeader/index';
import { PageFooter } from '../PageFooter/index';
import { TopNavigation } from '../TopNavigation/index';
import { TopNavigationItem } from '../TopNavigationItem/index';

export default {
  title: 'Layout/AppShell',
  component: AppShell,
  argTypes: {
    pageHeader: {
      control: false,
    },
    pageFooter: {
      control: false,
    },
    topNavigation: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

const Template = (args) => <AppShell {...args}>Content goes here</AppShell>;

export const Default = {
  render: Template,

  parameters: {
    docs: {
      description: {
        story:
          'Responsive shell for your application with content heading and default header and footer.',
      },
    },
  },

  args: {
    contentHeading: 'Content Heading',
  },
};

export const NoContentHeading = {
  render: Template,

  parameters: {
    docs: {
      description: {
        story: 'Responsive shell for your application without content heading.',
      },
    },
  },

  args: {},
};

export const AppName = {
  render: Template,

  parameters: {
    docs: {
      description: {
        story:
          'Responsive shell for your application with provided app name for the header and default footer.',
      },
    },
  },

  args: {
    ...Default.args,
    pageHeader: 'My App',
  },
};

export const CustomPageHeader = {
  render: Template,

  parameters: {
    docs: {
      description: {
        story: 'Responsive shell for your application with custom page header and default footer.',
      },
    },
  },

  args: {
    ...Default.args,
    pageHeader: <PageHeader heading="My Custom Header" />,
  },
};

export const CustomPageFooter = {
  render: Template,

  parameters: {
    docs: {
      description: {
        story: 'Responsive shell for your application with default header and custom footer.',
      },
    },
  },

  args: {
    ...Default.args,
    pageFooter: <PageFooter>My custom footer</PageFooter>,
  },
};

export const WithTopNavigation = {
  render: Template,

  parameters: {
    docs: {
      description: {
        story: 'Responsive shell for your application with top navigation.',
      },
    },
  },

  args: {
    ...Default.args,
    topNavigation: (
      <TopNavigation>
        <TopNavigationItem icon="home" label="Home" />
        <TopNavigationItem active label="Navigation Item" />
      </TopNavigation>
    ),
  },
};
