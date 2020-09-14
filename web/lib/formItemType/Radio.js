function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Radio } from 'antd';
export default (({
  props,
  onChange,
  ...rest
}) => {
  function handleChange(e) {
    onChange(e.target.value);
  }

  return /*#__PURE__*/React.createElement(Radio.Group, _extends({}, rest, props, {
    onChange: handleChange
  }));
});