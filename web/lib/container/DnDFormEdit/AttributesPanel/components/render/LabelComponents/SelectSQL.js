import React, { useState } from 'react';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
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

export default function SelectSQL(props) {
  const {
    field,
    label,
    value,
    handle,
    API
  } = props;
  const {
    onAdvancedChange
  } = handle;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useDidMount(_ => {
    if (API.sqlAPI) {
      querySQLData(API.sqlAPI);
    }
  });

  function querySQLData(api) {
    setLoading(true);
    const {
      location = {}
    } = window;
    const qsObj = qs.parse(getSearch(location));
    const fAPI = formatAPI(api, {
      namespace: '_DndForm',
      data: {
        uuid: qsObj.uuid
      }
    });
    query(fAPI).then(data => {
      setData(data);
    }).finally(_ => {
      setLoading(false);
    });
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, label), /*#__PURE__*/React.createElement(Select, {
    style: {
      width: 190
    },
    value: value,
    onChange: onAdvancedChange.bind(null, field),
    loading: loading
  }, data.map(item => {
    return /*#__PURE__*/React.createElement(Option, {
      key: item.id,
      value: item.value
    }, item.title);
  })));
}