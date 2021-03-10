import React from "react"

import "../../assets/styles/main.css"
import tw, { styled } from "twin.macro"

const btn = tw`
  w-full 
  inline-flex 
  justify-center 
  rounded-md 
  border 
  shadow-sm 
  px-4 
  py-2 
  text-base 
  font-medium 
  focus:outline-none 
  focus:ring-2 
  focus:ring-offset-2 
  sm:text-sm
  sm:ml-3 
  sm:w-auto 
`

const btnDanger = tw`
  focus:ring-red-500 
  text-white 
  hover:bg-red-700 
  bg-red-600 
  border-transparent 
`

const btnDefault = tw`
  focus:ring-indigo-500 
  text-gray-700 
  hover:bg-gray-50 
  bg-white 
  border-gray-300 
`

export default ({ onClick, children, danger }) => (
  <button
    type="button"
    onClick={onClick}
    css={[btn, danger ? btnDanger : btnDefault]}
  >
    {children}
  </button>
)
