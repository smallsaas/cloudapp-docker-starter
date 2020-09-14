import React from 'react';
import { Menu } from 'antd';
import { DeleteOutlined, SnippetsOutlined, LinkOutlined, RightOutlined } from '@ant-design/icons';
export default ((item, i, {
  index,
  record
}, onAction) => {
  const iconMap = {
    'delete': DeleteOutlined,
    'modal': SnippetsOutlined,
    'path': LinkOutlined,
    'default': RightOutlined
  };
  const iconColorMap = {
    'delete': '#f5222d',
    'modal': '#1890ff',
    'path': '#1890ff',
    'default': '#666'
  };
  const Icon = item.options.icon || iconMap[item.type] || iconMap['default'];
  return /*#__PURE__*/React.createElement(Menu.Item, {
    key: i,
    className: "ZEleA-table-action-menuItem",
    onClick: onAction.bind(null, item.type, item.options)
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    style: {
      color: `${item.options.color || iconColorMap[item.type] || iconColorMap['default']}`
    }
  }), item.title));
});