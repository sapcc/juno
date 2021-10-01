import { createContext, useContext, useState, useEffect } from "react"
import { useClient } from "./clientProvider"
import { PolicyEngine } from "policy-engine"

const PolicyContext = createContext()

const usePolicy = () => useContext(PolicyContext)

const PolicyProvider = ({ children, token }) => {
  const client = useClient()
  const dummyPolicy = { check: () => false }
  const [policy, setPolicy] = useState(dummyPolicy)

  useEffect(() => {
    if (!client || !token) return null

    client.getPolicyRules().then((rules) => {
      const engine = new PolicyEngine(rules)
      setPolicy(engine.policy(token, { debug: false }))
    })
  }, [client, token])

  return (
    <PolicyContext.Provider value={policy}>{children}</PolicyContext.Provider>
  )
}

export { PolicyProvider, usePolicy }
