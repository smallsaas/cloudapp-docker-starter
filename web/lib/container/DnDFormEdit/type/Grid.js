import React from 'react';
import { Row, Col } from 'antd';
import Render from "./Layout";
export default (props => {
  const {
    config,
    dispatch
  } = props;
  const {
    value,
    items
  } = config;
  return /*#__PURE__*/React.createElement(Row, null, [...Array(value.length)].map((_, i) => {
    const itemCfg = items[i] || {};
    return /*#__PURE__*/React.createElement(Col, {
      key: i,
      span: value[i]
    }, /*#__PURE__*/React.createElement(Render, {
      index: i,
      itemCfg: itemCfg,
      config: config,
      dispatch: dispatch
    }));
  }));
});