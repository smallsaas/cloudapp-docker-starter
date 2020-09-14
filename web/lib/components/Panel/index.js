import React, { useState, useEffect, useRef, useReducer, useMemo } from 'react';
import { Flex } from 'layout-flex';
import { DownOutlined } from '@ant-design/icons';
import "./index.css";
const {
  FlexItem
} = Flex;
export default function Panel({
  title,
  defaultCollapse = false,
  delayed = false,
  children
}) {
  const [collapse, setCollapse] = useState(defaultCollapse);
  const [count, forcedUpdate] = useReducer(x => x + 1, 0);
  const domContent = useRef(null);
  const height = useRef(undefined);
  const [contentStyle, iconStyle] = useMemo(_ => {
    if (collapse) {
      return [{
        height: 0,
        padding: 0
      }, {
        transform: 'rotate(180deg)'
      }];
    }

    return [{
      height: height.current,
      padding: undefined
    }, {
      transform: undefined
    }]; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapse, count]);
  useEffect(_ => {
    if (!collapse) {
      setTimeout(_ => {
        height.current = undefined;
        forcedUpdate();
      }, 200);
    }
  }, [collapse]);

  function handleCollapse() {
    if (!collapse) {
      height.current = domContent.current.clientHeight;
    }

    setCollapse(!collapse);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-Panel"
  }, /*#__PURE__*/React.createElement(Flex, {
    className: "ZEleA-Panel-title"
  }, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement("div", {
    onClick: handleCollapse
  }, title)), /*#__PURE__*/React.createElement(FlexItem, {
    className: "ZEleA-Panel-icon",
    style: iconStyle
  }, /*#__PURE__*/React.createElement(DownOutlined, {
    type: "down",
    onClick: handleCollapse
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-Panel-content",
    ref: domContent,
    style: contentStyle
  }, delayed ? !collapse && children : children));
}