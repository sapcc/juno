import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon/index.js";

const toastStyles = `
	jn-bg-theme-background-lvl-1
	jn-text-theme-high 
	jn-inline-flex	
	jn-items-start
	jn-p-2
	jn-mb-8
	jn-rounded
`;
const toastStylesText = `
	jn-mx-4
	jn-max-w-full
`;

// get the appropriate icon for messasge tyope by MUI name:
const getMuiIcon = (messageType) => {
  switch (messageType) {
    case "error":
      return "dangerous";
    default:
      return messageType;
  }
};

export const Toast = ({
  variant,
  children,
  text,
  autoDismiss,
  autoDismissTimeout,
  onDismiss,
  className,
  ...props
}) => {
  const [visible, setVisible] = useState(true);

  // ----- Timeout stuff -------
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current); // clear when component is unmounted
  }, []);

  // if autoDissmiss is true, hide message after passed or preconfigured timeout
  useEffect(() => {
    if (autoDismiss) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => hideMessage(), autoDismissTimeout);
    }
  }, [autoDismiss, autoDismissTimeout]);

  const hideMessage = () => {
    setVisible(false);
    // call the callback dismiss message (if any)
    onDismiss && onDismiss();
  };

  return (
    <>
      {visible && (
        <div
          className={`juno-toast juno-toast-${variant} ${toastStyles} ${className}`}
          {...props}>
          <Icon
            icon={getMuiIcon(variant)}
            color={"jn-text-theme-" + variant}
            className='jn-shrink-0'
          />
          <div className={`juno-toast-text ${toastStylesText}`}>
            {children ? children : text}
          </div>
          <Icon
            icon='close'
            onClick={hideMessage}
            className='juno-message-close-button jn-opacity-50 hover:jn-opacity-100 jn-shrink-0'
          />
        </div>
      )}
    </>
  );
};

Toast.propTypes = {
  /** Specify a semantic variant */
  variant: PropTypes.oneOf(["info", "warning", "danger", "error", "success"]),
  /** Pass child nodes to be rendered as contents */
  children: PropTypes.node,
  /** Pass an optional text */
  text: PropTypes.string,
  /** Optional. If set to 'true', the message will be automatically dismissed after 10 seconds by default or after the specified autoDismissTimeout */
  autoDismiss: PropTypes.bool,
  /** Optional. Timeout in miliseconds after which the message is automatically dismissed. By default 10000 (10s).*/
  autoDismissTimeout: PropTypes.number,
  /** Optional. Pass a handler that will be called when the message is dismissed */
  onDismiss: PropTypes.func,
  /** Pass an optional className */
  className: PropTypes.string,
};

Toast.defaultProps = {
  variant: "info",
  children: null,
  text: "",
  autoDismiss: false,
  autoDismissTimeout: 10000,
  onDismiss: undefined,
  className: "",
};
