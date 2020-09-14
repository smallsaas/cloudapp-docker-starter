import React from 'react';
import { Input } from 'antd';
export default function Expect({
  data,
  onChange
}) {
  const {
    expectedField = {},
    expectedValue = {}
  } = data;

  function handleChange(field, e) {
    onChange(field, e.target.value);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, "\u9884\u671F\u5B57\u6BB5: "), /*#__PURE__*/React.createElement(Input, {
    value: expectedField.value,
    onChange: handleChange.bind(null, 'expectedField')
  }), /*#__PURE__*/React.createElement("div", null, "\u9884\u671F\u503C: "), /*#__PURE__*/React.createElement(Input, {
    value: expectedValue.value,
    onChange: handleChange.bind(null, 'expectedValue')
  }));
}