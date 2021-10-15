import { useEffect } from "react"
import { useRouter } from "."

const Redirect = ({ to }) => {
  const { redirectTo } = useRouter()

  useEffect(() => {
    redirectTo(to)
  }, [])
  return null
}

export default Redirect
