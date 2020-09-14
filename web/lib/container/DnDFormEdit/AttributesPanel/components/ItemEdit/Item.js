import React from 'react';
import { Card, Input, Icon } from 'antd';
import Options from "./Options";
import "./index.css";
export default function ItemEdit(props) {
  const {
    label,
    index,
    options,
    valueField = 'value',
    disabled,
    // 禁用 options 的编辑,
    text: {
      label: tLabel = '文本',
      value: tValue = '值'
    },
    editId,
    onClick,
    onChange,
    onRemove,
    onOptionsChange,
    onIndexChange
  } = props;
  const edit = editId === index;

  function handleClick() {
    onClick(index);
  }

  function handleMoveUp() {
    onIndexChange('up', index);
  }

  function handleMoveDown() {
    onIndexChange('down', index);
  }

  return /*#__PURE__*/React.createElement(Card, {
    size: "small",
    className: edit ? 'ZEleA-DnDFormEdit-ItemEdit-editing' : undefined,
    title: /*#__PURE__*/React.createElement("div", {
      className: "ZEleA-DnDFormEdit-ItemEdit-title",
      onClick: handleClick
    }, label),
    extra: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Icon, {
      type: "arrow-up",
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: handleMoveUp
    }), /*#__PURE__*/React.createElement(Icon, {
      type: "arrow-down",
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: handleMoveDown
    }), /*#__PURE__*/React.createElement(Icon, {
      type: "delete",
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-delete",
      onClick: onRemove.bind(null, index)
    }), /*#__PURE__*/React.createElement(Icon, {
      type: edit ? 'up' : 'down',
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: handleClick
    })),
    bodyStyle: {
      display: edit ? 'block' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", null, tLabel, ": "), /*#__PURE__*/React.createElement(Input, {
    value: label,
    onChange: onChange.bind(null, index, 'label')
  }), /*#__PURE__*/React.createElement("span", null, tValue, ": "), /*#__PURE__*/React.createElement(Input, {
    value: props[valueField],
    onChange: onChange.bind(null, index, valueField)
  }), /*#__PURE__*/React.createElement(Options, {
    index: index,
    data: options,
    disabled: disabled,
    onChange: onOptionsChange
  }));
}