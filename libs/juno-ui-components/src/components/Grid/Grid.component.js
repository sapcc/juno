import React from "react"
import PropTypes from "prop-types"

const GridContext = React.createContext()

export const useGrid = () => React.useContext(GridContext)

export const Grid = ({
	columns,
	gutter_x,
	gutter_y,
	children,
	className,
	...props
}) => {
	const gridconf = {
		columns: columns,
		gutter_x: gutter_x,
		gutter_y: gutter_y
	}
	return (
		<GridContext.Provider value={gridconf}>
			<div className={`grid-container ${className}`} >
				{children}
			</div>
		</GridContext.Provider>
	)
}


Grid.propTypes = {
	/** Optional: The number of columns in the grid. */
	columns: PropTypes.number,
	/** Optional: The horizontal gutter between columns in the grid. Any valid CSS length will work. Default is 1rem. */
	gutter_x: PropTypes.string,
	/** Optional: The vertical gutter between rows in the grid. Any valid CSS length will work. Default is 1rem. */
	gutter_y: PropTypes.string,
	/** The children to render in the grid */
	children: PropTypes.node,
	/** Add a class to the grid container */
	className: PropTypes.string,
}

Grid.defaultProps = {
	columns: null,
	gutter_x: null,
	gutter_y: null,
	className: "",
	children: null,
}
