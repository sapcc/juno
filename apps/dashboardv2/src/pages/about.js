import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout/Layout"

export default function About() {
  return (
    <Layout>
      <div style={{ color: `teal` }}>
        <h1>About Gatsby</h1>
        <p>Such wow. Very React.</p>
        <Link to="/">Home</Link>
      </div>
    </Layout>
  )
}
