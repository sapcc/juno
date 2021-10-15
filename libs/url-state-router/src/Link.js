import { useRouter } from "."

const Link = ({ to, children, ...props }) => {
  const { navigateTo } = useRouter()

  return (
    <a
      {...props}
      href="#"
      onClick={(e) => {
        e.preventDefault()
        navigateTo(to)
      }}
    >
      {children}
    </a>
  )
}

export default Link
