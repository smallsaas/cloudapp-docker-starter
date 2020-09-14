function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Select, Spin } from 'antd';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { query } from "../utils/request";
const Option = Select.Option;
/**
 * 专门用来读取 数字字典 的 域 的下拉框
 *
 * @export
 * @param {object} props
 * @returns
 */

export default function SelectField(props) {
  const {
    className,
    value,
    options,
    namespace,
    onChange,
    ...rest
  } = props;
  const {
    API = '/api/config/field/options',
    field,
    dataField = 'records',
    label: optLabel = 'name',
    value: optValue = 'value'
  } = options;
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([]);
  useDidMount(getData);

  function getData() {
    if (API && field) {
      setLoading(true);
      query(`${API}/${field}`).then(data => {
        const list = Array.isArray(data) ? data : data[dataField];

        if (Array.isArray(list)) {
          setOptionList(list);
        } else {
          console.warn(`API ${API} 返回的 data 预期应该为 Array, 实际: `, list);
        }
      }).finally(_ => {
        setLoading(false);
      });
    }
  }

  function handleChange(value) {
    onChange({
      target: {
        value
      }
    });
  }

  return /*#__PURE__*/React.createElement(Spin, {
    className: className,
    spinning: loading
  }, /*#__PURE__*/React.createElement(Select, _extends({
    onChange: handleChange,
    value: value
  }, rest), optionList.map(opt => /*#__PURE__*/React.createElement(Option, {
    key: opt[optValue],
    value: opt[optValue]
  }, opt[optLabel]))));
}