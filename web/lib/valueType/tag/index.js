import React from 'react';
import { Tag } from 'antd';
import defaultMap from "../map/status.config";
export default function valueTypeTag(props) {
  const {
    options = {},
    data: {
      text = ''
    }
  } = props;
  const {
    color = {},
    map = {}
  } = options;
  return /*#__PURE__*/React.createElement(Tag, {
    color: color[text] || '#108ee9'
  }, map[text] || defaultMap[text] || text);
}