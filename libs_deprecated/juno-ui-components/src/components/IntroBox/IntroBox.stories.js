/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IntroBox } from './index.js';
import heroImage from '../../img/app_bg_example.svg?url';

export default {
  title: 'Components/IntroBox',
  component: IntroBox,
  argTypes: {
    children: {
      control: false,
    },
  },
};

export const Default = {
  args: {
    text: 'Default IntroBox.',
  },
};

export const WithTitle = {
  args: {
    title: 'IntroBox',
    text: 'IntroBox with title.',
  },
};

export const Hero = {
  args: {
    title: 'IntroBox',
    text: 'Hero IntroBox has a larger font size and more padding',
    variant: 'hero',
  },
};

export const HeroWithBGImage = {
  args: {
    title: 'IntroBox',
    text: 'Hero IntroBox with background image. Background image must be referenced as a css bg image string. Import svg images with query param ?url.',
    variant: 'hero',
    heroImage: `url(${heroImage})`,
  },
};
