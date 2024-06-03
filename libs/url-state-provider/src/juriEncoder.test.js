var assert = require("assert").strict

var dict = [
    "red",
    "yellow",
    "orange",
    "blue",
    "green",
    "white",
    "Asia",
    "North America",
    "South America",
    "name",
    "continent",
    "flagColors",
    "leader",
    "title",
    "term",
    "population",
    "平",
  ],
  juriCutlery = require("./juriEncoder.js")(dict),
  data = {
    zh: {
      name: "China",
      continent: "Asia",
      flagColors: ["red", "yellow"],
      leader: { name: "习 近平-习", title: "President", term: 137 },
      population: 1434440076830,
    },
    in: {
      name: "India",
      continent: "",
      a: true,
      b: false,
      c: null,
      emptyArray: [],
      emptyObject: {},
      flagColors: ["orange", "white", "green"],
      leader: { name: "Narendra\nModi.", title: "Prime Minister", term: 119 },
      population: 1.19e9,
      nan: NaN,
      infi: Infinity,
      neginf: -Infinity,
      nul: null,
    },
    array: ["asdf", [3, undefined, 4, -1, 123.45678, -123.45678]],
  },
  encoded = juriCutlery.encodeQString(data),
  decoded = juriCutlery.decodeQString(encoded),
  json = JSON.stringify(data)

console.log("data test encoded:", encoded)
console.log(assert.deepEqual(data, decoded))

// it ignores undefined object properties
const undefEncoded = juriCutlery.encodeQString({ foo: "bar", undef: undefined })
const undefDecoded = juriCutlery.decodeQString(undefEncoded)
console.log("undefined test encoded:", undefEncoded)
console.log(assert.deepEqual(undefDecoded, { foo: "bar" }))

console.log(
  "Compressed to " +
    Math.round((encoded.length * 10000) / json.length) / 100 +
    "% of plain JSON and " +
    Math.round((encoded.length * 10000) / encodeURIComponent(json).length) /
      100 +
    "% of URL-encoded JSON"
)
