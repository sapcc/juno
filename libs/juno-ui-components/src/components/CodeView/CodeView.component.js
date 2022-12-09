import React from "react"
import PropTypes from "prop-types"
import { CodeBlock } from "../CodeBlock/index"
import { Icon } from "../Icon/Icon.component.js"
import { Tabs } from "../Tabs/Tabs.component.js"
import { TabList } from "../TabList/TabList.component.js"
import { Tab } from "../Tab/Tab.component.js"
import { TabPanel } from "../TabPanel/TabPanel.component.js"

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