import React from 'react';
import { Collapse } from 'antd';
const {
  Panel
} = Collapse;
export default function CollapseWrapped(props) {
  const {
    title = [],
    panelStyle = {},
    children,
    ...rest
  } = props;
  return /*#__PURE__*/React.createElement(Collapse, rest, React.Children.map(children, (child, i) => {
    return /*#__PURE__*/React.createElement(Panel, {
      header: title[i],
      style: panelStyle
    }, child);
  }));
}