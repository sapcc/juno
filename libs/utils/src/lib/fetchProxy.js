const resolveResponse = (json) => {
  return new Response(JSON.stringify(json), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
}

const rejectResponse = (error) => {
  return new Response(error, {
    status: 404,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
}

const DEFAULT_DB_PATH = "./db.js"
let localDB = null
export const initializeDB = (jsonDbPath) => {
  try {
    import(jsonDbPath)
      .then((module) => module.default)
      .then((db) => {
        console.log("db", db)
        localDB = db
      })
  } catch (error) {
    console.error(
      `Error, no db.json file found. Default path is '${jsonDbPath}':`,
      error
    )
  }
}

// use a custom option to switch between real fetch and mock fetch since process.env.NODE_ENV
// is set to production when building for browser platform: https://esbuild.github.io/api/#platform
const fetchProxy = (urlString, options) => {
  // split custom options from fetch options
  const { mock, dynamicImport, ...fetchOptions } = options

  // if not set explicitly to true or "true", use the real fetch
  if (mock !== true && mock !== "true") {
    console.log(`mock is not set or not set explicitly to true or "true"`)
    return fetch(urlString, fetchOptions)
  }

  // if localDB is not initialized, trhow an error
  if (!localDB) {
    try {
      dynamicImport
        .then((module) => module.default)
        .then((db) => {
          console.log("db", db)
          localDB = db
        })
    } catch (error) {
      console.error(
        `Error, no db.json file found. Default path is '${jsonDbPath}':`,
        error
      )
    }
  }

  // get the path from the url
  const url = new URL(urlString)
  const path = url.pathname
  // get the object from the path
  const object = path.split("/")[1]
  // get the id from the path
  const id = path.split("/")[2]

  console.log("fetchLocal URL", url, path, object, id)

  const method = options?.method
  const body = options?.body
  // switch over the header method
  switch (method) {
    case "GET":
      return new Promise((resolve, reject) => {
        let json = null
        if (object) {
          // object is given
          if (localDB?.[object]) {
            // object is found
            if (id) {
              // find the object with the id
              const index = localDB?.[object].findIndex((item) => {
                // compare with just == because id is a string
                // https://www.w3schools.com/js/js_comparisons.asp
                return item.id == id
              })
              // id is given
              if (index >= 0) {
                // id is found
                resolve(resolveResponse(localDB?.[object]?.[index]))
              } else {
                return resolve(
                  rejectResponse(`No id ${id} for object ${object} found`)
                )
              }
            }
            return resolve(resolveResponse(localDB?.[object]))
          } else {
            return resolve(rejectResponse(`No object ${object} found`))
          }
        }
        resolveFetch(db)
      })
    case "POST":
      return new Promise((resolve, reject) => {
        if (!object || !body)
          resolve(
            rejectResponse(`No object '${object}' or body '${body}' given`)
          )
        if (!localDB?.[object])
          resolve(rejectResponse(`No object '${object}' found`))

        let newBody = JSON.parse(body)
        // set default id
        newBody.id = 1
        // if there are items find the item with the highest id
        if (localDB?.[object]?.length > 0) {
          // find the object with the highest id
          const maxObject = localDB?.[object].reduce((max, obj) =>
            obj.id > max.id ? obj : max
          )
          // set the id to the highest id + 1
          newBody.id = (maxObject?.id || 0) + 1
        }
        localDB?.[object].push(newBody)
        resolve(resolveResponse(newBody))
      })
    case "PUT":
      return new Promise((resolve, reject) => {
        if (!object || !id)
          resolve(rejectResponse(`No object '${object}' or id '${id}' given`))
        if (!localDB?.[object])
          resolve(rejectResponse(`No object '${object}' found`))

        // find the object with the id
        const index = localDB?.[object].findIndex((item) => {
          // compare with just == because id is a string
          // https://www.w3schools.com/js/js_comparisons.asp
          return item.id == id
        })
        // update object with the id
        if (index >= 0) {
          // merge existing object with new body without changing the id
          localDB[object][index] = {
            ...localDB[object][index],
            ...JSON.parse(body),
            id: localDB[object][index].id,
          }
          resolve(resolveResponse(localDB[object][index]))
        } else {
          return resolve(rejectResponse(`No item with id '${id}' found`))
        }
      })
    case "DELETE":
      return new Promise((resolve, reject) => {
        if (!object || !id)
          resolve(rejectResponse(`No object '${object}' or id '${id}' given`))
        if (!localDB?.[object])
          resolve(rejectResponse(`No object '${object}' found`))

        // find the object with the id
        const index = localDB?.[object].findIndex((item) => {
          // compare with just == because id is a string
          // https://www.w3schools.com/js/js_comparisons.asp
          return item.id == id
        })
        // delete object with the id
        if (index >= 0) {
          localDB[object].splice(index, 1)
          resolve(resolveResponse("Object deleted"))
        } else {
          return resolve(rejectResponse(`No item with id '${id}' found`))
        }
      })
  }
}

export default fetchProxy
