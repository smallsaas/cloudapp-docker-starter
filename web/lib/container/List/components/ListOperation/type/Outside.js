import React from 'react';
export default ((item, i, {
  index,
  record
}, onAction) => {
  return /*#__PURE__*/React.createElement("span", {
    key: i,
    onClick: onAction.bind(null, item.type, item.options),
    className: "ZEleA-table-action-Outside-normal"
  }, item.title);
});