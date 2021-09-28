const Show = ({ item }) => {
  return <pre>{JSON.stringify(item, null, 2)}</pre>
}

export default Show
