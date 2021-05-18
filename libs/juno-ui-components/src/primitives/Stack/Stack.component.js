import React from "react"
import PropTypes from "prop-types"
import tw, { styled, theme } from "twin.macro"

const Box = styled.div(({direction, gap}) => [
  tw`
    flex
  `,
  direction === 'vertical' && tw`flex-col`
])


// .stack {
//   --space: 1.5rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
// }

// .stack > * {
//   margin-top: 0;
//   margin-bottom: 0;
// } 

// .stack > * + * {
//   margin-top: var(--space);
// }

const Stack = ({ direction, gap, children, ...props}) => {

  return (
    <Box direction={direction} tw={gap ? `space-x-${gap}` : ""} {...props}>
      {children}
    </Box>
  )
}

export default Stack

Stack.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  gap: PropTypes.string
}

Stack.defaultProps = {
  direction: "horizontal",
  gap: "2"
}