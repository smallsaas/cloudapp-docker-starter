function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import Item from "./Item";
export default (({
  items,
  valueField,
  disabled,
  text = {},
  onChange,
  onRemove,
  onOptionsChange,
  onIndexChange
}) => {
  const [editIndex, setEditIndex] = useState(-1);

  function handleClick(i) {
    if (editIndex === i) {
      setEditIndex(-1);
    } else {
      setEditIndex(i);
    }
  }

  return items.map((item, i) => {
    return /*#__PURE__*/React.createElement("div", {
      key: i
    }, /*#__PURE__*/React.createElement(Item, _extends({}, item, {
      text: text,
      valueField: valueField,
      editId: editIndex,
      index: i,
      disabled: disabled,
      onClick: handleClick,
      onChange: onChange,
      onRemove: onRemove,
      onOptionsChange: onOptionsChange,
      onIndexChange: onIndexChange
    })), /*#__PURE__*/React.createElement("br", null));
  });
});