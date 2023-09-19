// import db.json as object
import db from "../../db.json"

let newDb = db

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

const fetchLocal = (urlString, options) => {
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
          if (newDb?.[object]) {
            // object is found
            if (id) {
              // find the object with the id
              const index = newDb?.[object].findIndex((item) => {
                // compare with just == because id is a string
                // https://www.w3schools.com/js/js_comparisons.asp
                return item.id == id
              })
              // id is given
              if (index >= 0) {
                // id is found
                resolve(resolveResponse(newDb?.[object]?.[index]))
              } else {
                return resolve(
                  rejectResponse(`No id ${id} for object ${object} found`)
                )
              }
            }
            return resolve(resolveResponse(newDb?.[object]))
          } else {
            return resolve(rejectResponse(`No object ${object} found`))
          }
        }
        resolveFetch(db)
      })
    case "POST":
      return new Promise((resolve, reject) => {
        let newBody = JSON.parse(body)
        if (object && newDb?.[object] && body) {
          if (newDb?.[object]?.length > 0) {
            // Use reduce to find the object with the highest id 'value'
            const maxObject = newDb?.[object].reduce(
              (max, obj) => (obj.id > max.id ? obj : max),
              0
            )
            // set the id to the highest id + 1
            newBody.id = maxObject.id + 1
            newDb?.[object].push(newBody)
            resolve(resolveResponse(newBody))
          } else {
            newDb?.[object].push(newBody)
            resolve(resolveResponse(newBody))
          }
        } else {
          return resolve(
            rejectResponse(`No object ${object} or body ${body} given`)
          )
        }
      })
    case "PUT":
      return new Promise((resolve, reject) => {
        if (object && newDb?.[object] && id && newDb?.[object]?.[id] && body) {
          // find the object with the id
          const index = newDb?.[object].findIndex((item) => {
            // compare with just == because id is a string
            // https://www.w3schools.com/js/js_comparisons.asp
            return item.id == id
          })
          // update object with the id
          if (index >= 0) {
            newDb[object][index] = JSON.parse(body)
            resolve(resolveResponse(newDb[object][index]))
          } else {
            return resolve(
              rejectResponse(`No object ${object} and id ${id} found`)
            )
          }
        } else {
          return resolve(
            rejectResponse(
              `No object ${object} or id ${id} or body ${body} given`
            )
          )
        }
      })
    case "DELETE":
      return new Promise((resolve, reject) => {
        if (object && newDb?.[object] && id && newDb?.[object]?.[id]) {
          // find the object with the id
          const index = newDb?.[object].findIndex((item) => {
            // compare with just == because id is a string
            // https://www.w3schools.com/js/js_comparisons.asp
            return item.id == id
          })
          // delete object with the id
          if (index >= 0) {
            newDb[object].splice(index, 1)
            resolve(resolveResponse("Object deleted"))
          } else {
            return resolve(
              rejectResponse(`No object ${object} and id ${id} found`)
            )
          }
        } else {
          return resolve(
            rejectResponse(`No object ${object} or id ${id} given`)
          )
        }
      })
  }
}

export default fetchLocal
