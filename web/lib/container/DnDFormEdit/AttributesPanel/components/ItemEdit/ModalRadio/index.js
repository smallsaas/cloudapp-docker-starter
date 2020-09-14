import React, { useState, useEffect } from 'react';
import Input from "./Input";
import TableField from "../../render/LabelComponents/TableField";
import SaveData from "../../render/LabelComponents/SaveData";
export default function ModalRadioOptions({
  data = {},
  onChange
}) {
  function handleChange(field, e) {
    const value = e.target.value;
    onChange({ ...data,
      [field]: value
    });
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
    label: "\u5F15\u5BFC\u6587\u672C",
    field: "title",
    onChange: handleChange,
    value: data.title
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u5C55\u793A\u6587\u672C",
    field: "label",
    onChange: handleChange,
    value: data.label
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u7F16\u8F91\u65F6\u5C55\u793A\u6587\u672C",
    field: "editLabel",
    onChange: handleChange,
    value: data.editLabel
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u63D0\u4EA4\u7684\u5B57\u6BB5",
    field: "value",
    onChange: handleChange,
    value: data.value
  }), /*#__PURE__*/React.createElement(Input, {
    label: "API",
    field: "API",
    onChange: handleChange,
    value: data.API
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(TableField, {
    field: "fields",
    label: "\u5217\u8868\u5B57\u6BB5",
    value: data.fields || [],
    handle: handleChange
  }), /*#__PURE__*/React.createElement(SaveData, {
    field: "saveData",
    label: "\u6DFB\u52A0\u989D\u5916\u4FDD\u5B58\u6570\u636E",
    tLabel: "\u628A\u9009\u62E9\u7684\u6570\u636E\u7684\u5B57\u6BB5",
    tValue: "\u4FDD\u5B58\u4E3A\u4EE5\u4E0B\u5B57\u6BB5",
    value: data.saveData || {},
    handle: handleChange
  }));
}