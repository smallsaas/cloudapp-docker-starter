import React, { useState, useEffect, useRef } from 'react';
import { query } from "../../../../../../utils/request";
import { Select } from 'antd';
import window from 'zero-element/lib/utils/window';
import qs from 'qs';
import { formatAPI } from 'zero-element/lib/utils/format';
const {
  Option
} = Select;

function getSearch(location) {
  if (location.search) {
    return location.search.replace('?', '');
  } else {
    return location.hash.split('?')[1] || '';
  }
}

export default function SelectTableField(props) {
  const {
    field,
    label,
    value,
    handle,
    config,
    options,
    API
  } = props;
  const {
    sql,
    tableName
  } = config;
  const {
    table
  } = options;
  const {
    onAdvancedChange,
    onSave
  } = handle;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const prevSqlValue = useRef(sql.value);
  const tableFields = useRef([]);
  useEffect(_ => {
    setData([]);

    if (prevSqlValue.current !== sql.value) {
      prevSqlValue.current = sql.value;
      clearValue();
    }

    if (sql.value && tableName.value && API.fieldAPI) {
      queryTableData(sql.value, tableName.value, API.fieldAPI);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [sql.value, tableName.value]);

  function clearValue() {
    onAdvancedChange(field, '');
  }

  function queryTableData(sql, tableName, api) {
    setLoading(true);
    const {
      location = {}
    } = window;
    const qsObj = qs.parse(getSearch(location));
    const fAPI = formatAPI(api, {
      namespace: '_DndForm',
      data: {
        uuid: qsObj.uuid,
        sql: sql,
        tableName: tableName
      }
    });
    query(fAPI).then(data => {
      setData(data.map(field => {
        return {
          id: field.field,
          title: field.comment || field.field,
          value: field.field
        };
      }));
    }).finally(_ => {
      setLoading(false);
    });
  }

  function handleChange(value) {
    if (value) {
      const find = data.find(item => item.value === value);
      tableFields.current = find.children;
      handleSetDefaultTableFields();
    }

    onAdvancedChange(field, value);
  }

  function handleSetDefaultTableFields() {
    if (table.length === 0) {
      table.push(...tableFields.current.map(field => ({
        label: field.comment || field.field,
        value: field.field
      })));
      onSave();
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, label), /*#__PURE__*/React.createElement(Select, {
    style: {
      width: 190
    },
    value: value,
    onChange: handleChange,
    loading: loading,
    allowClear: true
  }, data.map(item => {
    return /*#__PURE__*/React.createElement(Option, {
      key: item.id,
      value: item.value
    }, item.title);
  })));
}