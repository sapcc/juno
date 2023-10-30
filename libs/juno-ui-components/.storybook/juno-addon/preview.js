import Decorator from "./Decorator"
import { getCurrentTheme } from "./themes"
import DocsContainer from "./DocsContainer"

import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
  Stories,
} from "@storybook/addon-docs"

export const decorators = [Decorator]

export default {
  parameters: {
    docs: {
      theme: getCurrentTheme(),
      container: DocsContainer,
    },
  },
}
