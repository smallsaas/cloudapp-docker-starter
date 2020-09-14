function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { Flex } from 'layout-flex';
import { toNumber } from "../utils/tool";
const {
  FlexItem
} = Flex;
export default function NumberRange({
  value,
  props,
  options,
  onChange,
  ...rest
}) {
  const {
    min = [],
    max = []
  } = options;
  const [v, setV] = useState(value || [null, null]);
  useEffect(_ => {
    if (value === '') {
      setV([null, null]);
    }
  }, [value]);

  function handleChange(index, data) {
    if (data === null) {
      v[index] = data;
    } else {
      v[index] = toNumber(data);
    }

    setV([...v]);
    onChange(v);
  }

  return /*#__PURE__*/React.createElement(Flex, {
    className: "ZEleA-NumberRange"
  }, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(InputNumber, _extends({
    value: v[0],
    min: min[0],
    max: max[0]
  }, rest, props, {
    onChange: handleChange.bind(null, 0)
  }))), /*#__PURE__*/React.createElement("span", null, "~"), /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(InputNumber, _extends({
    value: v[1],
    min: min[1],
    max: max[1]
  }, rest, props, {
    onChange: handleChange.bind(null, 1)
  }))));
}