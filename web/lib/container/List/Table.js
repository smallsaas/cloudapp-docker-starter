function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Table } from 'antd';
import { Render } from 'zero-element/lib/config/layout';
import useListHandle from "./utils/useListHandle";
import tableFooter from "./components/TableFooter";
import canPortal from "../../utils/canPortal";
export default function BaseTable(props) {
  const {
    namespace,
    config,
    extraData,
    extraEl
  } = props;
  const {
    layout = 'Empty',
    layoutConfig = {},
    props: propsCfg = {}
  } = config;
  const [tableProps, tableData, handle, actionsItems, {
    operationData,
    renderBatchOperation
  }] = useListHandle({
    namespace,
    extraData,
    config,
    props
  });

  function handleRowClassName(record) {
    if (operationData.id === record.id) {
      return 'ZEleA-table-selected';
    }
  }

  return /*#__PURE__*/React.createElement(Render, _extends({
    n: layout
  }, layoutConfig, {
    handle: handle,
    namespace: namespace
  }), canPortal(extraEl, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Render, {
    n: 'Row'
  }, renderBatchOperation(), actionsItems))), /*#__PURE__*/React.createElement(Table, _extends({
    rowKey: "id",
    size: "middle",
    rowClassName: handleRowClassName,
    dataSource: props.data || tableData
  }, tableProps, propsCfg, {
    footer: tableFooter(props.data || tableData, tableProps.columns)
  })));
}