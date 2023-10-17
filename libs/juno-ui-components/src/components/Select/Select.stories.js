import React, { useState, useEffect } from "react"
import { Select } from "./Select.component"
import { SelectOption } from "../SelectOption/SelectOption.component"
import { PortalProvider } from "../PortalProvider/PortalProvider.component"

export default {
  title: "Forms/Select/Select",
  component: Select,
  argTypes: {
    variant: {
      options: [ 'default', 'primary', 'primary-danger', 'subdued' ],
      control: { type: 'select' }
    },
    errortext: {
      control: false
    },
    helptext: {
      control: false
    },
    successtext: {
      control: false
    },
    children: {
      control: false
    },
  },
  decorators: [
    (Story) => (
      <div className="jn-pb-12">
        <PortalProvider>
          <Story />
        </PortalProvider>
      </div>
    ),
  ],
}

const Template = ({children, ...args}) => {
  return (
    <Select {...args}>
      { children }
    </Select>
  )
}

const ConstrainedWidthTemplate = ({children, ...args}) => {
  return (
    <div style={ {width: "300px"} }>
      <Select {...args}>
        { children }
      </Select>
    </div>
  )
}

const ControlledTemplate = ({value, children, ...args}) => {
  const [v, setV] = useState(value)
  
  useEffect(() => {
    setV(value)
  }, [value])
  
  const handleChange = (val) => {
    setV(val)
  }
  
  return (
    <Select value={v} onChange={handleChange}>
      { children }
    </Select>
  )
}


export const Default = Template.bind({})
Default.args = {
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  placeholder: "Custom placeholder…",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Your label here",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const RequiredWithLabel = Template.bind({})
RequiredWithLabel.args = {
  label: "Required Select",
  required: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const DisabledOption = Template.bind({})
DisabledOption.args = {
  helptext: "Option 2 is not avilable",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" disabled />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithHelptext = Template.bind({})
WithHelptext.args = {
  helptext: "You may select anything, really.",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithHelptextAsNode = Template.bind({})
WithHelptextAsNode.args = {
  helptext: <>More Info <a href="#">here</a>.</>,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithErrortext = Template.bind({})
WithErrortext.args = {
  errortext: "Please rethink your selection, somethig seems fishy.",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithSuccesstext = Template.bind({})
WithSuccesstext.args = {
  successtext: "That seems to be a valid selection.",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const Error = Template.bind({})
Error.args = {
  error: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const ManyOptions = Template.bind({})
ManyOptions.args = {
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />,
    <SelectOption key="4" value="Option 4" />,
    <SelectOption key="5" value="Option 5" />,
    <SelectOption key="6" value="Option 6" />,
    <SelectOption key="7" value="Option 7" />,
    <SelectOption key="8" value="Option 8" />,
    <SelectOption key="9" value="Option 9" />,
    <SelectOption key="10" value="Option 10" />,
    <SelectOption key="11" value="Option 11" />,
    <SelectOption key="12" value="Option 12" />,
    <SelectOption key="13" value="Option 13" />,
    <SelectOption key="14" value="Option 14" />,
    <SelectOption key="15" value="Option 15" />
  ]
}

export const ControlledSelect = ControlledTemplate.bind({})
ControlledSelect.args = {
  value: "Option 3",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const UncontrolledSelect = Template.bind({})
UncontrolledSelect.args = {
  defaultValue: "Option 2",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const TruncatedOptions = ConstrainedWidthTemplate.bind({})
TruncatedOptions.args = {
  truncateOptions: true,
  children: [
    <SelectOption  
      value="Option with a very long title that will most likely not fit into the menu width" 
      key="1"
    />,
    <SelectOption 
      value="Another option with a very long title that will most likely not fit into the menu width" 
      key="2"      
    />,
    <SelectOption 
      value="Yet another option with a very long title that will most likely not fit into the menu width" 
      key="3"
    />
  ]
}

export const NonTruncatedOptions = ConstrainedWidthTemplate.bind({})
NonTruncatedOptions.args = {
  children: [
    <SelectOption  
      value="Option with a very long title that will most likely not fit into the menu width" 
      key="1"
    />,
    <SelectOption 
      value="Another option with a very long title that will most likely not fit into the menu width" 
      key="2"      
    />,
    <SelectOption 
      value="Yet another option with a very long title that will most likely not fit into the menu width" 
      key="3"
    />
  ]
}

export const WithChildrenOnly = Template.bind({})
WithChildrenOnly.args = {
  children: [
    <SelectOption key="1">Option 1</SelectOption>,
    <SelectOption key="2">Option 2</SelectOption>,
    <SelectOption key="3">Option 3</SelectOption>,
    <SelectOption key="4">Option 4</SelectOption>,
    <SelectOption key="5">Option 5</SelectOption>
  ]
}
WithChildrenOnly.parameters = {
  docs: {
    description: {
      story: "Alernatively to using a `value`-prop, strings as children can be passed."
    }
  }
}

export const OptionsWithLabels = Template.bind({})
OptionsWithLabels.args = {
  placeholder: "Please select",
  children: [
    <SelectOption value="option-1" label="Option 1" key="1" />,
    <SelectOption value="option-2" label="Option 2" key="2">Option 2 child is displayed if present</SelectOption>,
  ]
}
OptionsWithLabels.parameters = {
  docs: {
    description: {
      story: "Optionally the SelectOptions can be passed a `label`-prop if the value is not suitable for display. If in addition to the label prop the option has a child, then the child is displayed instead."
    }
  }
}

export const ControlledOptionsWithLabels = ControlledTemplate.bind({})
ControlledOptionsWithLabels.args = {
  placeholder: "Please select",
  value: "option-3",
  children: [
    <SelectOption value="option-1" label="Option 1" key="1" />,
    <SelectOption value="option-2" label="Option 2" key="2">Option 2 child is displayed if present</SelectOption>,
    <SelectOption value="option-3" label="Option 3" key="3" />,
  ]
}
ControlledOptionsWithLabels.parameters = {
  docs: {
    description: {
      story: "Optionally the SelectOptions can be passed a `label`-prop if the value is not suitable for display. If in addition to the label prop the option has a child, then the child is displayed instead."
    }
  }
}