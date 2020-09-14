import React from 'react';
import { Switch } from 'antd';
export default ((item, i, {
  index,
  record
}, onAction) => {
  const {
    field = 'enabled'
  } = item.options;
  const enabled = Boolean(record[field]);
  return /*#__PURE__*/React.createElement("span", {
    key: i,
    onClick: onAction.bind(null, item.type, item.options)
  }, /*#__PURE__*/React.createElement(Switch, {
    size: "small",
    checked: enabled
  }));
});