import React from 'react';
import { Input } from 'antd';
export default function InputWrapped({
  label,
  field,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, label, /*#__PURE__*/React.createElement(Input, {
    onChange: onChange.bind(null, field),
    value: value
  }));
}