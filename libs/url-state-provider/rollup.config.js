import del from "rollup-plugin-delete"
import pkg from "./package.json"
import minify from "rollup-plugin-babel-minify"
import analyze from "rollup-plugin-analyzer"

const config = [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        name: "url-state-provider",
        format: "cjs",
        sourcemap: true,
        compact: true,
      },
    ],
    plugins: [
      del({ targets: ["lib/**/*"] }),
      minify({ comments: false }),
      analyze(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
]

export default config
