import React from "react"
import PropTypes from "prop-types"
import { Button } from "../Button/index.js"
import { isFunction, isString } from "../../utils.js"

const AttentionIcon = () => (
  <svg
    className="h-6 w-6 text-red-600"
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
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        {/* icon can be a string or a component */}
        {icon && (
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            {icon === "attention" ? <AttentionIcon /> : icon}
          </div>
        )}

        {/* title, body */}
        <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          {title && (
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              {title}
            </h3>
          )}

          {/* body */}
          <div className="mt-2">{children}</div>
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
    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
export const Modal = ({ isOpen, close, icon, title, children }) => {
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
      <ModalBodyContent icon={icon} title={title} children={children} />
    ),
    [icon, title, close]
  )

  // we use an extra variable to handle the visibility because of the opacity effect
  // the view need some time to proceed the effect.
  if (!visible) return null

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      {/* Modal container */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* background overlay*/}
        <div
          className={`fixed inset-0 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal content */}
        <div
          className="transition-opacity inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {isFunction(children) ? (
            children({ Body: ModalBody, Buttons: ModalButtonsContent, close })
          ) : (
            <>
              <ModalBody>
                {isString(children) ? (
                  <p className="text-sm text-gray-500">{children}</p>
                ) : (
                  children
                )}
              </ModalBody>
              <ModalButtonsContent>
                <Button onClick={(e) => close()}>Close</Button>
              </ModalButtonsContent>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.oneOf(["attention"]), PropTypes.func]),
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  close: PropTypes.func,
}

Modal.defaultProps = {
  title: "Hello World",
}
