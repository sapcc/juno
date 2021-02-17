import tw from "twin.macro"

const StandardButton = tw.button`
  bg-sap-blue-500
  py-3
  px-10
  text-xl
  uppercase
`

const Button = ({children}) => {

  return (
    <StandardButton>
      {children}
    </StandardButton>
  )
}

export default Button