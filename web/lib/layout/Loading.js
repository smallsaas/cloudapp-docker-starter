import React from 'react';
import { Spin } from 'antd';
export default function Loading(props) {
  const {
    loading = true,
    children
  } = props;
  return /*#__PURE__*/React.createElement(Spin, {
    spinning: loading
  }, children);
}