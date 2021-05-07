const https = require("https")

const verifyAuthToken = (authToken) =>
  new Promise((resolve, reject) => {
    https
      .request(
        {
          host: process.env.IDENTITY_HOST,
          path: "/v3/auth/tokens",
          port: 443,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": authToken,
            "X-Subject-Token": authToken,
          },
        },
        (response) => {
          if (response.statusCode >= 400) reject(response.statusMessage)

          let str = ""
          //another chunk of data has been received, so append it to `str`
          response.on("data", (chunk) => (str += chunk))

          //the whole response has been received, so we just print it out here
          response.on("end", () => {
            const json = JSON.parse(str)
            resolve(json.token)
          })
        }
      )
      .end()
  })

module.exports = { verifyAuthToken }
