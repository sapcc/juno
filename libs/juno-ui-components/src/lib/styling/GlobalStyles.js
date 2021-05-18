import React from "react"
import { Global, css } from "@emotion/react"
import { GlobalStyles as BaseStyles, theme } from "twin.macro"
import { lighten } from "polished"

const styles = css`
  /* Colors */
  :root {
    --color-primary-100: ${theme`colors.blue.100`};
    --color-primary-200: ${theme`colors.blue.200`};
    --color-primary-300: ${theme`colors.blue.300`};
    --color-primary-400: ${theme`colors.blue.400`};
    --color-primary-500: ${theme`colors.blue.500`};
    --color-primary-600: ${theme`colors.blue.600`};
    --color-primary-700: ${theme`colors.blue.700`};
    --color-primary-800: ${theme`colors.blue.800`};
    --color-primary-900: ${theme`colors.blue.900`};

    --color-neutral-100: ${theme`colors.gray.100`};
    --color-neutral-200: ${theme`colors.gray.200`};
    --color-neutral-300: ${theme`colors.gray.300`};
    --color-neutral-400: ${theme`colors.gray.400`};
    --color-neutral-500: ${theme`colors.gray.500`};
    --color-neutral-600: ${theme`colors.gray.600`};
    --color-neutral-700: ${theme`colors.gray.700`};
    --color-neutral-800: ${theme`colors.gray.800`};
    --color-neutral-900: ${theme`colors.gray.900`};
  }

  .theme-light {
    --color-globalBg: var(--color-primary-100);
    --color-globalForeground: var(--color-neutral-900);

    --color-button-primary-bg: ${theme`colors.sap-gold`};
    --color-button-primary-bg-hover: ${lighten(0.1, theme`colors.sap-gold`)};
    --color-button-primary-foreground: #fff;
    --color-button-default-bg: ${theme`colors.gray.400`};
    --color-button-default-bg-hover: ${lighten(0.1, theme`colors.gray.400`)};
    --color-button-default-foreground: #fff;
  }

  .theme-dark {
    --color-globalBg: #19232f;
    --color-globalForeground: var(--color-neutral-100);

    --color-button-primary-bg: ${theme`colors.sap-blue`};
    --color-button-primary-bg-hover: ${lighten(0.1, theme`colors.sap-blue`)};
    --color-button-primary-foreground: #fff;
    --color-button-default-bg: ${theme`colors.gray.300`};
    --color-button-default-bg-hover: ${lighten(0.1, theme`colors.gray.300`)};
    --color-button-default-foreground: ${theme`colors.gray.900`};
  }

  html,
  body {
    background: var(--color-globalBg);
    color: var(--color-globalForeground);
  }

  body {
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={styles} />
  </>
)
export default GlobalStyles
