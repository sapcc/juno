import React from "react"
import PropTypes from "prop-types"

const introbox = (variant, heroImage) => {
  return `
			bg-theme-introbox
			text-theme-default
			flex
			rounded-l
			overflow-hidden
			mb-8

			${
        variant === "hero" && heroImage && heroImage.startsWith("bg-")
          ? `
					${heroImage}
					bg-right-top
					bg-no-repeat
				`
          : ""
      }
		`
}

const introboxBorder = `
	border-l-4
	border-theme-introbox
`

const introboxContent = (variant, heroImage) => {
  return `
		${heroImage && heroImage.startsWith("bg-") ? `pl-4 pr-56` : `px-4`}

		${
      variant === "hero"
        ? `
			text-xl
			min-h-[8rem]
			py-4
			flex
			flex-col
			justify-center
		`
        : `
			py-3
		`
    }
	`
}

const introboxHeading = `
	font-bold
`

/**
* An Introbox holds generally important information to help understand the contents, purpose, or state of a whole page or view, or individual sections on longer pages.
Use sparingly, there should never be any two or more subsequent instances of Introbox as direct siblings/neighbors on an individual view.
*/
export const IntroBox = ({
  title,
  text,
  variant,
  heroImage,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={`juno-introbox ${introbox(variant, heroImage)} ${className}`}
      {...props}
    >
      <div className={`${introboxBorder}`}></div>
      <div className={`${introboxContent(variant, heroImage)}`}>
        {title ? <h1 className={`${introboxHeading}`}>{title}</h1> : ""}
        {children ? children : <p>{text}</p>}
      </div>
    </div>
  )
}

IntroBox.propTypes = {
  /** Pass an optional title */
  title: PropTypes.string,
  /** Pass a string of text to be rendered as contents. Alternatively, contents can be passed as children (see below) */
  text: PropTypes.string,
  /** Pass a custom class */
  variant: PropTypes.oneOf(["default", "hero"]),
  /** optional "hero" flavor image for hero variant. Specify as tailwind bg image string pointing to an image in your app (see template app for an example). Will always be positioned top and right */
  heroImage: PropTypes.string,
  /** Pass a custom class */
  className: PropTypes.string,
  /** Pass child nodes to be rendered as contents */
  children: PropTypes.node,
}

IntroBox.defaultProps = {
  title: null,
  text: null,
  variant: "default",
  heroImage: null,
  className: "",
}
