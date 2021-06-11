const TOKEN_PROPERTIES = [
  "is_admin_project",
  "is_admin",
  "domain_id",
  "domain_name",
  "project_id",
  "project_domain_id",
  "user_id",
]

// "A and (B or C) and not D"

const logicalExpression = {
  type: "AND",
  left: { type: "expression", value: "A" },
  right: {
    left: {
      type: "OR",
      left: { type: "expression", value: "B" },
      right: { type: "expression", value: "C" },
    },
    type: "AND",
    right: {
      type: "NOT",
      right: { type: "expression", value: "D" },
    },
  },
}

const tree = {
  left: { type: "expression", value: "A" },
  type: "and",
  right: {
    left: {
      left: { type: "expression", value: "B" },
      type: "or",
      right: { type: "expression", value: "C" },
    },
    type: "(",
    right: {
      left: { type: "expression", value: "B" },
      type: "or",
      right: {
        left: { type: "expression", value: "C" },
        type: ")",
      },
    },
  },
}
