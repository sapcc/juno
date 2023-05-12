import React, { useEffect } from 'react';

const withDeprecationWarning = (WrappedComponent, message) => {
  
  const ComponentWithDeprecationWarning = (props) => {
    useEffect(() => {
      console.warn(message);
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithDeprecationWarning;
};

export default withDeprecationWarning;
