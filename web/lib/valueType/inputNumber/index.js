import React from 'react';
import { toNumber } from "../../utils/tool";
import { InputNumber } from 'antd';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import _ from 'lodash';
export default function ValueTypeInputNumber(props) {
  const {
    field,
    handle,
    options = {},
    data: {
      index,
      text = '',
      record
    }
  } = props;
  const {
    onEdit
  } = handle;
  const {
    defaultValue
  } = options;
  const v = toNumber(text);
  useDidMount(_ => {
    if (v === '' && defaultValue !== undefined) {
      handleChange(defaultValue);
    } else if (v) {
      handleChange(v);
    }
  });

  function handleChange(value) {
    _.set(record, field, toNumber(value));

    onEdit && onEdit(index, record);
  }

  return /*#__PURE__*/React.createElement(InputNumber, {
    value: v,
    onChange: handleChange
  });
}