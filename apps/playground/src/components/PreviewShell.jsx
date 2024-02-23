import React from "react"
import styles from "../styles.scss"
import { AppShell, AppShellProvider } from "juno-ui-components"

export default ({ children }) => {
  return (
    <AppShellProvider theme="theme-dark">
      <style>{styles.toString()}</style>
      {/* override the styles of a first div child from cutom-wrapperfor-textarea */}
      <style jsx>{`
        .cutom-wrapperfor-textarea > div:first-child {
          height: 100%;
        }
        .cutom-wrapperfor-textarea > div:first-child > .juno-textarea-wrapper {
          height: 100%;
        }
      `}</style>

      <style>{}</style>
      <AppShell pageHeader="Converged Cloud | Playground" embedded={true}>
        {children}
      </AppShell>
    </AppShellProvider>
  )
}
