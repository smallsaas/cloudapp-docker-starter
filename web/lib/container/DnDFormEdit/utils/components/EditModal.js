import React, { useState, useRef } from 'react';
import { Modal, Input, Typography } from 'antd';
const {
  Text
} = Typography;
export default (({
  visible,
  onSave,
  onCancel,
  config
}) => {
  const {
    title,
    value,
    tips
  } = config;
  const [error, setError] = useState('');
  const inputEl = useRef(null);

  function handleSave() {
    setError('');
    const newValue = inputEl.current.state.value;

    try {
      onSave(JSON.parse(newValue));
    } catch (error) {
      setError('输入了无效的 JSON 格式');
      inputEl.current.focus();
    }
  }

  return /*#__PURE__*/React.createElement(Modal, {
    visible: visible,
    title: "\u7F16\u8F91\u6574\u884C\u7684\u5E03\u5C40\u914D\u7F6E",
    onCancel: onCancel,
    onOk: handleSave
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Text, null, "\u5E03\u5C40\u7C7B\u578B\u540D: ")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Text, {
    strong: true
  }, title)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Text, null, "\u5E03\u5C40\u914D\u7F6E: ")), /*#__PURE__*/React.createElement(Input, {
    ref: inputEl,
    defaultValue: JSON.stringify(value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'red'
    }
  }, error), /*#__PURE__*/React.createElement(Text, {
    type: "secondary"
  }, tips));
});