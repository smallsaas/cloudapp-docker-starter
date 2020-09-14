function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import useBaseChildren from 'zero-element/lib/helper/form/useBaseChildren';
import { formatTableFields } from "./utils/format";
import { getActionItem } from "../../utils/readConfig";
import { Table } from 'antd';
import { Render } from 'zero-element/lib/config/layout';
export default function ChildrenTable(props) {
  const {
    namespace,
    config
  } = props;
  const {
    layout = 'Empty',
    fields,
    operation,
    actions = [],
    props: propsCfg = {},
    layoutConfig = {},
    actionLayout = 'Row',
    actionLayoutConfig = {},
    itemsField = 'items'
  } = config;
  const childrenProps = useBaseChildren({
    namespace,
    modelPath: 'formData',
    itemsPath: itemsField
  }, config);
  const {
    data,
    handle,
    model
  } = childrenProps;
  const {
    onCreate,
    onCreateList,
    onEdit
  } = handle;
  const {
    columns
  } = formatTableFields(fields, operation, handle);
  return /*#__PURE__*/React.createElement(Render, _extends({
    n: layout
  }, layoutConfig), /*#__PURE__*/React.createElement(Render, _extends({
    n: actionLayout
  }, actionLayoutConfig), actions.map((action, i) => getActionItem({
    key: i,
    ...action
  }, model, {
    onCreate,
    onCreateList,
    onEdit
  }, {
    namespace
  }))), /*#__PURE__*/React.createElement(Table, _extends({
    rowKey: row => String(row._id || row.id),
    dataSource: data,
    columns: columns
  }, propsCfg)));
}