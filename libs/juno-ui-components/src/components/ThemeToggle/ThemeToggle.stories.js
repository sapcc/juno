import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './index.js';

export default {
  title: 'WiP/ThemeToggle',
  component: ThemeToggle,
  argTypes: {},
};

const Template = ({theme, ...args}) => {
  // Use state internal to story for now, TODO: use updated StyleProvider later
  const [ theTheme, setTheTheme ] = useState(theme)
  
  useEffect(() => {
    setTheTheme(theme)
  }, [theme])
  
  const handleClick = () => {
    if (theTheme === "light") {
      setTheTheme("dark")
    } else {
      setTheTheme("light")
    }
  }
  
  return (
    <div className={"theme-" + (theTheme || "dark")} style={{padding: "40px", textAlign: "center"}}>
      <ThemeToggle  theme={theTheme} onClick={handleClick} />
    </div>
  )
}

export const Default = Template.bind({});
Default.args = {}

