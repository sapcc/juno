import Decorator from "./Decorator"
import { getCurrentTheme } from "./themes"
import DocsContainer from "./DocsContainer"

export const decorators = [Decorator]
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
  Stories,
} from "@storybook/addon-docs"

export default {
  parameters: {
    docs: {
      theme: getCurrentTheme(),
      container: DocsContainer,
      // container: () => "TEST",
    },
  },
}
