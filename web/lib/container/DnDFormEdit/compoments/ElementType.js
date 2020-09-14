function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Button } from 'antd';
import ElementItem from "../wrapped/ElementItem";
export default (props => {
  const {
    title,
    type = 'Plain',
    ...rest
  } = props;
  return /*#__PURE__*/React.createElement(ElementItem, _extends({}, props, {
    type: type
  }), /*#__PURE__*/React.createElement(Button, {
    size: "small"
  }, title));
});