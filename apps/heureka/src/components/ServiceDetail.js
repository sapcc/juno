import React from "react"
import { useParams } from "react-router-dom"

const ServiceDetail = () => {
  let { serviceId } = useParams()
  return `Service details for ${serviceId}`
}

export default ServiceDetail
