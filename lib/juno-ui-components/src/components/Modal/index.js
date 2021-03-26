import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { Button } from "../Button/index.js"
import { isFunction, isString } from "../../utils.js"

import tw, { styled } from "twin.macro"
import { GlobalStyles } from "twin.macro"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"

/**
 * Half transparent overlay
 */
const BackgroundOverlay = styled.div(({ isActive }) => [
  tw`fixed 
  inset-0 
  transition-opacity`,
  isActive ? tw`opacity-100` : tw`opacity-0`,
])

/**
 * Modal holder (root) element
 */
const ModalHolder = tw.div`
  fixed 
  z-10 
  inset-0 
  overflow-y-auto
`

/**
 * Modal container element
 */
const ModalContainer = tw.div`
  flex 
  items-end 
  justify-center 
  min-h-screen 
  pt-4 
  px-4 
  pb-20 
  text-center 
  sm:block 
  sm:p-0`

/**
 * The actual modal element
 */
const ModalElement = styled.div(({ isOpen }) => [
  `& * {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  }`,
  tw`
  transition-opacity 
  inline-block 
  align-bottom 
  bg-white 
  rounded-lg 
  text-left 
  overflow-hidden 
  shadow-xl 
  transform 
  transition-all 
  sm:my-8 
  sm:align-middle 
  sm:max-w-lg 
  sm:w-full`,
  isOpen ? "opacity-100" : "opacity-0",
])

const IconWrapper = tw.div`
  mx-auto 
  flex-shrink-0 
  flex 
  items-center 
  justify-center 
  h-12 
  w-12 
  rounded-full 
  bg-red-100 
  sm:mx-0 
  sm:h-10 
  sm:w-10
`

const AttentionIcon = () => (
  <svg
    tw="h-6 w-6 text-red-600"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
)

/**
 * The modal body
 * @param {object} icon string (only attention is supported untel now) or component
 * @param {string} title
 * @param {component} children string or component
 */
const ModalBodyContent = ({ icon, title, children }) => {
  return (
    <div tw="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div tw="sm:flex sm:items-start">
        {/* icon can be a string or a component */}
        {icon && (
          <IconWrapper>
            {icon === "attention" ? <AttentionIcon /> : icon}
          </IconWrapper>
        )}

        {/* title, body */}
        <div tw="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          {title && (
            <h3
              tw="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              {title}
            </h3>
          )}

          {/* body */}
          <div tw="mt-2">{children}</div>
        </div>
      </div>
    </div>
  )
}

/**
 * The modal footer (buttons)
 * @param {object} children string r component
 */
const ModalButtonsContent = ({ children }) => {
  return (
    <div tw="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      {children}
    </div>
  )
}

/**
 * Modal component
 * @param {boolean} isOpen if true the modal component is rendered
 * @param {function} onClose a callback to request a change of isOpen
 * @param {string|function} icon string or component
 * @param {string} title
 * @param {object} children  string, component or function.
 * If children is a function so Body and Buttons are provided as parameters and
 * should be used inside the function.
 */
const Modal = ({ isOpen, onClose, icon, title, children }) => {
  const [visible, setIsVisible] = React.useState(false)

  // handles the visibility of the modal view dependent of isOpen
  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setTimeout(() => setIsVisible(false), 150)
    }
  }, [isOpen])

  // prepare the modal body component
  const ModalBody = React.useCallback(
    ({ children }) => (
      <ModalBodyContent
        icon={icon}
        title={title}
        onClose={onClose}
        children={children}
      />
    ),
    [icon, title, onClose]
  )

  // we use an extra variable to handle the visibility because of the opacity effect
  // the view need some time to proceed the effect.
  if (!visible) return null

  return (
    <ModalHolder>
      <ModalContainer>
        <BackgroundOverlay isActive={isOpen}>
          <div tw="absolute inset-0 bg-gray-500 opacity-75"></div>
        </BackgroundOverlay>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          tw="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <ModalElement
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {isFunction(children) ? (
            children({ Body: ModalBody, Buttons: ModalButtonsContent })
          ) : (
            <>
              <ModalBody>
                {isString(children) ? (
                  <p tw="text-sm text-gray-500">{children}</p>
                ) : (
                  children
                )}
              </ModalBody>
              <ModalButtonsContent>
                <Button onClick={(e) => onClose()}>Close</Button>
              </ModalButtonsContent>
            </>
          )}
        </ModalElement>
      </ModalContainer>
    </ModalHolder>
  )
}

const ModalHandler = ({ isolate, ...props }) => {
  isolate = isolate !== false
  const [wrapper, setWrapper] = React.useState()

  React.useEffect(() => {
    let element = document.getElementById("juno-ui-component-modal-holder")
    if (!element) {
      element = document.createElement("div")
      element.setAttribute("id", "juno-ui-component-modal-holder")
      if (isolate) element.attachShadow({ mode: "open" })
      document.body.appendChild(element)
    }
    setWrapper(isolate ? element.shadowRoot : element)
  }, [])

  const stylesCache = React.useMemo(
    () =>
      createCache({
        key: "juno-ui-component-modal-style",
        container: wrapper,
      }),
    [wrapper]
  )

  if (!wrapper) return null

  return ReactDOM.createPortal(
    <CacheProvider value={stylesCache}>
      {isolate && <GlobalStyles />}
      <Modal {...props} />
    </CacheProvider>,

    wrapper
  )
}

export { ModalHandler as Modal }

Modal.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.oneOf(["attention"]), PropTypes.func]),
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

Modal.defaultProps = {
  title: "Hello World",
}
