import PropTypes from "prop-types"
import React, { useContext } from "react"

// DEFAULT THEME FOR LIGHT MODE
const THEME_LIGHT = {
  base00: "#fff",
  base01: "rgb(245, 245, 245)",
  base02: "rgb(235, 235, 235)",
  base03: "#93a1a1",
  base04: "rgba(0, 0, 0, 0.3)",
  base05: "#586e75",
  base06: "#073642",
  base07: "#002b36",
  base08: "#d33682",
  base09: "#cb4b16",
  base0A: "#dc322f",
  base0B: "#859900",
  base0C: "#6c71c4",
  base0D: "#586e75",
  base0E: "#2aa198",
  base0F: "#268bd2",
}

// DEFAULT THEME (DARK)
const DEFAULT_THEME = {
  base00: "var(--color-syntax-highlight-base00)", // background
  base01: "var(--color-syntax-highlight-base01)", // -
  base02: "var(--color-syntax-highlight-base02)", // border, type background
  base03: "var(--color-syntax-highlight-base03)", // -
  base04: "var(--color-syntax-highlight-base04)", // size
  base05: "var(--color-syntax-highlight-base05)", // types: "undefined"
  base06: "var(--color-syntax-highlight-base06)", // -
  base07: "var(--color-syntax-highlight-base07)", // key, brace
  base08: "var(--color-syntax-highlight-base08)", // types: "NaN"
  base09: "var(--color-syntax-highlight-base09)", // ..., types: "string"
  base0A: "var(--color-syntax-highlight-base0A)", // types: "null", "regex"
  base0B: "var(--color-syntax-highlight-base0B)", // types: "float"
  base0C: "var(--color-syntax-highlight-base0C)", // array index
  base0D: "var(--color-syntax-highlight-base0D)", // expanded icon, types: "date", "function"
  base0E: "var(--color-syntax-highlight-base0E)", // collapsed icon, types: "boolean"
  base0F: "var(--color-syntax-highlight-base0F)", // copy icon, types: "integer"
}

// indent size in pixel
const INDENTATION_SIZE = 5
// default truncate size
const DEFAULT_TRUNCATE_LENGTH = 100

// map of color keys to theme
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
  if (value instanceof Date) return "date"
  const t = (typeof value).toLowerCase()
  if (t === "number") {
    if (Number.isNaN(value)) return "nan"
    return Number.isInteger(value) ? "integer" : "float"
  } else return t
}

// Theme context to provide colors, ident size ect. in component tree
const ThemeContext = React.createContext(DEFAULT_THEME)

// this component renders the expand icon depends on the expanded prop
const ExpandIcon = ({ expanded }) => {
  const { colors } = useContext(ThemeContext)
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

const NameLabel = ({ name }) => {
  const { colors } = useContext(ThemeContext)
  const isIndex = typeof name === "number"
  const color = isIndex ? colors.index : colors.key
  const label = isIndex ? name : `"${name}"`

  return (
    <span style={{ color }}>
      <span style={{ opacity: 0.85 }}>{` ${label} `}</span>:{" "}
    </span>
  )
}

// this component show the right side of the json, type + value
// for null, NaN and undefined values a background is shown
const TypeValueLabel = ({ type, value }) => {
  const { colors, truncate } = useContext(ThemeContext)
  let undefinedValue = ["nan", "null", "undefined"].includes(type)
  let label = type === "string" ? `"${value}"` : `${value}`
  if (truncate) {
    const length = truncate === true ? DEFAULT_TRUNCATE_LENGTH : truncate
    if (label.length > length) label = label.slice(0, length - 3) + "..."
  }

  return (
    <span
      style={{
        color: colors.dataType[type],
        backgroundColor: undefinedValue
          ? colors.dataType.background
          : undefined,
        borderRadius: 3,
        padding: undefinedValue ? "2px 5px" : 0,
      }}
    >
      {!undefinedValue && (
        <span
          style={{
            opacity: 0.8,
            fontSize: "small",
            margin: "0 4px",
          }}
        >
          {type}
        </span>
      )}
      <span>{label}</span>
    </span>
  )
}

// This component renders a row of json entry
const JsonData = ({ name, value, nestedLevel = 0 }) => {
  const { colors, expanded, indentWidth } = useContext(ThemeContext)
  const [isExpanded, setIsExpanded] = React.useState(
    expanded === true || (expanded !== false && expanded > nestedLevel)
  )
  const dataType = React.useMemo(() => type(value), [value])

  const children = React.useMemo(() => {
    if (dataType === "array")
      return value.map((v, i) => ({ name: i, value: v }))
    if (dataType === "object")
      return Object.keys(value).map((key, i) => ({
        name: key,
        value: value[key],
      }))
    return null
  }, [dataType, value])

  const ExpandButton = React.useCallback(
    ({ children }) => (
      <button onClick={() => setIsExpanded(!isExpanded)}>{children}</button>
    ),
    [isExpanded, setIsExpanded]
  )

  return (
    <div data-json-viewer={name}>
      <div style={{ letterSpacing: 0.5, padding: "3px 0" }}>
        {/* Expand Button */}
        {children?.length > 0 && (
          <>
            <ExpandButton>
              <ExpandIcon expanded={isExpanded} />
            </ExpandButton>{" "}
          </>
        )}
        {/* NAME */}
        {(name || name === 0) && <NameLabel name={name} />}

        {/* show type and value if no children */}
        {!children ? (
          // atomic value, not an array nor an object
          <TypeValueLabel type={dataType} value={value} />
        ) : (
          <>
            <span style={{ color: colors.brace }}>
              {dataType === "array" ? "[" : "{"}
            </span>
            {!isExpanded && (
              <>
                {/* Expand Icon */}
                <ExpandButton>
                  <span style={{ color: colors.ellipsis }}>...</span>
                </ExpandButton>
                <span style={{ color: colors.brace }}>
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
              {children?.length} {children?.length === 1 ? "item" : "items"}
            </span>

            {isExpanded && (
              <>
                {/* sub items */}
                <div
                  data-body={name}
                  style={{
                    paddingLeft: INDENTATION_SIZE * indentWidth,
                    marginLeft: 8,
                    borderLeft: `1px solid ${colors.border}`,
                  }}
                >
                  {children?.map((entry, i) => (
                    <JsonData
                      key={i}
                      name={entry.name}
                      value={entry.value}
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

/** A component to render json data in a nice way. */
export const JsonViewer = ({
  data,
  showRoot,
  theme,
  expanded,
  indentWidth,
  style,
  truncate,
}) => {
  const currentTheme =
    theme === "light" ? { ...THEME_LIGHT } : { ...DEFAULT_THEME, ...theme }
  const colors = colorMap(currentTheme)
  return (
    <ThemeContext.Provider value={{ colors, expanded, indentWidth, truncate }}>
      <div
        data-json-viewer
        style={{
          backgroundColor: colors.background,
          fontFamily: "monospace",
          overflow: "auto",
          ...style,
        }}
      >
        <JsonData name={showRoot ? "root" : false} value={data} />
      </div>
    </ThemeContext.Provider>
  )
}

JsonViewer.propTypes = {
  /** Pass a json. Required.  */
  data: PropTypes.object.isRequired,
  /** pass a styles object */
  style: PropTypes.object,
  /** show root key */
  showRoot: PropTypes.bool,
  /** dark, light or map of colors
   *
   * @param base00 background
   * @param base01 NOT used
   * @param base02 border, NaN,null, undefined background
   * @param base03 NOT used
   * @param base04 size (x items)
   * @param base05 type "undefined"
   * @param base06 NOT used
   * @param base07 key, brace
   * @param base08 type "NaN"
   * @param base09 ellipsis (...), type "string"
   * @param base0A types: "null", "regex"
   * @param base0B type "float"
   * @param base0C index
   * @param base0D expanded icon, types: "date", "function"
   * @param base0E collapsed icon, types: "boolean"
   * @param base0F copy icon, type "integer"
   */
  theme: PropTypes.oneOfType([
    PropTypes.shape({
      base00: PropTypes.string,
      base01: PropTypes.string,
      base02: PropTypes.string,
      base03: PropTypes.string,
      base04: PropTypes.string,
      base05: PropTypes.string,
      base06: PropTypes.string,
      base07: PropTypes.string,
      base08: PropTypes.string,
      base09: PropTypes.string,
      base0A: PropTypes.string,
      base0B: PropTypes.string,
      base0C: PropTypes.string,
      base0D: PropTypes.string,
      base0E: PropTypes.string,
      base0F: PropTypes.string,
    }),
    PropTypes.oneOf(["dark", "light"]),
  ]),
  /** expanded can be true|false or a number */
  expanded: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  // cut strings after max length is reached */
  truncate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  /* indent width */
  indentWidth: PropTypes.number,
}

JsonViewer.defaultProps = {
  showRoot: false,
  indentWidth: 4,
  expanded: 1,
  truncate: false,
  style: undefined,
  data: {},
  theme: "dark",
}
