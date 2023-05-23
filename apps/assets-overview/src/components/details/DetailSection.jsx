import { sectionCss, headerCss, h1Css } from "../../styles"
import React from "react"

const DetailSection = ({ title, description, children }) => {
  return (
    <div className="details-section">
      <h1 className={`${h1Css} ${headerCss}`}>{title}</h1>
      <p>{description}</p>
      <div className="my-6">{children}</div>
    </div>
  )
}

export default DetailSection
