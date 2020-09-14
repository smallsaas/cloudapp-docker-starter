import React, { useState, useRef, useEffect } from 'react';
import { Button, Input } from 'antd';
import { Flex } from 'layout-flex';
const {
  FlexItem
} = Flex;
export default function ({
  data,
  dispatch
}) {
  const [editField, setEditField] = useState(null);
  const [inputData, setInputData] = useState('');
  const editValue = useRef([]);
  useEffect(_ => {
    if (editField === null) {
      editValue.current = JSON.parse(JSON.stringify(data));
    }
  }, [data, editField]);

  function handleAppend() {
    dispatch({
      type: 'appendField'
    });
  }

  function handleEdit(field) {
    setEditField(field);
    setInputData(editValue.current[field]);
  }

  function handleCancelEdit() {
    setEditField(null);
  }

  function handleValueChange(e) {
    const value = e.target.value;
    editValue.current[editField] = value;
    setInputData(value);
  }

  function handleSave() {
    dispatch({
      type: 'saveFields',
      payload: editValue.current
    });
    handleCancelEdit();
  }

  function handleRemove() {
    dispatch({
      type: 'removeFieldIndex',
      payload: {
        index: editField
      }
    });
    handleCancelEdit();
  }

  return /*#__PURE__*/React.createElement("div", null, editField !== null ? /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(Input, {
    autoFocus: true,
    value: inputData,
    onChange: handleValueChange
  })), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(Button, {
    className: "ZEleA-margin-left",
    type: "primary",
    onClick: handleSave
  }, "\u4FDD\u5B58"), /*#__PURE__*/React.createElement(Button, {
    className: "ZEleA-margin-left",
    type: "danger",
    onClick: handleRemove
  }, "\u5220\u9664"), /*#__PURE__*/React.createElement(Button, {
    className: "ZEleA-margin-left",
    onClick: handleCancelEdit
  }, "\u53D6\u6D88")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)) : null, data.map((field, i) => {
    return /*#__PURE__*/React.createElement(Button, {
      key: i,
      size: "small",
      className: "ZEleA-margin-left",
      onClick: handleEdit.bind(null, i)
    }, field);
  }), /*#__PURE__*/React.createElement(Button, {
    type: "dashed",
    className: "ZEleA-margin-left",
    size: "small",
    icon: "plus",
    onClick: handleAppend
  }));
}