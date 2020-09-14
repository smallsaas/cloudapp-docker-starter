import React from 'react';
import { Menu, Icon } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import "../../index.css";
export default (({
  data,
  dispatch,
  children
}) => {
  function handleRemove() {
    dispatch({
      type: 'delCopyElement',
      payload: data
    });
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ContextMenuTrigger, {
    id: `right_${data.id}`
  }, children), /*#__PURE__*/React.createElement(ContextMenu, {
    id: `right_${data.id}`,
    className: "ZEleA-DnDFormEdit-rightClickMenu"
  }, /*#__PURE__*/React.createElement(MenuItem, null, /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement(Menu.Item, {
    onClick: handleRemove
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "delete",
    className: "ZEleA-DnDFormEdit-danger"
  }), "\u79FB\u9664")))));
});