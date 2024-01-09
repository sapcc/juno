import { gql } from "graphql-request"

// gql
// It is there for convenience so that you can get the tooling support
// like prettier formatting and IDE syntax highlighting.
// You can use gql from graphql-tag if you need it for some reason too.
export default () => gql`
  query ($filter: ServiceFilter, $first: Int, $after: String) {
    Services(filter: $filter, first: $first, after: $after) {
      __typename
      totalCount
      edges {
        node {
          id
          name
          owners {
            totalCount
            edges {
              node {
                id
                sapID
                name
              }
              cursor
            }
            pageInfo {
              hasNextPage
              startCursor
              endCursor
            }
          }
          supportGroups {
            totalCount
            edges {
              node {
                id
                name
              }
              cursor
            }
            pageInfo {
              hasNextPage
              startCursor
              endCursor
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`
