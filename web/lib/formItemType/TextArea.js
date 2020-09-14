function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Input } from 'antd';
const {
  TextArea
} = Input;
export default (({
  props,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement(TextArea, _extends({
    autoSize: {
      minRows: 2
    }
  }, rest, props));
});