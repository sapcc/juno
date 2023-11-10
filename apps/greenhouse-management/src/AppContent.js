import React from "react"
import { Container } from "juno-ui-components"
import SVGAsComponent from "./assets/juno-danger.svg"
import svgAsBackgroundImage from "./assets/juno-danger.svg?url"
import mapBackgroundImage from "./assets/map.svg?url"
import rocketImage from "./assets/rocket.gif"

// This is your starting point of tour application
// see several examples in the exampleApp
const AppContent = (props) => {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Greenhouse Management</h1>

      <p className="text-lg mb-4">
        Welcome to Greenhouse Management, your central hub for configuring and
        fine-tuning your Greenhouse experience. With Greenhouse Management, you
        have the power to customize and control various aspects of your
        platform, ensuring a tailored and secure environment for both users and
        plugins.
      </p>

      <h2 className="text-2xl font-bold mb-4">Key Features</h2>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">1. Plugin Visibility</h3>
        <p>
          Effortlessly manage the visibility of plugins across your Greenhouse
          ecosystem. Whether you want to showcase specific features or limit
          access to certain functionalities, Greenhouse Management puts you in
          the driver's seat.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">2. User Access Control</h3>
        <p>
          Take control of user permissions and access levels. Define who can
          interact with which plugins, ensuring a secure and organized user
          experience tailored to your team's needs.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">3. Configuration Options</h3>
        <p>
          Fine-tune the settings and configurations of individual plugins to
          align with your workflow. Greenhouse Management provides a seamless
          interface for adjusting parameters, ensuring each plugin operates
          optimally in your environment.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">
          4. Streamlined Administration
        </h3>
        <p>
          Enjoy a streamlined administrative experience with Greenhouse
          Management. Effortlessly navigate through user access settings, plugin
          configurations, and more, all from one centralized location.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">How to Use</h2>

      <p className="text-lg mb-4">
        Navigate through the intuitive Greenhouse Management interface to make
        real-time adjustments to plugin visibility, user access, and
        configurations. Tailor your Greenhouse platform to match your
        organization's unique requirements and workflows effortlessly.
      </p>

      <p className="text-lg">
        Explore the possibilities with Greenhouse Management and unlock a new
        level of control over your Greenhouse ecosystem.
      </p>
    </Container>
  )
}

export default AppContent
