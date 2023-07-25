import React from "react"
import PropTypes from "prop-types"
import { Combobox } from '@headlessui/react'


export const ComboBox = ({
  label,
  value,
  ...props
}) => {
  
  return (
    <div>
      <Combobox>
        <Combobox.Input 
        
        />
        <Combobox.Button>
        
        </Combobox.Button>
        <ComboBox.Options>
        
        </ComboBox.Options>
      </Combobox>
    </div>
  )
  
}