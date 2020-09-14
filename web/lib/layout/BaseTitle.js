import React, { useRef } from 'react';
import { Flex } from 'layout-flex';
import "./index.css";
const {
  FlexItem
} = Flex;
export default function BaseTitle(props) {
  const {
    title,
    style,
    extra,
    children
  } = props;
  const extraEl = useRef(null);
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, title ? /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-Layout-BaseTitle"
  }, /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, title), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-Layout-Row",
    ref: extraEl
  })))) : null, React.Children.map(children, child => {
    return /*#__PURE__*/React.cloneElement(child, {
      extraEl
    });
  }));
}