import React from 'react';
import "./index.css";
export default function Empty(props) {
  const {
    style,
    children
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, children);
}