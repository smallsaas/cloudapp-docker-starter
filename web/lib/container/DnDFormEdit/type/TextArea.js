import React from 'react';
import { Input } from 'antd';
const {
  TextArea
} = Input;
export default (({
  config
}) => {
  const {
    options = {}
  } = config;
  const {
    value = {},
    placeholder = {},
    minRows = {},
    maxRows = {}
  } = options.base || {};
  return /*#__PURE__*/React.createElement(TextArea, {
    value: value.value,
    placeholder: placeholder.value,
    autoSize: {
      minRows: minRows.value,
      maxRows: maxRows.value
    }
  });
});