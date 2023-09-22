import React from "react"
import { DataGrid } from "./index.js"
import { DataGridRow } from "../DataGridRow/index.js"
import { DataGridCell } from "../DataGridCell/index.js"
// import { DataGridCheckboxCell } from "../DataGridCheckboxCell/index.js"
import { DataGridHeadCell } from "../DataGridHeadCell/index.js"
import { ContentArea } from "../ContentArea/index.js"
import { Container } from "../Container/index.js"
import { PreseletedWithSearch as FiltersStory } from "../Filters/Filters.stories"
import { Filters } from "../Filters/index.js"
import { DataGridToolbar } from "../DataGridToolbar/index.js"
import { Default as DataGridToolbarStory } from "../DataGridToolbar/DataGridToolbar.stories"
import { Button } from "../Button/index.js"

export default {
  title: "Components/DataGrid/DataGrid",
  component: DataGrid,
  argTypes: {
    children: {
      control: false
    },
  },
}

const defaultColumns = 3

const Template = ({ hideHead, includeColSpanRow, withToolbar, withFilters, ...args }) => (
  <>
    { withFilters &&
      <Filters {...FiltersStory.args} ></Filters>
    }
    { withToolbar &&
      <DataGridToolbar {...DataGridToolbarStory.args} ><Button variant="primary">Add new</Button></DataGridToolbar>
    }
    <DataGrid {...args}>
      { !hideHead && 
        <DataGridRow>
          {[...Array(args.columns || defaultColumns)].map((_, c) => (
            <DataGridHeadCell key={`h_${c}`}>
              {`Head cell ${c}`}
            </DataGridHeadCell>
          ))}
        </DataGridRow>
      }
      {!includeColSpanRow && [...Array(4)].map((_, r) => (
        <DataGridRow key={`b_${r}`}>
          {[...Array(args.columns || defaultColumns)].map((_, c) => (
            <DataGridCell key={`b_${r}_${c}`}>
              { c === args.columns - 2 ?
                  `Cell ${r}-${c} has more content than others`
                : 
                  `Cell ${r}-${c}`
              }
            </DataGridCell>
          ))}
        </DataGridRow>
      ))}
      { includeColSpanRow &&
        <DataGridRow>
          <DataGridCell colSpan={args.columns}>
            This is a cell with colspan spanning all available columns
          </DataGridCell>
        </DataGridRow>
      }
    </DataGrid>
  </>
)

// const WithHeadAndFootTemplate = ({ items, ...args }) => (
//   <DataGrid {...args}>
//     <DataGridHead>
//       <DataGridHeadRow>
//         {DataGridHeadRowStory.args.items.map((headcell, h) => (
//           <DataGridHeadCell {...headcell} key={`h_${h}`} />
//         ))}
//       </DataGridHeadRow>
//     </DataGridHead>
//     <DataGridBody>
//       {items.map((row, r) => (
//         <DataGridRow key={`b_${r}`}>
//           {row.items.map((cell, c) => (
//             <DataGridCell {...cell} key={`b_${r}_${c}`} />
//           ))}
//         </DataGridRow>
//       ))}
//     </DataGridBody>
//     <DataGridFoot>
//       <DataGridFootRow>
//         {DataGridFootRowStory.args.items.map((footcell, f) => (
//           <DataGridCell {...footcell} key={`f_${f}`} />
//         ))}
//       </DataGridFootRow>
//     </DataGridFoot>
//   </DataGrid>
// )

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Juno DataGrid for displaying data. Example with 5 columns.",
    },
  },
}
Default.args = {
  columns: 5
}

export const EqualColumnSize = Template.bind({})
EqualColumnSize.parameters = {
  docs: {
    description: {
      story: "Example: change column max size to '1fr'. This ensures that all columns get the same width, even if some columns have more content than others",
    },
  },
}
EqualColumnSize.args = {
  columns: 5,
  columnMaxSize: "1fr"
}

export const ColumnMinSize = Template.bind({})
ColumnMinSize.parameters = {
  docs: {
    description: {
      story: "Example: set a minimum width for columns. Columns will always be at least this wide, even if they have very little content. This may cause horizontal scrollbars if the DataGrid doesn't fit into the container anymore",
    },
  },
}
ColumnMinSize.args = {
  columns: 5,
  columnMinSize: "300px"
}

export const MinimumSizedColumns = Template.bind({})
MinimumSizedColumns.parameters = {
  docs: {
    description: {
      story: "Example: specify some columns that should be as small as possible (typically used for when you have a cell that contains only a button and you want to ensure the cell is only exactly as wide as the button",
    },
  },
}
MinimumSizedColumns.args = {
  columns: 5,
  minContentColumns: [0,4]
}

export const CustomGridTemplate = Template.bind({})
CustomGridTemplate.parameters = {
  docs: {
    description: {
      story: "Example: specify a completely custom css grid column template. The value passed is used for the css 'grid-template-columns' property. All other settings are ignored",
    },
  },
}
CustomGridTemplate.args = {
  gridColumnTemplate: `20% repeat(${defaultColumns - 1}, auto)`
}

export const NoHead = Template.bind({})
NoHead.parameters = {
  docs: {
    description: {
      story: "Without head cells",
    },
  },
}
NoHead.args = {
  columns: 5,
  hideHead: true
}

export const ColSpanCell = Template.bind({})
ColSpanCell.parameters = {
  docs: {
    description: {
      story: "With a col span cell",
    },
  },
}
ColSpanCell.args = {
  columns: 5,
  includeColSpanRow: true
}

export const WithToolbar = Template.bind({})
WithToolbar.parameters = {
  docs: {
    description: {
      story: "With toolbar",
    },
  },
}
WithToolbar.args = {
  columns: 5,
  withToolbar: true
}

export const WithFilters = Template.bind({})
WithFilters.parameters = {
  docs: {
    description: {
      story: "With filters",
    },
  },
}
WithFilters.args = {
  columns: 5,
  withFilters: true
}

export const WithToolbarAndFilters = Template.bind({})
WithToolbarAndFilters.parameters = {
  docs: {
    description: {
      story: "With toolbar and filters",
    },
  },
}
WithToolbarAndFilters.args = {
  columns: 5,
  withFilters: true,
  withToolbar: true
}

// export const Selectable = Template.bind({})
// Selectable.parameters = {
//   docs: {
//     description: {
//       story: "Juno Datagrid with Selectable rows",
//     },
//   },
// }
// Selectable.args = {
//   selectable: true,
//   items: [
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//   ],
// }

// export const WithHeadAndFoot = WithHeadAndFootTemplate.bind({})
// WithHeadAndFoot.parameters = {
//   docs: {
//     description: {
//       story: "Juno DataGrid complete with Head and Foot",
//     },
//   },
// }
// WithHeadAndFoot.args = {
//   items: [
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//   ],
// }

// export const FullyFeatured = WithHeadAndFootTemplate.bind({})
// FullyFeatured.parameters = {
//   docs: {
//     description: {
//       story:
//         "Fully-Featured Juno DataGrid complete with Head, Foot, and Toolbar",
//     },
//   },
// }
// FullyFeatured.args = {
//   showToolbar: true,
//   selectable: true,
//   items: [
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//     { ...DataGridRowStory.args },
//   ],
// }
