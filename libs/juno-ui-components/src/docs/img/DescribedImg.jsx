import React from "react"

import { StyleProvider } from "../../components/StyleProvider"

import { ContentArea } from "../../components/ContentArea/index"

export function DescribedImg(props) {
  let paragraphs
  let float = "jn-float-right jn-w-1/2 jn-p-2"
  if (props.float == "left") {
    float = "jn-float-left jn-w-1/2 jn-p-2"
  }

  if (!props.text && !props.src) {
    console.warn("DescribedImg has no src and text")
    return (
      <>
        <p>Could not load described image</p>
      </>
    )
  }

  if (props.text) {
    paragraphs = props.text.split("\\n")
  }

  return (
    <StyleProvider key="decorator" stylesWrapper="inline">
      {props.src && paragraphs && (
        <ContentArea>
          <img className={float} src={props.src} alt="Ein Schwan" />
          {paragraphs.map((p) => (
            <p>{p}</p>
          ))}
        </ContentArea>
      )}
      {props.src && !paragraphs && (
        <ContentArea className="jn-flex jn-items-center jn-justify-center">
          <img src={props.src} alt="Ein Schwan" />
        </ContentArea>
      )}
      {!props.src && paragraphs && (
        <ContentArea>
          {paragraphs.map((p) => (
            <p>{p}</p>
          ))}
        </ContentArea>
      )}
    </StyleProvider>
  )
}
