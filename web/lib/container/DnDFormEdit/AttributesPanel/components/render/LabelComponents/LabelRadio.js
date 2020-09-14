import React from 'react';
import { Radio } from 'antd';
export default function LabelRadio({
  field,
  label,
  value,
  handle,
  options
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, label), /*#__PURE__*/React.createElement(Radio.Group, {
    value: value,
    onChange: handle.bind(null, field)
  }, options.map(item => {
    return /*#__PURE__*/React.createElement(Radio, {
      key: item.value,
      value: item.value
    }, item.label);
  })));
}