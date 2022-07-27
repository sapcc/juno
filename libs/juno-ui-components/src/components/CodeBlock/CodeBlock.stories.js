import React from "react"

import { CodeBlock } from "./index.js"

export default {
  title: "Components/CodeBlock",
  component: CodeBlock,
  argTypes: {},
}

const Template = (args) => <CodeBlock {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Default CodeBlock",
    },
  },
}
Default.args = {
  children: "Some code goes here",
}

export const WithHeading = Template.bind({})
WithHeading.parameters = {
  docs: {
    description: {
      story: "Default CodeBlock, no heading",
    },
  },
}
WithHeading.args = {
  children: "Some code goes here",
  heading: "My code",
}

export const WithTabs = Template.bind({})
WithTabs.parameters = {
  docs: {
    description: {
      story: "Tabbed Codeblock"
    }
  }
}
WithTabs.args = {
  tabs: ["React.js", "Vue.js", "Svelte.js", "html"],
  contents: [
    "<Component />",
    "<VueComponent />",
    "SvelteComponent />",
    "<div>Component</div>",
  ]
}

export const MultiLineWithHeading = Template.bind({})
MultiLineWithHeading.parameters = {
  docs: {
    description: {
      story: "Multiline CodeBlock",
    },
  },
}
MultiLineWithHeading.args = {
  heading: "index.html",
  children: `<html lang="en">
<head>
	<title="Multi-line Html" />
</head>
<body>
	<main>
	</main>
</body>
</html>
`,
}

export const FixedSize = Template.bind({})
FixedSize.parameters = {
  docs: {
    description: {
      story: "Fixed size CodeBlock with overflow scrollbars",
    },
  },
}
FixedSize.args = {
  size: "small",
  children:
    "-------- BEGIN CERTIFICATE -------- \n30818902818100C4A06B7B52F8D17DC1CCB47362C64AB799AAE19E245A7559E9CEEC7D8AA4DF07CB0B21FDFD763C63A313A668FE9D764ED913C51A676788DB62AF624F422C2F112C1316922AA5D37823CD9F43D1FC54513D14B2-9E36991F08A042C42EAAEEE5FE8E2CB10167174A359CEBF6FACC2C9CA933AD403137EE2C3F4CBED9460129C72B02030100030818902818100C4A06B7B52F8D17DC1CCB47362C64AB799AAE19E245A7559E9CEEC7D8AA4DF07CB0B21FDFD763C63A313A668FE9D764ED913C51A676788DB62AF624F422C2F112C1316922AA5D37823CD9F43D1FC54513D14B2-9E36991F08A042C42EAAEEE5FE8E2CB10167174A359CEBF6FACC2C9CA933AD403137E2C3F4CBED9460129C72B020301000 \n-------- END CERTIFICATE --------",
}

export const noWrap = Template.bind({})
noWrap.parameters = {
  docs: {
    description: {
      story: "Non-wrapping CodeBlock",
    },
  },
}
noWrap.args = {
  wrap: false,
  children:
    "-------- BEGIN CERTIFICATE -------- 30818902818100C4A06B7B52F8D17DC1CCB47362C64AB799AAE19E245A7559E9CEEC7D8AA4DF07CB0B21FDFD763C63A313A668FE9D764ED913C51A676788DB62AF624F422C2F112C1316922AA5D37823CD9F43D1FC54513D14B2-9E36991F08A042C42EAAEEE5FE8E2CB10167174A359CEBF6FACC2C9CA933AD403137EE2C3F4CBED9460129C72B02030100030818902818100C4A06B7B52F8D17DC1CCB47362C64AB799AAE19E245A7559E9CEEC7D8AA4DF07CB0B21FDFD763C63A313A668FE9D764ED913C51A676788DB62AF624F422C2F112C1316922AA5D37823CD9F43D1FC54513D14B2-9E36991F08A042C42EAAEEE5FE8E2CB10167174A359CEBF6FACC2C9CA933AD403137E2C3F4CBED9460129C72B020301000 -------- END CERTIFICATE --------",
}
