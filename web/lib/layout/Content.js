import React from 'react';
import "./index.css";
export default function Content(props) {
  const {
    title,
    style,
    children
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    style: style,
    className: "ZEleA-Layout-Content"
  }, title ? /*#__PURE__*/React.createElement("h2", null, title) : null, children);
}