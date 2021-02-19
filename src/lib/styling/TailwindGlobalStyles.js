
// This import from a separatre file is a workaround for a bug in styled components:
// https://github.com/ben-rogerson/twin.examples/tree/master/react-styled-components
import { GlobalStyles as TailwindGlobalStyles } from 'twin.macro'

export default function GlobalStylesComponent() {
  return <TailwindGlobalStyles />
}