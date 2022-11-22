import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './index.js';

export default {
  title: 'WiP/ThemeToggle',
  component: ThemeToggle,
  argTypes: {},
};

const Template = ({theme, ...args}) => {
  
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
    <ThemeToggle  theme={theTheme} onClick={handleClick} />
  )
}

export const Default = Template.bind({});
Default.args = {}

