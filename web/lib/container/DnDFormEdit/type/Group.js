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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      color: '#2a5e90',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 4,
      height: 20,
      backgroundColor: '#2a5e90',
      marginRight: 6
    }
  }), /*#__PURE__*/React.createElement("div", null, value.value));
});