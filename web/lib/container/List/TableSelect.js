function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'antd';
import { Render } from 'zero-element/lib/config/layout';
import useListHandle from "./utils/useListHandle";
export default function TableSelect(props) {
  const {
    namespace,
    config,
    extraData,
    options,
    value,
    onChange,
    onChangeTableData
  } = props;
  const {
    layout = 'Empty',
    layoutConfig = {},
    props: propsCfg = {},
    actionLayout = 'Row',
    actionLayoutConfig = {}
  } = config;
  const {
    type = 'checkbox',
    value: optValue = 'id',
    requireValid,
    pagination = false,
    rowSelection = true,
    rowKey
  } = options;
  const [tableProps, tableData, handle, actionsItems, {
    operationData
  }] = useListHandle({
    namespace,
    extraData,
    config,
    props
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const selectedRef = useRef({});
  useEffect(_ => {
    if (Array.isArray(value)) {
      setSelectedRowKeys(value.map(item => item[optValue]));
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value]);
  useEffect(_ => {
    if (onChangeTableData && tableData) {
      onChangeTableData(JSON.parse(JSON.stringify(tableData)));
    }
  }, [tableData]);

  function handleRowClassName(record) {
    if (operationData.id === record.id) {
      return 'ZEleA-table-selected';
    }
  }

  function handleChange(selectedRowKeys, selectedRows) {
    const {
      current
    } = tableProps.pagination;
    let sKeys = selectedRowKeys;
    let sRows = selectedRows;

    if (type === 'checkbox') {
      selectedRef.current[current] = {
        selectedRows,
        selectedRowKeys
      };
      sKeys = [];
      sRows = [];
      Object.keys(selectedRef.current).forEach(i => {
        if (selectedRef.current) {
          sKeys.push(...selectedRef.current[i].selectedRowKeys);
          sRows.push(...selectedRef.current[i].selectedRows);
        }
      });
    }

    setSelectedRowKeys(sKeys);
    onChange(sRows, sKeys);
  }

  function handleDisabled(record) {
    const valid = record && record[optValue] !== 0 && Boolean(record[optValue]);
    return {
      disabled: !valid
    };
  }

  return /*#__PURE__*/React.createElement(Render, _extends({
    n: layout
  }, layoutConfig, {
    handle: handle,
    namespace: namespace
  }), /*#__PURE__*/React.createElement(Render, _extends({
    n: actionLayout
  }, actionLayoutConfig), actionsItems), /*#__PURE__*/React.createElement(Table, _extends({
    rowKey: rowKey || optValue,
    size: "small",
    bordered: false,
    rowClassName: handleRowClassName,
    dataSource: props.data || tableData
  }, tableProps, propsCfg, {
    pagination: pagination ? { ...tableProps.pagination,
      size: 'small'
    } : false,
    rowSelection: rowSelection ? {
      type: type,
      selectedRowKeys,
      onChange: handleChange,
      getCheckboxProps: requireValid ? handleDisabled : undefined
    } : rowSelection
  })));
}