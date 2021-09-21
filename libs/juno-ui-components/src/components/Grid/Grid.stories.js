import React from "react"
import { Grid } from "./index.js"
import { Default as GridRow } from "../GridRow/GridRow.stories"
import { Default as GridColumn } from "../GridColumn/GridColumn.stories"
import { Col1 as GridCol1} from "../GridColumn/GridColumn.stories"
import { Col2 as GridCol2} from "../GridColumn/GridColumn.stories"
import { Col3 as GridCol3} from "../GridColumn/GridColumn.stories"
import { Col4 as GridCol4} from "../GridColumn/GridColumn.stories"
import { Col5 as GridCol5} from "../GridColumn/GridColumn.stories"
import { Col6 as GridCol6} from "../GridColumn/GridColumn.stories"
import { Col7 as GridCol7} from "../GridColumn/GridColumn.stories"
import { Col8 as GridCol8} from "../GridColumn/GridColumn.stories"
import { Col9 as GridCol9} from "../GridColumn/GridColumn.stories"
import { Col10 as GridCol10} from "../GridColumn/GridColumn.stories"
import { Col11 as GridCol11} from "../GridColumn/GridColumn.stories"
import { Col12 as GridCol12} from "../GridColumn/GridColumn.stories"


export default {
  title: "Design System/Grid/Grid",
  component: Grid,
  argTypes: {},
}

const Template = ({ rows, ...args}) =>
<Grid {...args}>
  {rows.map((row) => (
    <GridRow {...row}>
      {row.columns.map((column) => (
        <GridColumn {...column} />
      ))}
    </GridRow>
  ))}
</Grid>

export const Default = Template.bind({})
Default.args = {
  rows: [
    {
      columns: [
        GridColumn.args, 
        GridColumn.args,
        GridColumn.args, 
        GridColumn.args,
        GridColumn.args, 
        GridColumn.args,
        GridColumn.args, 
        GridColumn.args,
        GridColumn.args, 
        GridColumn.args,
        GridColumn.args, 
        GridColumn.args,
      ]
    }
  ]
}

export const GridAuto_5 = Template.bind({})
GridAuto_5.args = {
  rows: [
    {
      columns: [
        GridColumn.args,
        GridColumn.args,
        GridColumn.args,
        GridColumn.args,
        GridColumn.args,
      ]
    }
  ]
}

export const GridAllCols = Template.bind({})
GridAllCols.args = {
  rows: [
    {
      columns: [
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args
      ]
    },
    {
      columns: [
        GridCol2.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args
      ]
    },
    {
      columns: [
        GridCol3.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args
      ]
    },
    {
      columns: [
        GridCol4.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args
      ]
    },
    {
      columns: [
        GridCol5.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args
      ]
    },
    {
      columns: [
        GridCol6.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args
      ]
    },
    {
      columns: [
        GridCol7.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args
      ]
    },
    {
      columns: [
        GridCol8.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args
      ]
    },
    {
      columns: [
        GridCol9.args,
        GridCol1.args,
        GridCol1.args,
        GridCol1.args
      ]
    },
    {
      columns: [
        GridCol10.args,
        GridCol1.args,
        GridCol1.args
      ]
    },
    {
      columns: [
        GridCol11.args,
        GridCol1.args
      ]
    },
    {
      columns: [
        GridCol12.args
      ]
    }
  ]
}
