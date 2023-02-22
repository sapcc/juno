import glob from "glob"
import path from "path"
import fs from "fs"
import json2md from "json2md"

const DIRNAME = path.dirname(process.argv[1])

const uniq = (value, index, array) => array.indexOf(value) === index

const readmeIntroduction = [
  { h1: "Communicator Interface" },
  {
    p:
      "This documentation describes the interface for communicating with " +
      "the outside world. This app uses the juno lib communicator which " +
      "provides four methods for sending messages and listening for messages.",
  },
  {
    ul: [
      "<code>broadcast</code>, send a message to the whole world",
      "<code>watch</code>, listen for a message",
      "<code>get</code>, request a message and wait for the reply (one to one communication)",
      "<code>onGet</code>, listen for and reply to get messages",
    ],
  },

  {
    p:
      "These methods are always to be considered in pairs as opponents.<br/>" +
      "<code>broadcast <-> watch</code><br/>" +
      "<code>get <-> onGet</code>",
  },

  {
    p:
      "For example, if an app sends a message with <code>broadcast</code>, then this " +
      "message can be received with <code>watch</code>. And correspondingly, <code>get</code> " +
      "requests are answered with <code>onGet</code>. Where <code>get</code> is answered directly " +
      "(one to one).",
  },
  { p: "All messages sent or consumed by this app are listed here" },
]

const howToUse = (method, message) => {
  switch (method) {
    case "broadcast":
      return `watch("${message}", (data) => {/* handle data here */})`
    case "watch":
      return `broadcast("${message}", { /*data*/ } )`
    case "get":
      return `onGet("${message}", () => {/* return data here */})`
    case "onGet":
      return `get("${message}", (data) => {/* handle data here */})`
  }
}

const files = glob.sync(`${DIRNAME}/../+(libs|apps)/**/*.+(j|t)s?(x)`, {
  ignore: [
    "**/node_modules/**",
    "**/*.test.js",
    "**/*.config.js",
    "**/__mocks__/**",
  ],
})

// assetName: mdJson
const readmes = {}

files.forEach((file) => {
  const assetNameMatch = file.match(/(apps|libs|apis)\/([^\/]+).+/)

  const assetName = assetNameMatch?.[2]
  if (!assetName) return

  let content = fs.readFileSync(file).toString()

  for (let method of ["broadcast", "watch", "get", "onGet"]) {
    const regex = new RegExp(`${method}\\(["|']([^"|'|\\.|-|\\/]+)["|'],`, "g")
    const matches = [...content.matchAll(regex)]
    const messages = matches.map((match) => match[1]).filter(uniq)

    if (messages.length > 0) {
      console.log(assetName, messages)
      console.log(file)
      if (!readmes[assetName]) {
        readmes[assetName] = {
          assetName,
          path: file.substring(0, file.indexOf(assetName) + assetName.length),
          md: [],
        }
      }
      readmes[assetName]["md"] = [
        ...readmes[assetName]["md"],
        { h2: method },
        { ul: messages.map((m) => `**${m}**`) },
        { p: "How to use" },
        {
          code: {
            language: "js",
            content: messages.map((m) => howToUse(method, m)).join("\n"),
          },
        },
      ]
    }
  }
})

for (let key in readmes) {
  const { assetName, path: assetPath, md } = readmes[key]
  const readme = [
    ...readmeIntroduction,
    {
      blockquote: `This documentation was generated automatically based on all communication calls found in ${assetName}.`,
    },
    ...md,
  ]

  console.log(assetPath)
  fs.writeFileSync(path.join(assetPath, "COMMUNICATOR.md"), json2md(readme))
}
