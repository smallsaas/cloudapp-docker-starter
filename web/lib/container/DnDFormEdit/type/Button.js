import React from 'react';
import { Button } from 'antd';
export default function ButtonWrapped({
  config
}) {
  const {
    options = {}
  } = config;
  const {
    base = {},
    style = {},
    items = [],
    config: cfg
  } = options;
  const {
    value = {}
  } = base;
  const {
    title = {}
  } = cfg;
  return /*#__PURE__*/React.createElement(Button, null, title.value);
}