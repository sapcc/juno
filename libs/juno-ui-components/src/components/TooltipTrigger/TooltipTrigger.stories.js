/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Tooltip } from '../Tooltip/index.js';
import { TooltipContent } from '../TooltipContent/index.js';
import { TooltipTrigger } from './index.js';
import { Icon } from '../Icon/index.js';
import { Button } from '../Button/index.js';

export default {
  title: 'Components/Tooltip/TooltipTrigger',
  component: TooltipTrigger,
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="jn-my-6 jn-flex jn-justify-center">
        <Tooltip initialOpen={true}>
          <Story />
          <TooltipContent>This is a tooltip</TooltipContent>
        </Tooltip>
      </div>
    ),
  ],
};

const Template = ({ ...args }) => {
  return <TooltipTrigger {...args}>clickMe</TooltipTrigger>;
};

const TemplateAsChildAnchor = ({ ...args }) => {
  return (
    <TooltipTrigger asChild={true} {...args}>
      <Icon />
    </TooltipTrigger>
  );
};

export const Default = {
  render: Template,
  args: {},
};

export const AsChildTooltipTrigger = {
  render: TemplateAsChildAnchor,

  args: {},

  parameters: {
    docs: {
      description: {
        story:
          'If the asChild option is set on the TooltipTrigger the passed child element is used as the tooltip trigger. This is useful for when you want to use e.g. an Icon or Button as the trigger',
      },
    },
  },
};
