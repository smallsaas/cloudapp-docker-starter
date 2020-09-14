import React from 'react';
import loadable from '@loadable/component';
import { Spin } from 'antd';
export default (path => {
  return loadable(() => import(`../${path}`), {
    fallback: /*#__PURE__*/React.createElement(Spin, null)
  });
  ;
});