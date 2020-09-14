import React from 'react';
import Render from "../Layout";
import "./index.css";
/** 
 * 左 单独一列，上下 作为一列 的布局
 */

export default (props => {
  const {
    config,
    dispatch
  } = props;
  const {
    value,
    items
  } = config;
  return /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-Layout-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-Layout-table-row"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: value[0]
    },
    className: "ZEleA-Layout-table-cell"
  }, /*#__PURE__*/React.createElement(Render, {
    index: 0,
    itemCfg: items[0],
    config: config,
    dispatch: dispatch
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: value[1]
    },
    className: "ZEleA-Layout-table-cell"
  }, /*#__PURE__*/React.createElement(Render, {
    index: 1,
    itemCfg: items[1],
    config: config,
    dispatch: dispatch
  }), /*#__PURE__*/React.createElement(Render, {
    index: 2,
    itemCfg: items[2],
    config: config,
    dispatch: dispatch
  }))));
});