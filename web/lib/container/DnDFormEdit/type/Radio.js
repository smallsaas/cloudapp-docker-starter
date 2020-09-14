import React from 'react';
import { Radio } from 'antd';
export default function SRadio({
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
  return /*#__PURE__*/React.createElement(Radio.Group, {
    options: items,
    value: [value]
  });
}