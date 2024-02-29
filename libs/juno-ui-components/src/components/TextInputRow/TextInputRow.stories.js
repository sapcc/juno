import React from 'react';
import { TextInputRow } from './index.js';

export default {
  title: 'Deprecated/TextInputRow',
  component: TextInputRow,
  argTypes: {
    type: {
      options: ['text', 'password', 'email', 'tel', 'url', 'number'],
      control: { type: 'select' },
    },
    children: {
      control: false,
    },
  },
};

const Template = ({...args}) => (<TextInputRow {...args} />)

export const Default = Template.bind({})
Default.args= {
  label: "Default TextINputRow",
}


export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled TextInputRow",
  disabled: true,
}


export const WithHelpText = Template.bind({})
WithHelpText.args = {
  label: 'Text Input Row with Help Text',
  helptext: 'Oh so helpful helptext',
}


export const WithHelpTextWithLink = Template.bind({})
WithHelpTextWithLink.args = {
  label: 'Text Input Row with Help Text containing a link',
  helptext: <> Helptext with a <a href="#">Link</a></>
}



export const Required = Template.bind({})
Required.parameters = {
  docs: {
    description: {
      story:
        'Setting `required` to true to render the required marker to the label. Note that this will not set the html-`required` attribute in the rendered. You will have to manage checking for completeness and showing error messages yourself.',
    }
  }
}
Required.args = {
  label: 'Required Input Row',
  required: true,
  helptext: 'this field is required',
}

export const Invalid = Template.bind({})
Invalid.parameters = {
  docs: {
    description: {
      story:
        'Set `invalid` to true to invalidate the field and render the associated styles and the icon.',
    }
  }
}
Invalid.args = {
  required: true,
  label: 'Invalid Input Row',
  invalid: true,
}




export const WithErrorText = Template.bind({})
WithErrorText.parameters = {
  docs: {
    description: {
        story:
          'Passing an `errortext` prop to the TextInputRow component will automatically invalidate it, so there is no need to explicitly set `invalid` as well.',
    }
  }
}
WithErrorText.args = {
  label: 'Input Row with Error Text',
  helptext: 'Oh so helpful helptext',
  errortext: 'When passed an errortext prop, the InputRow will be set to invalid automatically.',
}


export const Valid = Template.bind({})
Valid.parameters = {
  docs: {
    description: {
      story:
        'Set `valid` to true to set the field to valid and render the associated styles and the icon.',
    }
  }
}
Valid.args = {
  label: 'Valid Input Row',
  valid: true,
}

export const WithSuccessText = Template.bind({})
WithSuccessText.parameters = {
  docs: {
    description: {
      story:
        'Passing a `successtext` prop to the TextInputRow component will automatically set it to valid, so there is no need to explicitly set `valid` as well.',
    }
  }
}
WithSuccessText.args = {
  label: 'Input Row with Success Text',
  successtext: 'When passed an errortext prop, the InputRow will be set to invalid automatically.',
}


export const Autofocus = Template.bind({})
Autofocus.parameters = {
  docs: {
    description: {
      story: 'Set `autoFocus` to true to automatically focus the input.',
    }
  }
}
Autofocus.args = {
  autoFocus: true,
  label: 'Text Input Row',
}
