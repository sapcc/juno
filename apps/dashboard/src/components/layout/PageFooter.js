import React from "react"
import { Link } from "react-router-dom"

const PageFooter = () => {
  return (
    <div>
      Footer <Link to="/">Home</Link> | <Link to="/designate">Designate</Link>
    </div>
  )
}

export default PageFooter
