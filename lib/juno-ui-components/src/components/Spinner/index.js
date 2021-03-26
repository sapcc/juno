import React from "react"
import tw from "twin.macro"

const primary = tw`
  text-blue-500 
`

const danger = tw`
  text-red-500 
`

const success = tw`
  text-green-500 
`

const warning = tw`
  text-yellow-300  
`

const defaultColor = tw`
  text-white
`

export const Spinner = ({ color }) => {
  const mode = () => {
    switch (color) {
      case "primary":
        return primary
      case "danger":
        return danger
      case "success":
        return success
      case "warning":
        return warning
      default:
        return defaultColor
    }
  }
  return (
    <svg
      tw="animate-spin -ml-1 mr-3 h-5 w-5"
      css={[mode()]}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        tw="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        tw="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
