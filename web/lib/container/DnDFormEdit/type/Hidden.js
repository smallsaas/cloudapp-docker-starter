import React from 'react';
export default (({
  config
}) => {
  const {
    options = {}
  } = config;
  const {
    base = {}
  } = options;
  const {
    value = {}
  } = base;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "\u63D0\u4EA4\u7684\u6570\u636E"), /*#__PURE__*/React.createElement("div", null, value.value));
});