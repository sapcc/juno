import React, { useEffect, useRef, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Button,
  MainTabs,
  Tab,
  TabList,
  TabPanel,
  Select,
  SelectOption,
  FormRow,
  TextInput,
} from "juno-ui-components"

// from camelcase to underscore
// https://stackoverflow.com/questions/4149276/javascript-camelcase-to-regular-form
const camelToSnake = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

const MaterialIcon = ({ name, width, height }) => {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return

    fetch(new URL(`./svg/filled/${name}.svg`, import.meta.url))
      .then((r) => {
        return r.text()
      })
      .then((text) => {
        ref.current.innerHTML = text
        ref.current.children[0].setAttribute("width", width)
        ref.current.children[0].setAttribute("height", height)
        ref.current.replaceWith(ref.current.children[0])
      })
  }, [ref.current, name, height, width])

  return <div ref={ref}></div>
}

const DynamicLoadIcon = () => {
  const [iconComponent, setIconComponent] = useState(null)
  const [iconAttributes, setIconAttributes] = useState({
    name: "account_circle",
    width: 24,
    height: 24,
    alt: "",
    title: "",
  })
  const [svg, setSvg] = useState(null)

  return (
    <>
      <Container px={false} py={true}>
        <FormRow>
          <TextInput
            label="Name"
            value={iconAttributes.name}
            placeholder="Icon name"
            onChange={(event) => {
              setIconAttributes({ ...iconAttributes, name: event.target.value })
            }}
          />
        </FormRow>
        <FormRow>
          <TextInput
            label="Height"
            placeholder="Icon height"
            onChange={(event) => {
              setIconAttributes({
                ...iconAttributes,
                height: event.target.value,
              })
            }}
          />
        </FormRow>
        <FormRow>
          <TextInput
            label="Width"
            placeholder="Icon width"
            onChange={(event) => {
              setIconAttributes({
                ...iconAttributes,
                width: event.target.value,
              })
            }}
          />
        </FormRow>
        <FormRow>
          <TextInput label="Alt" placeholder="Icon alt" />
        </FormRow>
        <FormRow>
          <TextInput label="Title" placeholder="Icon title" />
        </FormRow>
      </Container>
      {/* {iconComponent && iconComponent} */}
      <MaterialIcon
        name={iconAttributes.name}
        width={iconAttributes.width}
        height={iconAttributes.height}
      />
    </>
  )
}

export default DynamicLoadIcon
