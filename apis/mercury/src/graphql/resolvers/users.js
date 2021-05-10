module.exports = {
  Query: {
    users: (parent, data, { db }) => db.collection("users").find({}).toArray(),
  },

  Mutation: {
    /** */
    createUser: (parent, args, { db }) => {
      const { name, email, fullName, status } = args
      const newUser = {
        name,
        email,
        fullName,
        status,
      }
      return db
        .collection("users")
        .insertOne(newUser)
        .then((response) => Object.assign({ id: response.insertedId }, newUser))
    },
    deleteUser: (parent, args, { db }) =>
      db
        .collection("users")
        .deleteOne({ id: args.id })
        .then(() => null),
  },

  User: {
    id: (root) => root._id || root.id, // 5
  },
}
