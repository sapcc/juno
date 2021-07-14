import React from "react"
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  HttpLink,
  gql,
} from "@apollo/client"

const Requests = ({ authToken }) => {
  const [requests, setRequests] = React.useState()
  const client = React.useMemo(() => {
    const httpLink = new HttpLink({
      uri: "https://mercury.juno.qa-de-1.cloud.sap/graphql",
    })
    const authLink = new ApolloLink((operation, forward) => {
      // Use the setContext method to set the HTTP headers.
      operation.setContext({
        headers: {
          "x-auth-token": authToken,
          "x-auth-region": "qa-de-1",
        },
      })

      // Call the next link in the middleware chain.
      return forward(operation)
    })

    return new ApolloClient({
      link: authLink.concat(httpLink), // Chain it with the HttpLink
      cache: new InMemoryCache(),
    })
  }, [authToken])

  React.useEffect(() => {
    if (!client) return

    client
      .query({
        query: gql`
          query GetRequests {
            requests {
              items {
                id
                subject
                kind
                createdAt
              }
            }
          }
        `,
      })
      .then((result) => {
        console.log(result)
        setRequests(result.data.requests)
      })
  }, [client])
  return (
    <div>
      {requests && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Kind</th>
              <th>Subject</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {requests.items.map((request, index) => (
              <tr key={index}>
                <td>{request.id}</td>
                <td>{request.kind}</td>
                <td>{request.subject}</td>
                <td>{request.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Requests
