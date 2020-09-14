function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Button, Menu, Pagination } from 'antd';
import NavMenuItem from "./NavMenuItem";
const {
  Item
} = Menu;
export default function NavMenu({
  selectId,
  data,
  onClick,
  onCreate,
  onEdit,
  onRemote,
  pagination,
  onPagination
}) {
  if (!data.length) return null;

  function handleClick({
    key
  }) {
    const find = data.find(i => String(i.id) === key);
    onClick(find);
  }

  function handleCreate() {
    onCreate();
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, onCreate ? /*#__PURE__*/React.createElement(Button, {
    icon: "plus",
    type: "dashed",
    block: true,
    onClick: handleCreate
  }, "\u65B0\u589E") : null, /*#__PURE__*/React.createElement(Menu, {
    mode: "inline",
    onClick: handleClick,
    selectedKeys: [selectId],
    style: {
      width: 186
    }
  }, data.map(item => {
    return /*#__PURE__*/React.createElement(Item, {
      key: item.id
    }, /*#__PURE__*/React.createElement(NavMenuItem, {
      data: item,
      onEdit: onEdit,
      onRemote: onRemote
    }));
  })), pagination && onPagination ? /*#__PURE__*/React.createElement(Pagination, _extends({
    simple: true
  }, pagination, {
    onChange: onPagination
  })) : null);
}