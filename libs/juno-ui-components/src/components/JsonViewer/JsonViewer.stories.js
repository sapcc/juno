import React from "react"
import { JsonViewer } from "./index.js"

export default {
  title: "Components/JsonViewer",
  component: JsonViewer,
  description: "TEST",
  argTypes: {},
  parameters: {
    controls: { sort: "alpha" },
  },
}

const data = {
  id: 9,
  date: new Date(),
  getPrice: () => `$12`,
  regex: /^(.+)$/,
  nan: NaN,
  null: null,
  title: "Infinix INBOOK",
  description: "Infinix Inbook X1 Ci3 10th 8GB...",
  price: 1099,
  discountPercentage: 11.83,
  rating: 4.54,
  stock: 96,
  available: true,
  brand: "Infinix",
  category: "laptops",
  thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
  test: "https://i.dummyjson.com/data/products/9/thumbnail.jpg?xxxxxxxxxxxxxxxxnnnnnnnnnnnnnnnnnnnnnnnndddddddddddddddddddddddddddddddd",
  test2:
    "LoremipsumdolorsitametconsectetueradipiscingelitAeneancommodoligulaegetdolorAeneanmassaCumsociisnatoquepenatibusetmagnisdisparturientmontesnasceturridiculus",
  images: [
    "https://i.dummyjson.com/data/products/9/1.jpg",
    "https://i.dummyjson.com/data/products/9/2.png",
    "https://i.dummyjson.com/data/products/9/3.png",
    "https://i.dummyjson.com/data/products/9/4.jpg",
    "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
  ],
}

const Template = (args) => <JsonViewer {...args} />

/** TEST */
export const Default = Template.bind({})
Default.args = {
  data,
}

export const Light = Template.bind({})
Light.args = {
  theme: "light",
  data,
}

export const Expanded = Template.bind({})
Expanded.args = {
  expanded: Infinity,
  data,
}
export const CustomTheme = Template.bind({})
CustomTheme.args = {
  theme: {
    base00: "rgb(39, 40, 34)",
    base01: "rgb(245, 245, 245)",
    base02: "rgb(73, 72, 62)",
    base03: "#93a1a1",
    base04: "rgb(165, 159, 133)",
    base05: "rgb(248, 248, 242)",
    base06: "#073642",
    base07: "rgb(249, 248, 245)",
    base08: "rgb(249, 38, 114)",
    base09: "rgb(253, 151, 31)",
    base0A: "rgb(244, 191, 117)",
    base0B: "rgb(166, 226, 46)",
    base0C: "rgb(161, 239, 228)",
    base0D: "rgb(102, 217, 239)",
    base0E: "rgb(174, 129, 255)",
    base0F: "rgb(204, 102, 51)",
  },
  data: { ...data, test2: undefined },
  truncate: false,
}
