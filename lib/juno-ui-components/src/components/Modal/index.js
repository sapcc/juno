import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { Button } from "../Button/index.js"
import { isFunction, isString } from "../../utils.js"

import tw, { styled } from "twin.macro"

const BackgroundOverlay = styled.div(({ isActive }) => [
  tw`fixed 
  inset-0 
  transition-opacity`,
  isActive ? tw`opacity-100` : tw`opacity-0`,
])

const ModalHolder = tw.div`
  fixed 
  z-10 
  inset-0 
  overflow-y-auto
`

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

{
  /*
Modal element, show/hide based on modal state.

Entering: "ease-out duration-300"
From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
To: "opacity-100 translate-y-0 sm:scale-100"
Leaving: "ease-in duration-200"
From: "opacity-100 translate-y-0 sm:scale-100"
To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
*/
}
const ModalElement = styled.div(({ isOpen }) => [
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

const ModalBody = tw.div`
  bg-white 
  px-4 
  pt-5 
  pb-4 
  sm:p-6 
  sm:pb-4
`

const ModalButtons = tw.div`
  bg-gray-50 
  px-4 
  py-3 
  sm:px-6 
  sm:flex 
  sm:flex-row-reverse
`

const ModalContentWrapper = tw.div`
  sm:flex sm:items-start
`

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

const ModalContent = tw.div`
  mt-3 
  text-center 
  sm:mt-0 
  sm:ml-4 
  sm:text-left
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

export const Modal = ({ isOpen, onClose, icon, title, children, buttons }) => {
  const [visible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setTimeout(() => setIsVisible(false), 150)
    }
  }, [isOpen])

  if (!visible) return null

  return ReactDOM.createPortal(
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
          <ModalBody>
            <ModalContentWrapper>
              {/* icon can be a string or a component */}
              {icon && (
                <IconWrapper>
                  {icon === "attention" ? <AttentionIcon /> : icon}
                </IconWrapper>
              )}

              <ModalContent>
                {title && (
                  <h3
                    tw="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    {title}
                  </h3>
                )}

                <div tw="mt-2">
                  {isString(children) ? (
                    <p tw="text-sm text-gray-500">{children}</p>
                  ) : isFunction(children) ? (
                    children({ onClose })
                  ) : (
                    children
                  )}
                </div>
              </ModalContent>
            </ModalContentWrapper>
          </ModalBody>
          <ModalButtons>
            {buttons ? (
              isFunction(buttons) ? (
                buttons({ onClose })
              ) : (
                buttons
              )
            ) : (
              <Button onClick={onClose}>Close</Button>
            )}
          </ModalButtons>
        </ModalElement>
      </ModalContainer>
    </ModalHolder>,
    document.body
  )
}

Button.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.oneOf(["attention"]), PropTypes.func]),
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

Button.defaultProps = {
  icon: "attention",
  title: "Hello World",
}
