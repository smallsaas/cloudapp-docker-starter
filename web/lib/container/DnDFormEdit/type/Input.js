import React from 'react';
import { Input } from 'antd';
export default (({
  config
}) => {
  const {
    options = {}
  } = config;
  const {
    value = {},
    placeholder = {}
  } = options.base || {};
  return /*#__PURE__*/React.createElement(Input, {
    value: value.value,
    placeholder: placeholder.value
  });
});