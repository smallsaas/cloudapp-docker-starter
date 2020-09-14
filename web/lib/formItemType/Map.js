function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
export default (({
  props,
  value,
  options = {},
  defaultValue,
  ...rest
}) => {
  const {
    map = {}
  } = options;
  const v = value || defaultValue;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, props), map[v] || v);
});