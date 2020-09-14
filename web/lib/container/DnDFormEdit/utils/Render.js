import React, { Fragment } from 'react';
import typeMap from "../type";
import RowTool from "./components/RowTool";
export default function Render(props) {
  const {
    config,
    dispatch
  } = props;
  const {
    type,
    tips,
    items,
    options
  } = config;
  const Component = match(type);

  if (type === 'Canvas') {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Component, props, items.map(config => /*#__PURE__*/React.createElement(Fragment, {
      key: config.id
    }, /*#__PURE__*/React.createElement(Render, {
      config: config,
      dispatch: dispatch
    })))));
  }

  if (tips) {
    return /*#__PURE__*/React.createElement(RowTool, {
      dispatch: dispatch,
      config: config,
      component: /*#__PURE__*/React.createElement(Component, props)
    });
  }

  const {
    base,
    rules = {}
  } = options;
  const {
    label = {}
  } = base;
  const labelClassNames = ['ZEleA-Form-item-label', rules.required && rules.required.value ? 'ZEleA-Form-item-required' : '', label.value ? 'ZEleA-Form-item-label-colon' : ''];
  return /*#__PURE__*/React.createElement(React.Fragment, null, label.value ? /*#__PURE__*/React.createElement("label", {
    className: labelClassNames.join(' ')
  }, label.value) : null, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-Form-item-element"
  }, /*#__PURE__*/React.createElement(Component, props)));
}

function match(type) {
  return typeMap[type] || (() => /*#__PURE__*/React.createElement("div", null, "\u672A\u77E5\u7684\u7C7B\u578B: ", type));
}