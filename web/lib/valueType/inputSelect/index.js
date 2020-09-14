import React from 'react';
import { Select } from 'antd';
import _ from 'lodash';
export default function valueTypeInputSelect(props) {
  const {
    field,
    handle,
    options,
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
    width = 120,
    options: opts = []
  } = options;

  function handleChange(value) {
    _.set(record, field, value);

    onEdit && onEdit(index, record);
  }

  return /*#__PURE__*/React.createElement(Select, {
    onChange: handleChange,
    value: text,
    style: {
      minWidth: width
    }
  }, opts.map((option, i) => /*#__PURE__*/React.createElement(Select.Option, {
    value: option.value,
    key: i
  }, option.label)));
}