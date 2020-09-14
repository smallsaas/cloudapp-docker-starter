import React from 'react';
import { Icon, Menu } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ElementContainer from "../../wrapped/ElementContainer";
import "../../index.css";
export default (({
  layoutId,
  index,
  onPaste
}) => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ContextMenuTrigger, {
    id: `layout_${layoutId}_${index}`
  }, /*#__PURE__*/React.createElement(ElementContainer, {
    layoutId: layoutId,
    index: index
  }, /*#__PURE__*/React.createElement("span", {
    className: "ZEleA-DnDFormEdit-empty"
  }, "\u6682\u65E0\u5185\u5BB9"))), /*#__PURE__*/React.createElement(ContextMenu, {
    id: `layout_${layoutId}_${index}`,
    className: "ZEleA-DnDFormEdit-rightClickMenu"
  }, /*#__PURE__*/React.createElement(MenuItem, null, /*#__PURE__*/React.createElement(Menu, {
    selectedKeys: []
  }, /*#__PURE__*/React.createElement(Menu.Item, {
    onClick: onPaste.bind(null, index)
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "snippets",
    className: "ZEleA-DnDFormEdit-primary"
  }), "\u7C98\u8D34\u5143\u7D20")))));
});