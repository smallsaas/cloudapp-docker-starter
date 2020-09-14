import React from 'react';
import Render from "../utils/Render";
import "../index.css";
export default (props => {
  const {
    layoutType,
    ...rest
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: `ZEleA-DnDFormEdit-EchoPanel ZEleA-Form-${layoutType}`
  }, /*#__PURE__*/React.createElement(Render, rest));
});