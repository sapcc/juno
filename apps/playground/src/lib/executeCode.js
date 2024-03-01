let swc = null

export const compilerLoader = () => {
  if (swc === null) {
    console.log("Loading SWC compiler...")
    return import("@swc/wasm-web").then((module) =>
      module.default().then(() => {
        swc = module
      })
    )
  }
  return Promise.resolve()
}

async function transformCode(codeString) {
  if (swc === null) {
    await compilerLoader()
  }
  return swc.transformSync(codeString, {
    filename: "index.tsx",
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
      },
    },
    module: {
      type: "commonjs",
    },
  }).code
}

export async function executeCode(codeString, dependencies) {
  const transformedCode = await transformCode(codeString)
  const exports = {}
  const require = (path) => {
    if (dependencies[path]) {
      return dependencies[path]
    }
    throw Error(`Module not found: ${path}.`)
  }

  // create dinamically a function with the transformed having as
  // arguments the exports and require and return the default export
  // of the transformed code
  const result = new Function("exports", "require", transformedCode)
  result(exports, require)

  return exports.default
}
