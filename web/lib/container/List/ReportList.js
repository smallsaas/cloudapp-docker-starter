function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Table } from 'antd';
import { Render } from 'zero-element/lib/config/layout';
import useListHandle from "./utils/useListHandle";
export default function ReportList(props) {
  const {
    namespace,
    config,
    extraData
  } = props;
  const {
    layout = 'Empty',
    layoutConfig = {},
    props: propsCfg = {},
    actionLayout = 'Row',
    actionLayoutConfig = {}
  } = config;
  const [tableProps, tableData, handle, actionsItems] = useListHandle({
    namespace,
    extraData,
    config,
    props
  });

  function handleRowClassName(record, index) {
    if (index % 2 === 1) {
      return 'ZEleA-table-odd';
    }
  }

  return /*#__PURE__*/React.createElement(Render, _extends({
    n: layout
  }, layoutConfig, {
    handle: handle,
    namespace: namespace
  }), /*#__PURE__*/React.createElement(Render, _extends({
    n: actionLayout
  }, actionLayoutConfig), actionsItems), /*#__PURE__*/React.createElement(Table, _extends({
    rowKey: "id",
    size: "middle",
    className: "ZEleA-ReportList",
    dataSource: props.data || tableData,
    rowClassName: handleRowClassName
  }, tableProps, propsCfg)));
}