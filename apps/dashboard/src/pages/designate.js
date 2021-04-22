import React from "react"
import MicroFrontend from "../components/MicroFrontend"
import { LayoutContainer } from "../components/shared/StyledComponents"

const Designate = () => (
  <LayoutContainer>
    <span>Designate</span>
    <MicroFrontend name="designate" version="0_0_1" />
  </LayoutContainer>
)

export default Designate
