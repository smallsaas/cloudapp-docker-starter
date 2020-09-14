function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Checkbox, Spin } from 'antd';
import { query } from "../utils/request";
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
export default function CheckboxFetch({
  className,
  props,
  defaultValue,
  value,
  options,
  namespace,
  ...rest
}) {
  const {
    API,
    dataField = 'records',
    label: optLabel = 'label',
    value: optValue = 'value'
  } = options;
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([]);
  useDidMount(getData);

  function getData() {
    if (API) {
      const fAPI = formatAPI(API, {
        namespace
      });
      setLoading(true);
      query(fAPI).then(data => {
        const list = Array.isArray(data) ? data : data[dataField];

        if (Array.isArray(list)) {
          setOptionList(list.map(item => ({
            label: item[optLabel],
            value: item[optValue]
          })));
        } else {
          console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
        }
      }).finally(_ => {
        setLoading(false);
      });
    }
  }

  return /*#__PURE__*/React.createElement(Spin, {
    className: className,
    spinning: loading
  }, /*#__PURE__*/React.createElement(Checkbox.Group, _extends({
    defaultValue: typeof defaultValue === 'string' ? [] : defaultValue,
    value: typeof value === 'string' ? [] : value,
    options: optionList
  }, rest, props)));
}