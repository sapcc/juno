module.exports = {
  Query: {
    requests: (parent, data, { db }) => db.Requests.find({}).toArray(),
  },

  Mutation: {
    /** */
    createRequest: (parent, args, { db }) => {
      const newRequest = {
        name: args.name,
        description: args.description,
        status: "New",
      }
      return db.Requests.insertOne(newRequest).then((response) =>
        Object.assign({ id: response.insertedId }, newRequest)
      )
    },
    updateRequest: (parent, args, { db }) =>
      db.Requests.updateOne({ id: args.id }, { $set: args }).then(() => null),
    deleteRequest: (parent, args, { db }) =>
      db.Requests.deleteOne({ id: args.id }).then(() => null),
  },

  Request: {
    id: (root) => root._id || root.id, // 5
  },
}
