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

let localDB = null

// setup the mock db.json
export const fetchProxyInitDB = (jsonData) => {
  // set localDB to null to reset it
  if (jsonData === null) {
    localDB = null
    return
  }

  // check if the localDB is initialized and warns if already initialized
  if (localDB) {
    // create a new custom error to return
    throw new Error(
      `localDB already initialized. Please use fetchProxyInitDB(null) to reset the localDB.`
    )
  }

  // check if the given json is valid and also checks if the jsondata are a collection of key value pairs with values as arrays
  if (typeof jsonData !== "object") {
    // create a new custom error to return
    throw new Error(`It seems that jsonData is not a valid JSON object.`)
  }

  // check if the given json is valid and also checks if the jsondata are a collection of key value pairs with values as arrays
  if (
    Object.keys(jsonData).some((key) => {
      return !Array.isArray(jsonData[key])
    })
  ) {
    // create a new custom error to return
    throw new Error(
      `It seems that jsonData is not a collection of key value pairs with values as arrays.`
    )
  }

  // set the localDB
  localDB = jsonData
}

// use a custom option to switch between real fetch and mock fetch since process.env.NODE_ENV
// is set to production when building for browser platform: https://esbuild.github.io/api/#platform
const fetchProxy = (urlString, options) => {
  // split custom options from fetch options
  const { mock, jsonData, ...fetchOptions } = options

  // if not set explicitly to true or "true", use the real fetch
  if (mock !== true && mock !== "true") {
    return fetch(urlString, fetchOptions)
  }

  // warn localDB not initialized
  if (!localDB) {
    // create a new custom error to return
    throw new Error(`localDB not initialized.
    Please use fetchProxyInitDB(jsonData) to initialize the localDB.`)
  }

  // get the path from the url
  const url = new URL(urlString)
  const path = url.pathname
  // get the object from the path
  const object = path.split("/")[1]
  // get the id from the path
  const id = path.split("/")[2]

  console.log("fetchLocal URL:::", url, path, object, id)

  // if method is not set, use GET as default
  let method = options?.method
  if (!method) method = "GET"

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
