import React from 'react';
import { Input } from 'antd';
import _ from 'lodash';
export default function valueTypeInputText(props) {
  const {
    field,
    handle,
    data: {
      index,
      text = '',
      record
    }
  } = props;
  const {
    onEdit
  } = handle;

  function handleChange(e) {
    const value = e.target.value;

    _.set(record, field, value);

    onEdit && onEdit(index, record);
  }

  return /*#__PURE__*/React.createElement(Input, {
    value: text,
    onChange: handleChange
  });
}