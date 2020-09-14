import React from 'react';
import TableSelect from "../TableSelect";
export default function TableCheckbox({
  namespace,
  value,
  field,
  optValue,
  onChange,
  formData,
  ...rest // API fields pagination requireValid

}) {
  return /*#__PURE__*/React.createElement(TableSelect, {
    namespace: namespace,
    value: getSelectedKeys(value, formData, {
      field,
      vField: optValue
    }) // value={typeof value === 'object' ? [value] : [{ [optValue]: value }]}
    ,
    onChange: onChange,
    options: {
      type: 'checkbox',
      value: optValue,
      ...rest
    }
  });
}

function getSelectedKeys(data, formData, {
  field,
  vField
}) {
  if (data) {
    if (Array.isArray(data.value)) {
      return data.value;
    }
  }

  if (formData) {
    if (typeof formData === 'object') {
      if (Array.isArray(formData[field])) {
        return formData[field];
      }
    }
  }

  return undefined;
}