import React from "react"
import { JsonViewer } from "./index.js"

export default {
  title: "Components/JsonViewer",
  component: JsonViewer,
  argTypes: {},
}

const Template = (args) => <JsonViewer {...args} />

export const Default = Template.bind({})
Default.args = {
  data: {
    id: 9,
    title: "Infinix INBOOK",
    description: "Infinix Inbook X1 Ci3 10th 8GB...",
    price: 1099,
    discountPercentage: 11.83,
    rating: 4.54,
    stock: 96,
    brand: "Infinix",
    category: "laptops",
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/9/1.jpg",
      "https://i.dummyjson.com/data/products/9/2.png",
      "https://i.dummyjson.com/data/products/9/3.png",
      "https://i.dummyjson.com/data/products/9/4.jpg",
      "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
    ],
  },
}

export const Light = Template.bind({})
Light.args = {
  theme: "light",
  data: {
    id: 9,
    title: "Infinix INBOOK",
    description: "Infinix Inbook X1 Ci3 10th 8GB...",
    price: 1099,
    discountPercentage: 11.83,
    rating: 4.54,
    stock: 96,
    brand: "Infinix",
    category: "laptops",
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/9/1.jpg",
      "https://i.dummyjson.com/data/products/9/2.png",
      "https://i.dummyjson.com/data/products/9/3.png",
      "https://i.dummyjson.com/data/products/9/4.jpg",
      "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
    ],
  },
}

export const Expanded = Template.bind({})
Expanded.args = {
  expanded: true,
  data: {
    id: 9,
    title: "Infinix INBOOK",
    description: "Infinix Inbook X1 Ci3 10th 8GB...",
    price: 1099,
    discountPercentage: 11.83,
    rating: 4.54,
    stock: 96,
    brand: "Infinix",
    category: "laptops",
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
    test: "https://i.dummyjson.com/data/products/9/thumbnail.jpgxxxxxxxxxxxxxxxxnnnnnnnnnnnnnnnnnnnnnnnndddddddddddddddddddddddddddddddd",
    images: [
      "https://i.dummyjson.com/data/products/9/1.jpg",
      "https://i.dummyjson.com/data/products/9/2.png",
      "https://i.dummyjson.com/data/products/9/3.png",
      "https://i.dummyjson.com/data/products/9/4.jpg",
      "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
    ],
  },
}
export const CustomTheme = Template.bind({})
CustomTheme.args = {
  theme: {
    base00: "rgba(0, 0, 0, 0)",
    base01: "rgb(245, 245, 245)",
    base02: "rgb(235, 235, 235)",
    base03: "#93a1a1",
    base04: "rgba(255, 255, 255, 0.3)",
    base05: "#586e75",
    base06: "#073642",
    base07: "#ddd",
    base08: "#d33682",
    base09: "#cb4b16",
    base0A: "#dc322f",
    base0B: "#859900",
    base0C: "#6c71c4",
    base0D: "#586e75",
    base0E: "#2aa198",
    base0F: "#268bd2",
  },
  data: {
    id: 9,
    title: "Infinix INBOOK",
    description: "Infinix Inbook X1 Ci3 10th 8GB...",
    price: 1099,
    discountPercentage: 11.83,
    rating: 4.54,
    stock: 96,
    brand: "Infinix",
    category: "laptops",
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/9/1.jpg",
      "https://i.dummyjson.com/data/products/9/2.png",
      "https://i.dummyjson.com/data/products/9/3.png",
      "https://i.dummyjson.com/data/products/9/4.jpg",
      "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
    ],
  },
}
