import React from 'react';
import { TextareaRow } from './index.js';

export default {
  title: 'Deprecated/TextareaRow',
  component: TextareaRow,
  parameters: {
    docs: {
      description: {
        component:
          'DEPRECATED: A textarea row containing a textarea, associated label, optional helptext, and structural markup. This component is DEPRECATED, use Textarea instead.',
      },
    },
  },
  argTypes: {
    errortext: {
      control: false,
    },
    helptext: {
      control: false,
    },
    successtext: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export const Default = {
  args: {
    value: '',
    name: '',
    id: '',
    placeholder: '',
    required: false,
    invalid: false,
    errortext: '',
    valid: false,
    successtext: '',
    helptext: '',
    className: '',
    disabled: false,
    onChange: undefined,
    label: 'Textarea Row',
  },
};

export const Disabled = {
  args: {
    value: '',
    name: '',
    id: '',
    placeholder: '',
    required: false,
    invalid: false,
    errortext: '',
    valid: false,
    successtext: '',
    helptext: '',
    className: '',
    onChange: undefined,
    label: 'Disabled Textarea Row',
    disabled: true,
  },
};

export const WithHelpText = {
  args: {
    value: '',
    id: '',
    placeholder: '',
    required: false,
    invalid: false,
    errortext: '',
    valid: false,
    successtext: '',
    className: '',
    disabled: false,
    onChange: undefined,
    name: 'my-input',
    label: 'Textarea Row with Helptext',
    helptext: 'Oh so helpful helptext',
  },
};

export const WithHelpTextWithLink = {
  args: {
    value: '',
    id: '',
    placeholder: '',
    required: false,
    invalid: false,
    errortext: '',
    valid: false,
    successtext: '',
    className: '',
    disabled: false,
    onChange: undefined,
    name: 'my-input',
    label: 'Textarea Row with Helptext',
    helptext: (
      <>
        Helptext with a <a href="#">Link</a>
      </>
    ),
  },
};

export const Required = {
  args: {
    value: '',
    name: '',
    id: '',
    placeholder: '',
    invalid: false,
    errortext: '',
    valid: false,
    successtext: '',
    helptext: '',
    className: '',
    disabled: false,
    onChange: undefined,
    label: 'Required Textarea',
    required: true,
  },
};

export const Invalid = {
  args: {
    value: '',
    name: '',
    id: '',
    placeholder: '',
    required: false,
    errortext: '',
    valid: false,
    successtext: '',
    helptext: '',
    className: '',
    disabled: false,
    onChange: undefined,
    label: 'Invalid TextareaRow',
    invalid: true,
  },
};

export const WithErrorText = {
  args: {
    value: '',
    name: '',
    id: '',
    placeholder: '',
    required: false,
    invalid: false,
    valid: false,
    successtext: '',
    className: '',
    disabled: false,
    onChange: undefined,
    label: 'Textarea Row with Error Text',
    helptext: 'Oh so helpful helptext',
    errortext:
      'When passed an errortext prop, the TextareaRow will be set to invalid automatically.',
  },

  parameters: {
    docs: {
      description: {
        story:
          'Passing an `errortext` prop to the TextareaRow component will automatically invalidate it, so there is no need to explicitly set `invalid` as well.',
      },
    },
  },
};

export const Valid = {
  args: {
    value: '',
    name: '',
    id: '',
    placeholder: '',
    required: false,
    invalid: false,
    errortext: '',
    successtext: '',
    helptext: '',
    className: '',
    disabled: false,
    onChange: undefined,
    label: 'Valid TextareaRow',
    valid: true,
  },
};

export const WithSuccessText = {
  args: {
    value: '',
    name: '',
    id: '',
    placeholder: '',
    required: false,
    invalid: false,
    errortext: '',
    valid: false,
    helptext: '',
    className: '',
    disabled: false,
    onChange: undefined,
    label: 'Textarea Row with Success Text',
    helptext: 'Oh so helpful helptext',
    successtext:
      'When passed a successtext prop, the TextareaRow will be set to valid automatically.',
  },

  parameters: {
    docs: {
      description: {
        story:
          'Passing a `successtext` prop to the TextareaRow component will automatically set it to valid, so there is no need to explicitly set `valid` as well.',
      },
    },
  },
};
