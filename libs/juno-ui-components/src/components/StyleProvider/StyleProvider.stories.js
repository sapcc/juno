import React from 'react';
import { StyleProvider } from './index';

export default {
  title: 'Layout/StyleProvider',
  component: StyleProvider,
  argTypes: {
    stylesWrapper: {
      options: ['head', 'inline', 'shadowRoot'],
      control: {
        type: 'radio',
      },
    },
    children: {
      control: false,
    },
  },
};

const Template = (args) => (
  <StyleProvider {...args}>{args.children || args.stylesWrapper || 'undefined'}</StyleProvider>
);

export const AddStylesToHead = {
  render: Template,

  args: {
    stylesWrapper: 'head',
  },
};

export const AddInlineStyles = {
  render: Template,

  args: {
    stylesWrapper: 'inline',
  },
};

export const AddStylesToShadowRoot = {
  render: Template,

  args: {
    stylesWrapper: 'shadowRoot',
  },
};

export const WithTheme = {
  render: Template,

  args: {
    stylesWrapper: 'shadowRoot',
    theme: 'theme-light',
    children: 'Light Theme',
  },
};
