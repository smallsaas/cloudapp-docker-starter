import React from 'react';
import { Input } from 'antd';
export default function LabelInput({
  field,
  label,
  value,
  handle
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, label), /*#__PURE__*/React.createElement(Input, {
    value: value,
    onChange: handle.bind(null, field)
  }));
}