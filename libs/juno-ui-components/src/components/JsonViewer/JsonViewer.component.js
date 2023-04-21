import PropTypes from "prop-types"
import React, { useContext } from "react"

const THEME_LIGHT = {
  base00: "white",
  base01: "#ddd",
  base02: "#ddd",
  base03: "#444",
  base04: "purple",
  base05: "#444",
  base06: "#444",
  base07: "#444",
  base08: "#444",
  base09: "rgba(70, 70, 230, 1)",
  base0A: "rgba(70, 70, 230, 1)",
  base0B: "rgba(70, 70, 230, 1)",
  base0C: "rgba(70, 70, 230, 1)",
  base0D: "rgba(70, 70, 230, 1)",
  base0E: "rgba(70, 70, 230, 1)",
  base0F: "rgba(70, 70, 230, 1)",
}

const DEFAULT_THEME = {
  base00: "var(--color-syntax-highlight-base00)", //bg
  base01: "var(--color-syntax-highlight-base01)", //?
  base02: "var(--color-syntax-highlight-base02)", //lines and boxes
  base03: "var(--color-syntax-highlight-base03)",
  base04: "var(--color-syntax-highlight-base04)",
  base05: "var(--color-syntax-highlight-base05)",
  base06: "var(--color-syntax-highlight-base06)",
  base07: "var(--color-syntax-highlight-base07)",
  base08: "var(--color-syntax-highlight-base08)", // NULL
  base09: "var(--color-syntax-highlight-base09)", // String value
  base0A: "var(--color-syntax-highlight-base0A)", // NaN
  base0B: "var(--color-syntax-highlight-base0B)", // float value
  base0C: "var(--color-syntax-highlight-base0C)", // index
  base0D: "var(--color-syntax-highlight-base0D)", // expanded icon
  base0E: "var(--color-syntax-highlight-base0E)", // bool + collapsed icon
  base0F: "var(--color-syntax-highlight-base0F)", // integer value
}

const INDENTATION_SIZE = 20

const colorMap = (theme) => ({
  background: theme.base00,
  ellipsis: theme.base09,
  brace: theme.base07,
  key: theme.base07,
  index: theme.base0C,
  size: theme.base04,
  border: theme.base02,
  icon: {
    expanded: theme.base0D,
    collapsed: theme.base0E,
    copy: theme.base0F,
  },
  dataType: {
    boolean: theme.base0E,
    date: theme.base0D,
    float: theme.base0B,
    function: theme.base0D,
    integer: theme.base0F,
    string: theme.base09,
    nan: theme.base08,
    null: theme.base0A,
    undefined: theme.base05,
    regexp: theme.base0A,
    background: theme.base02,
  },
})

// get type of value
const type = (value) => {
  if (value === null) return "null"
  if (Array.isArray(value)) return "array"
  if (value instanceof RegExp) return "regex"
  const t = (typeof value).toLowerCase()
  if (t === "number") {
    return Number.isInteger(value) ? "integer" : "float"
  } else return t
}

const ThemeContext = React.createContext(DEFAULT_THEME)

const ExpandIcon = ({ expanded }) => {
  const colors = useContext(ThemeContext)
  return (
    <svg
      fill={expanded ? colors.icon.expanded : colors.icon.collapsed}
      width="1em"
      height="1em"
      viewBox="0 0 1792 1792"
      style={{
        verticalAlign: "middle",
        color: "var(--color-syntax-highlight-base0E)",
        height: "1em",
        width: "1em",
      }}
    >
      {expanded ? (
        <path d="M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"></path>
      ) : (
        <path d="M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"></path>
      )}
    </svg>
  )
}

const JsonData = ({ name, value, expanded, nestedLevel = 0 }) => {
  const [isExpanded, setIsExpanded] = React.useState(
    expanded === true || (expanded !== false && expanded > nestedLevel)
  )
  const colors = useContext(ThemeContext)
  const dataType = React.useMemo(() => type(value), [value])

  const childrenCount = React.useMemo(
    () =>
      dataType === "array"
        ? value.length
        : dataType === "object"
        ? Object.keys(value).length
        : false,
    [value, dataType]
  )

  return (
    <div data-json-viewer={name}>
      <div style={{ letterSpacing: 0.5, padding: "3px 0" }}>
        {/* Expand Button */}
        {childrenCount > 0 && (
          <button onClick={() => setIsExpanded(!isExpanded)}>
            <ExpandIcon expanded={isExpanded} />
          </button>
        )}
        {/* NAME */}
        <span style={{ color: colors.key }}>
          {" "}
          <span style={{ opacity: 0.85 }}>
            {typeof name === "number" ? (
              <span style={{ color: colors.index }}>{name}</span>
            ) : (
              `"${name}"`
            )}
          </span>{" "}
          :{" "}
        </span>

        {childrenCount === false ? (
          // atomic value, not an array nor an object
          <span style={{ color: colors.dataType[dataType] }}>
            <span
              style={{
                opacity: 0.8,
                fontSize: "small",
                margin: "0 4px",
              }}
            >
              {dataType}
            </span>
            <span>{dataType === "string" ? `"${value}"` : value}</span>
          </span>
        ) : (
          <>
            <span style={{ color: colors.key }}>
              {dataType === "array" ? "[" : "{"}
            </span>
            {!isExpanded && (
              <>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  style={{ color: colors.ellipsis }}
                >
                  ...
                </button>
                <span style={{ color: colors.key }}>
                  {dataType === "array" ? "]" : "}"}
                </span>
              </>
            )}
            <span
              style={{
                color: colors.size,
                opacity: 0.85,
                fontStyle: "italic",
                fontSize: "smaller",
              }}
            >
              {" "}
              {childrenCount} {childrenCount === 1 ? "item" : "items"}
            </span>

            {isExpanded && (
              <>
                <div
                  data-body={name}
                  style={{
                    paddingLeft: INDENTATION_SIZE,
                    marginLeft: 8,
                    borderLeft: `1px solid ${colors.border}`,
                  }}
                >
                  {dataType === "array"
                    ? value.map((value, i) => (
                        <JsonData
                          key={i}
                          name={i}
                          value={value}
                          expanded={expanded}
                          nestedLevel={nestedLevel + 1}
                        />
                      ))
                    : Object.keys(value).map((key, i) => (
                        <JsonData
                          key={i}
                          name={key}
                          value={value[key]}
                          expanded={expanded}
                          nestedLevel={nestedLevel + 1}
                        />
                      ))}
                </div>
                <span style={{ color: colors.key, marginLeft: 6 }}>
                  {dataType === "array" ? "]" : "}"}
                </span>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export const JsonViewer = ({ data, showRoot, theme, expanded, style }) => {
  const currentTheme =
    theme === "light" ? { ...THEME_LIGHT } : { ...DEFAULT_THEME, ...theme }
  const colors = colorMap(currentTheme)
  return (
    <ThemeContext.Provider value={colors}>
      <div
        data-json-viewer
        style={{
          backgroundColor: colors.background,
          fontFamily: "monospace",
          overflow: "auto",
          ...style,
        }}
      >
        <JsonData
          name={showRoot ? "root" : ""}
          value={data}
          expanded={expanded}
        />
      </div>
    </ThemeContext.Provider>
  )
}

JsonViewer.propTypes = {
  /** Pass a json. Required.  */
  data: PropTypes.object.isRequired,
  style: PropTypes.object,
  /** show root key */
  showRoot: PropTypes.bool,
  /** colors map */
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Pass a className */
  expanded: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
}

JsonViewer.defaultProps = {
  data: {},
  style: undefined,
  showRoot: true,
  theme: null,
  expanded: 1,
}
