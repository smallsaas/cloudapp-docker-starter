import React from 'react';
import { DatePicker } from 'antd';
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
  return /*#__PURE__*/React.createElement(DatePicker, {
    placeholder: placeholder.value,
    value: null
  });
});