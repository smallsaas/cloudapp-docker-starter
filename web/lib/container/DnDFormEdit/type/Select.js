import React from 'react';
import { Select } from 'antd';
const {
  Option
} = Select;
export default function SSelect({
  config
}) {
  const {
    options = {}
  } = config;
  const {
    base = {},
    style = {},
    items = []
  } = options;
  const {
    value = {}
  } = base;
  return /*#__PURE__*/React.createElement(Select, {
    value: [value.value],
    style: {
      width: 120
    }
  }, items.map(item => {
    return /*#__PURE__*/React.createElement(Option, {
      key: item.value,
      value: item.value
    }, item.label);
  }));
}