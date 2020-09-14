function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Checkbox } from 'antd';
export default (({
  props,
  defaultValue,
  value,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement(Checkbox.Group, _extends({
    defaultValue: typeof defaultValue === 'string' ? [] : defaultValue,
    value: typeof value === 'string' ? [] : value
  }, rest, props));
});