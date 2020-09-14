import React from 'react';
import { Table, Typography } from 'antd';
const {
  Title,
  Text
} = Typography;
export default function SRadio({
  config
}) {
  const {
    options = {}
  } = config;
  const {
    base = {},
    advanced = {},
    table = []
  } = options;
  const {
    sql = {},
    tableName,
    field
  } = advanced;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Title, {
    level: 4
  }, "\u4E00\u5BF9\u591A\u5173\u7CFB:", sql.value ? /*#__PURE__*/React.createElement(Text, {
    code: true
  }, sql.value) : '[未关联]', tableName.value ? /*#__PURE__*/React.createElement(Text, {
    code: true
  }, tableName.value) : '[未关联]', field.value ? /*#__PURE__*/React.createElement(Text, {
    code: true
  }, field.value) : '[未关联]'), /*#__PURE__*/React.createElement(Table, {
    dataSource: [],
    columns: table.map(item => {
      return {
        title: item.label,
        dataIndex: item.value,
        key: item.value
      };
    })
  }));
}