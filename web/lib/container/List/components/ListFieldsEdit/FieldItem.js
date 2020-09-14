import React from 'react';
import { Flex } from 'layout-flex';
import { Checkbox } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import "../../index.css";
const {
  FlexItem
} = Flex;
export default (({
  data,
  checkedList,
  onSwitchChecked,
  onMoveField
}) => {
  const checked = checkedList.findIndex(key => key === data.field) > -1;

  function onUp() {
    onMoveField('up', data);
  }

  function onDown() {
    onMoveField('down', data);
  }

  return /*#__PURE__*/React.createElement(Flex, {
    className: "ZEleA-ListFieldsEdit-FieldItem"
  }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(Checkbox, {
    checked: checked,
    onChange: onSwitchChecked.bind(this, data)
  })), /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement("span", {
    className: "ZEleA-ListFieldsEdit-FieldItem-label",
    onClick: onSwitchChecked.bind(this, data)
  }, data.label)), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(ArrowUpOutlined, {
    className: "ZEleA-ListFieldsEdit-FieldItem-icon",
    onClick: onUp
  }), /*#__PURE__*/React.createElement(ArrowDownOutlined, {
    className: "ZEleA-ListFieldsEdit-FieldItem-icon",
    onClick: onDown
  })));
});