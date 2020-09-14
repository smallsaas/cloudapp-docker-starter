function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect, useRef } from 'react';
import { Tag, Button, Select, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { query } from "../utils/request";
export default function Tags({
  name,
  value,
  props,
  onChange,
  options,
  handle,
  ...rest
}) {
  const {
    API = '/api/stock/tags',
    dataField = 'records',
    label: optLabel = 'tagName',
    value: optValue = 'id'
  } = options;
  const {
    onFormatValue
  } = handle;
  const [tagList, setTagList] = useState([]);
  const [createIng, setCreateIng] = useState(false);
  const lastFetchId = useRef(0);
  const [loading, setLoading] = useState(false);
  const [optionsList, setOptionsList] = useState([]);
  useEffect(_ => {
    if (Array.isArray(value)) {
      setTagList(value);
    } else if (typeof value === 'string' && value.indexOf('[') > -1) {
      onFormatValue(name, 'JSONString');
      setTagList(JSON.parse(value));
    }
  }, [value]);

  function handleRemoveString(removedTag) {
    onChange(tagList.filter(tag => tag !== removedTag));
  }

  function handleRemove(data) {
    onChange(tagList.filter(tag => tag[optValue] !== data[optValue]));
  }

  function handleClick() {
    setCreateIng(true);
  }

  function handleCreate() {
    setCreateIng(false);
  }

  function handleQuery(v) {
    lastFetchId.current += 1;
    const fetchId = lastFetchId.current;
    setLoading(true);
    query(API, {
      [optLabel]: v
    }).then(data => {
      if (fetchId === lastFetchId.current) {
        const list = Array.isArray(data) ? data : data[dataField];

        if (Array.isArray(list)) {
          setOptionsList(list);
        } else {
          console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
        }
      }
    }).finally(_ => setLoading(false));
  }

  function handleSelect(id) {
    if (tagList.every(tag => tag[optValue] !== id)) {
      const find = optionsList.find(opt => opt[optValue] === id);

      if (find) {
        tagList.push(find);
      }

      setTagList([...tagList]);
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, tagList.map(tag => {
    if (typeof tag === 'string') {
      return /*#__PURE__*/React.createElement(Tag, _extends({
        key: tag,
        closable: true
      }, rest, props, {
        onClose: handleRemoveString
      }), tag);
    }

    return /*#__PURE__*/React.createElement(Tag, _extends({
      key: tag[optValue],
      closable: true
    }, rest, props, {
      onClose: () => handleRemove(tag)
    }), tag[optLabel]);
  }), createIng ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Select, {
    showSearch: true,
    size: "small",
    notFoundContent: loading ? /*#__PURE__*/React.createElement(Spin, {
      size: "small"
    }) : null,
    onSearch: handleQuery,
    onChange: handleSelect,
    onBlur: handleCreate
  }, optionsList.map(opt => /*#__PURE__*/React.createElement(Select.Option, {
    key: opt[optValue]
  }, opt[optLabel])))) : /*#__PURE__*/React.createElement(Button, {
    type: "dashed",
    size: "small",
    icon: /*#__PURE__*/React.createElement(PlusOutlined, null),
    onClick: handleClick
  }));
}