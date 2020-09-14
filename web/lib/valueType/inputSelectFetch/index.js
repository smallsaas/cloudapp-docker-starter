import React from 'react';
import SelectFetch from "../../formItemType/SelectFetch";
import _ from 'lodash';
export default function valueTypeInputSelectFetch(props) {
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

  function handleChange(e) {
    const {
      target
    } = e;
    const {
      value
    } = target;

    _.set(record, field, value);

    onEdit && onEdit(index, record);
  }

  return /*#__PURE__*/React.createElement(SelectFetch, {
    value: text,
    options: options,
    onChange: handleChange
  });
}