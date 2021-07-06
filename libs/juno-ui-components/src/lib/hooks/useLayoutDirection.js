import React from "react";
import { useFormLayoutContext, FormLayoutProvider } from "../../components/FormLayoutProvider"

export default function useLayoutDirection(layout) {
	
	/* 
	Determine layout direction from prop or context:
	1. Use as passed if passed as a prop to the component directly
	2. if not, try to get from context and use if context exists
	3. if no context exists and all else fails, default to vertical.
	*/
	
	let layoutDirection = layout
	const defaultLayoutDirection = "vertical"
	if (!layoutDirection) {
		try {
			layoutDirection = useFormLayoutContext()
		} catch (e) {
			layoutDirection = defaultLayoutDirection
		} finally {
			if (!layoutDirection) {
				layoutDirection = defaultLayoutDirection
			}
		}
	}
	return layoutDirection
}
