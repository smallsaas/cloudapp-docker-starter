import React, { useState } from 'react';
import { Checkbox, Select, Modal, Button } from 'antd';
import ModalRadio from "./ModalRadio";
const Option = Select.Option;
export default function Options({
  index,
  data,
  disabled,
  onChange
}) {
  const [visible, setVisible] = useState(false);
  const [optionsData, setOptionsData] = useState({});

  function handleChange(field, value) {
    onChange(index, field, value);
  }

  function handleOptionsChange(value) {
    setOptionsData(value);
  }

  function handleVisible() {
    if (!visible) {
      setOptionsData(data.options);
    }

    setVisible(!visible);
  }

  function handleOptionsSave() {
    handleVisible();
    onChange(index, 'options', optionsData);
  }

  if (!data) return null;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckboxWrapped, {
    title: "\u663E\u793A\u5728\u65B0\u589E\u754C\u9762",
    field: "echoAdd",
    value: data.echoAdd,
    disabled: disabled,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement(CheckboxWrapped, {
    title: "\u663E\u793A\u5728\u7F16\u8F91\u754C\u9762",
    field: "echoEdit",
    value: data.echoEdit,
    disabled: disabled,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement(SelectWrapped, {
    title: "\u5B57\u6BB5\u7C7B\u578B",
    field: "type",
    value: data.echoType,
    disabled: disabled,
    onChange: handleChange
  }), data.type === 'modal-radio' ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Button, {
    onClick: handleVisible
  }, "\u7F16\u8F91\u914D\u7F6E"), /*#__PURE__*/React.createElement(Modal, {
    title: "\u7F16\u8F91 \u6A21\u6001\u6846-\u5217\u8868\u5355\u9009 \u914D\u7F6E",
    visible: visible,
    onCancel: handleVisible,
    onOk: handleOptionsSave
  }, /*#__PURE__*/React.createElement(ModalRadio, {
    data: optionsData,
    onChange: handleOptionsChange
  }))) : null);
}

function CheckboxWrapped({
  title,
  field,
  value,
  disabled,
  onChange
}) {
  function handleChange(e) {
    onChange(field, e.target.checked);
  }

  if (value === undefined) return null;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Checkbox, {
    disabled: disabled,
    checked: value,
    onChange: handleChange
  }, title));
}

function SelectWrapped({
  title,
  field,
  value,
  disabled,
  onChange
}) {
  function handleChange(value) {
    onChange(field, value);
  }

  if (value === undefined) return null;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, title), /*#__PURE__*/React.createElement(Select, {
    style: {
      width: 165
    },
    disabled: disabled,
    value: value,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement(Option, {
    value: "plain"
  }, "\u7EAF\u6587\u672C"), /*#__PURE__*/React.createElement(Option, {
    value: "input"
  }, "\u8F93\u5165\u6846"), /*#__PURE__*/React.createElement(Option, {
    value: "number"
  }, "\u6570\u503C\u8F93\u5165\u6846"), /*#__PURE__*/React.createElement(Option, {
    value: "date"
  }, "\u65F6\u95F4"), /*#__PURE__*/React.createElement(Option, {
    value: "modal-radio"
  }, "\u6A21\u6001\u6846-\u5217\u8868\u5355\u9009")));
}