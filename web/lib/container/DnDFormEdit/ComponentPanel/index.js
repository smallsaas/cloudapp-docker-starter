function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Drawer } from 'antd';
import RightClick from "./components/RightClick";
import GlobalStyle from "./components/GlobalStyle";
import LayoutType from "../compoments/LayoutType";
import ElementType from "../compoments/ElementType";
import layoutList from "./layout.config";
import elementList from "./element.config";
import advancedList from "./advanced.config";
import "../index.css";

function Render({
  cfg,
  dispatch
}) {
  const {
    title,
    type,
    options
  } = cfg;

  if (options) {
    return /*#__PURE__*/React.createElement(ElementType, {
      title: title,
      type: type,
      options: JSON.parse(JSON.stringify(options)),
      dispatch: dispatch
    });
  }

  return /*#__PURE__*/React.createElement(LayoutType, _extends({}, cfg, {
    dispatch: dispatch
  }));
}

export default (({
  layoutType,
  dispatch,
  copyList
}) => {
  return /*#__PURE__*/React.createElement(Drawer, {
    visible: true,
    mask: false,
    closable: false
  }, /*#__PURE__*/React.createElement(GlobalStyle, {
    layoutType: layoutType,
    dispatch: dispatch
  }), /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u5E03\u5C40\u7EC4\u4EF6"), layoutList.map((cfg, i) => {
    return /*#__PURE__*/React.createElement(Render, {
      key: i,
      cfg: cfg,
      dispatch: dispatch
    });
  }), /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u57FA\u672C\u7EC4\u4EF6"), elementList.map((cfg, i) => {
    return /*#__PURE__*/React.createElement(Render, {
      key: i,
      cfg: cfg,
      dispatch: dispatch
    });
  }), /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u9AD8\u7EA7\u7EC4\u4EF6"), advancedList.map((cfg, i) => {
    return /*#__PURE__*/React.createElement(Render, {
      key: i,
      cfg: cfg,
      dispatch: dispatch
    });
  }), copyList.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u590D\u5236\u7EC4\u4EF6"), copyList.map((cfg, i) => {
    return /*#__PURE__*/React.createElement(RightClick, {
      key: i,
      dispatch: dispatch,
      data: cfg
    }, /*#__PURE__*/React.createElement(Render, {
      cfg: cfg,
      dispatch: dispatch
    }));
  })) : null);
});