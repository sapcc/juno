const { ObjectId } = require("mongodb")

module.exports = {
  Query: {
    requests: (parent, data, { db }) =>
      db.collection("requests").find({}).toArray(),
    request: (parent, data, { db }) => {
      const request = db
        .collection("requests")
        .find({ _id: ObjectId(data.id), x: 1 })
      if (!request) throw new Error("could not find request")
      console.log("=============", request)
      return request
    },
  },

  Mutation: {
    /** */
    createRequest: (parent, args, { db }) => {
      const newRequest = {
        name: args.name,
        description: args.description,
        status: "New",
      }
      return db
        .collection("requests")
        .insertOne(newRequest)
        .then((response) =>
          Object.assign({ id: response.insertedId }, newRequest)
        )
    },
    updateRequest: (parent, args, { db }) =>
      db
        .collection("requests")
        .updateOne({ id: args.id }, { $set: args })
        .then(() => null),
    deleteRequest: (parent, args, { db }) =>
      db
        .collection("requests")
        .deleteOne({ id: args.id })
        .then(() => null),
  },

  Request: {
    id: (root) => root._id || root.id, // 5
  },
}
