function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Select } from 'antd';
export default function SelectWrapped(props) {
  const {
    value,
    options = [],
    onChange,
    props: p,
    ...rest
  } = props;

  function handleChange(value) {
    onChange(value);
  }

  return /*#__PURE__*/React.createElement(Select, _extends({
    onChange: handleChange,
    value: value,
    style: {
      minWidth: 120
    }
  }, rest, p), options.map((option, i) => /*#__PURE__*/React.createElement(Select.Option, {
    value: option.value,
    key: i
  }, option.label)));
}