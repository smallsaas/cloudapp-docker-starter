import React, { useState, useRef } from 'react';
import { Modal, Button, Radio } from 'antd';
export default function GlobalStyle({
  layoutType,
  dispatch
}) {
  const [visible, setVisible] = useState(false);
  const layoutValue = useRef('');

  function handleVisible() {
    setVisible(!visible);
  }

  function handleChange(e) {
    layoutValue.current = e.target.value;
  }

  function handleSave() {
    dispatch({
      type: 'save',
      payload: {
        layoutType: layoutValue.current
      }
    });
    handleVisible();
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    onClick: handleVisible
  }, "\u5168\u5C40\u6837\u5F0F"), /*#__PURE__*/React.createElement(Modal, {
    destroyOnClose: true,
    visible: visible,
    onOk: handleSave,
    onCancel: handleVisible
  }, /*#__PURE__*/React.createElement(Radio.Group, {
    defaultValue: layoutType,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement(Radio, {
    value: "horizontal"
  }, "horizontal"), /*#__PURE__*/React.createElement(Radio, {
    value: "vertical"
  }, "vertical"))));
}