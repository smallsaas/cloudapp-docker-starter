function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Drawer, Button } from 'antd';
import FieldItem from "./FieldItem";
import "../../index.css";
export default (({
  visible,
  onSwitchVisibel,
  onSaveFields,
  fields = [],
  checkedList,
  onSwitchChecked,
  onMoveField
}) => {
  const fieldItemProps = {
    checkedList,
    onSwitchChecked,
    onMoveField
  };
  return /*#__PURE__*/React.createElement(Drawer, {
    title: "\u5217\u8868\u5B57\u6BB5\u7F16\u8F91",
    placement: "right",
    closable: false,
    onClose: onSwitchVisibel,
    visible: visible
  }, fields && fields.map(item => {
    return /*#__PURE__*/React.createElement(FieldItem, _extends({
      data: item,
      key: item.field
    }, fieldItemProps));
  }), /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-ListFieldsEdit-divider"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onSwitchVisibel
  }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: onSaveFields
  }, "\u786E\u5B9A")));
});