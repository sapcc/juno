import React from "react"
import { Pagination } from "./index.js"
import { PortalProvider } from "../PortalProvider/PortalProvider.component"

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    variant: {
      options: ['"" (default)', "number", "select", "input"],
      control: { type: "select" },
    },
  },
  decorators: [
    (Story) => (
      <div className="jn-pb-12">
        <PortalProvider>
          <Story />
        </PortalProvider>
      </div>
    ),
  ],
}

const Template = (args) => {
  return <Pagination {...args} />
}

const UncontrolledTemplate = ({ currentPage, pages, ...args }) => {
  const [page, setPage] = React.useState(currentPage)
  const prev = React.useCallback(() => setPage(page > 1 ? page - 1 : 1), [page])
  const next = React.useCallback(() => setPage(!pages || page < pages ? page + 1 : pages), [page])

  return (
    <Pagination
      {...args}
      pages={pages}
      currentPage={page}
      onPressPrevious={prev}
      onPressNext={next}
    />
  )
}

export const Default = {
  render: Template,
  args: {},
}

export const PaginationWithNumber = {
  render: Template,

  args: {
    variant: "number",
    currentPage: 3,
  },
}

export const PaginationWithSelect = {
  render: Template,

  args: {
    variant: "select",
    currentPage: 2,
    pages: 6,
  },
}

export const PaginationWithInput = {
  render: Template,

  args: {
    variant: "input",
    currentPage: 3,
    pages: 6,
  },
}

export const DisabledPagination = {
  render: Template,

  args: {
    disabled: true,
  },
}

export const ProgressPagination = {
  render: Template,

  args: {
    progress: true,
  },
}

export const UncontrolledDefault = {
  render: UncontrolledTemplate,
  args: {},
}

export const UncontrolledPaginationWithNumber = {
  render: UncontrolledTemplate,

  args: {
    variant: "number",
    currentPage: 3,
  },
}

export const UncontrolledPaginationWithSelect = {
  render: UncontrolledTemplate,

  args: {
    variant: "select",
    currentPage: 2,
    pages: 6,
  },
}

export const UncontrolledPaginationWithInput = {
  render: UncontrolledTemplate,

  args: {
    variant: "input",
    currentPage: 3,
    pages: 6,
  },
}

export const UncontrolledDisabledPagination = {
  render: UncontrolledTemplate,

  args: {
    disabled: true,
  },
}

export const UncontrolledProgressPagination = {
  render: UncontrolledTemplate,

  args: {
    progress: true,
  },
}
