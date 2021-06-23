import React from "react"
import PropTypes from "prop-types"

/* Create context */
const FormLayoutContext = React.createContext()

/* Create custom hook to call context */
export const useFormLayoutContext = () => React.useContext(FormLayoutContext)

/** 
Component to provide a form layout context of either "horizontal" or "vertical".
To be used in Form and FormSection components.
The useFormLayoutContext hook can be used in all form group components where layout direction makes a difference
*/
export const FormLayoutProvider = ({ 
	layout,
	children 
}) => {
   return (
	<FormLayoutContext.Provider value={layout}>
		{children}
	</FormLayoutContext.Provider>
  );
};
