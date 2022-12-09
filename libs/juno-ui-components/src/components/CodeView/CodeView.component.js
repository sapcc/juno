import React from "react"
import PropTypes from "prop-types"
import { CodeBlock } from "../CodeBlock/index"
import { Icon } from "../Icon/Icon.component.js"
import { Tabs } from "../Tabs/Tabs.component.js"
import { TabList } from "../TabList/TabList.component.js"
import { Tab } from "../Tab/Tab.component.js"
import { TabPanel } from "../TabPanel/TabPanel.component.js"

/*
TODO:
render tabs
render children
render heading
propTypes and default props: accept string, array of strings, component or array of components
*/
export const CodeView = ({
  content,
  children,
  tabs,
  className,
  ...props
}) => {
  return (
    <div className={`juno-code-view`} {...props} >
      { content ? 
        <CodeBlock content={content} />
        :
        null
      }
    </div>
  )
}

CodeView.propTypes = {
  content: PropTypes.string,
  children: PropTypes.node,
  tabs: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
}

CodeView.defaultProps = {
  content: "",
  children: null,
  tabs: [],
  className: "",
}