import React, { useMemo, useState, useEffect } from 'react';
import { Checkbox, Button, Input } from 'antd';
import "../index.css";
import { toNumber } from "../../utils/tool";
import { Flex } from 'layout-flex';
const CheckboxGroup = Checkbox.Group;
const {
  FlexItem
} = Flex;
const {
  Search
} = Input;
export default function PCDMContainer({
  title,
  operationName,
  keepSelected,
  listData,
  optLabel,
  optValue,
  onClick,
  onSelect
}) {
  const [selectedList, setSelectedList] = useState([]);
  const [searchStr, setSearchStr] = useState('');
  const optionsOrigin = useMemo(_ => {
    if (!Array.isArray(listData)) return [];
    return listData.map(i => ({
      label: i[optLabel],
      value: i[optValue]
    }));
  }, [listData, optLabel, optValue]);
  const options = useMemo(_ => {
    if (searchStr === '') {
      return optionsOrigin;
    }

    return optionsOrigin.filter(item => {
      return item.label.indexOf(searchStr) > -1;
    });
  }, [searchStr, optionsOrigin]);
  useEffect(_ => {
    if (!keepSelected) {
      setSelectedList([]);
    }
  }, [keepSelected, listData]);

  function handleChange(data) {
    setSelectedList(data);
  }

  function handleSelected() {
    onSelect(listData.filter(item => selectedList.includes(item.id)));

    if (keepSelected) {
      setSelectedList([]);
    }
  }

  function handleAllSelected(e) {
    const checked = e.target.checked;

    if (checked) {
      setSelectedList(optionsOrigin.map(i => i.value));
    } else {
      setSelectedList([]);
    }
  }

  function handleClick(e) {
    const id = e.target.value;

    if (id) {
      const nId = toNumber(id);
      const data = listData.find(i => i.id === nId);
      onClick && onClick(data.id);
    }
  }

  function handleLocalSearch(value) {
    setSearchStr(value);
  }

  const selectedCount = selectedList.length;
  const listCount = listData && listData.length || 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-PCDM-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-PCDM-title"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    indeterminate: 0 < selectedCount && selectedCount < listCount,
    checked: selectedCount && selectedCount === listCount,
    onChange: handleAllSelected
  }), /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, title), /*#__PURE__*/React.createElement(FlexItem, {
    className: "search"
  }, /*#__PURE__*/React.createElement(Search, {
    allowClear: true,
    placeholder: "\u641C\u7D22...",
    onSearch: handleLocalSearch
  })))), /*#__PURE__*/React.createElement("span", null, selectedCount, "/", listCount)), /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-PCDM-body"
  }, /*#__PURE__*/React.createElement(CheckboxGroup, {
    onClick: handleClick,
    onChange: handleChange,
    options: options,
    value: selectedList
  })), /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-PCDM-footer"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "link",
    disabled: !selectedList.length,
    onClick: handleSelected
  }, operationName)));
}