import React from 'react';
import { Checkbox, Input } from 'antd';
export default function CheckboxWrapped({
  field,
  data,
  onChange,
  onMsgChange
}) {
  const {
    label,
    value,
    message
  } = data || {};

  function handleChange(e) {
    onChange(field, e.target.checked ? field : undefined);
  }

  function handleMsgChange(e) {
    onMsgChange(field, e.target.value);
  }

  if (data) {
    if (message !== undefined) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Checkbox, {
        checked: value === field,
        onChange: handleChange
      }, label), /*#__PURE__*/React.createElement(Input, {
        value: message,
        onChange: handleMsgChange
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null));
    }

    return /*#__PURE__*/React.createElement(Checkbox, {
      checked: value === field,
      onChange: handleChange
    }, label);
  }

  return null;
}