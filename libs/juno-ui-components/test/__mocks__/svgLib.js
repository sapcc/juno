// Mock idea from here: https://github.com/gregberge/svgr/issues/83#issuecomment-575038115

import React from 'react';
 
const SvgrMock = React.forwardRef((props, ref) => <span ref={ref} {...props} />);

export const ReactComponent = SvgrMock;
export default SvgrMock;
