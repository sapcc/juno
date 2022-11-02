import React from "react"
import { TextInputRow } from "./index.js"

export default {
  title: "Forms/TextInputRow",
  component: TextInputRow,
  argTypes: {},
}

const Template = (args) => <TextInputRow {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Text Input Row",
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled Text Input Row",
  disabled: true,
}
Disabled.parameters = {
  docs: {
    description: {
      story:
        "Set `disabled` to true to disable the input.",
    },
  },
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
  name: "my-input",
  label: "Text Input Row with Help Text",
  helptext: "Oh so helpful helptext",
}

export const WithHelpTextWithLink = Template.bind({})
const helptext = <>Helptext with a <a href="#">Link</a></>
WithHelpTextWithLink.args = {
  name: "my-input",
  label: "Text Input Row with Help Text containing a link",
  helptext: helptext,
}

export const Required = Template.bind({})
Required.args = {
  label: "Required Input Row",
  required: true,
}
Required.parameters = {
  docs: {
    description: {
      story:
        "Setting `required` to true to render the required marker to the label. Note that this will not set the html-`required` attribute in the rendered. You will have to manage checking for completeness and showing error messages yourself.",
    },
  },
}

export const Invalid = Template.bind({})
Invalid.args = {
  label: "Invalid Input Row",
  invalid: true,
}
Invalid.parameters = {
  docs: {
    description: {
      story:
        "Set `invalid` to true to invalidate the field and render the associated styles and the icon.",
    },
  },
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  label: "Input Row with Error Text",
  helptext: "Oh so helpful helptext",
  errortext: "When passed an errortext prop, the InputRow will be set to invalid automatically.",
}
WithErrorText.parameters = {
  docs: {
    description: {
      story:
        "Passing an `errortext` prop to the TextInputRow component will automatically invalidate it, so there is no need to explicitly set `invalid` as well.",
    },
  },
}

export const Valid = Template.bind({})
Valid.args = {
  label: "Valid Input Row",
  valid: true,
}
Valid.parameters = {
  docs: {
    description: {
      story:
        "Set `valid` to true to set the field to valid and render the associated styles and the icon.",
    },
  },
}

export const WithSuccessText = Template.bind({})
 WithSuccessText.args = {
  label: "Input Row with Success Text",
  helptext: "Oh so helpful helptext",
  successtext: "When passed an errortext prop, the InputRow will be set to invalid automatically.",
}
 WithSuccessText.parameters = {
  docs: {
    description: {
      story:
        "Passing a `successtext` prop to the TextInputRow component will automatically set it to valid, so there is no need to explicitly set `valid` as well.",
    },
  },
}

export const Autofocus = Template.bind({})
Autofocus.args = {
  autoFocus: true,
  label: "Text Input Row",
}
Autofocus.parameters = {
  docs: {
    description: {
      story:
        "Set `autoFocus` to true to automatically focus the input.",
    },
  },
}
