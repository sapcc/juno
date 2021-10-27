import React from "react"
import PropTypes from "prop-types"

const DataListContext = React.createContext()

export const useDataListContext = () => React.useContext(DataListContext)

export const DataList = ({
	selectable,
	className,
	children,
	...props
}) => {
	const dataListConf = {
		selectable: selectable
	}
	return (
		<DataListContext.Provider value={dataListConf}>
			<div className={`datalist-container`}>
				<ul className={`datalist ${className}`} {...props} >
					{children}
				</ul>
			</div>
		</DataListContext.Provider>
	)
}

DataList.propTypes = {
	/** Whether the items of a DataList should be selectable */
	selectable: PropTypes.bool,
	/** Custom classname */
	className: PropTypes.string,
	/** Children to render in the DataList */
	children: PropTypes.node,
}

DataList.defaultProps = {
	selectable: false,
	className: "",
	children: null,
}