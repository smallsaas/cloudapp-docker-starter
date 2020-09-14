import React, { useRef, useEffect, useState } from 'react';
import ItemEdit from "../../ItemEdit";
import { arrayItemMove } from "../../../../../../utils/tool";
import { Button } from 'antd';
export default function SaveData(props) {
  const {
    field,
    label,
    value,
    tLabel = '把这个字段的数据',
    tValue = '保存为另一个字段',
    handle
  } = props;
  const [listData, setListData] = useState([]);
  const countId = useRef(0);
  useEffect(_ => {
    if (value) {
      setListData(Object.keys(value).map(key => {
        return {
          label: value[key],
          field: key
        };
      }));
    }
  }, [value]);

  function handleAppend() {
    countId.current = countId.current + 1;
    listData.push({
      label: `name_${countId.current}`,
      field: `name_${countId.current}`
    });
    saveData();
  }

  function onChange(index, type, e) {
    const v = e.target.value;
    listData[index][type] = v;
    saveData();
  }

  function handleItemIndexChange(type, index) {
    arrayItemMove(listData, type, index);
    saveData();
  }

  function onRemove(index) {
    listData.splice(index, 1);
    saveData();
  }

  function saveData() {
    const data = {};
    listData.forEach(item => {
      data[item.field] = item.label;
    });
    handle(field, {
      target: {
        value: data
      }
    });
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, label), /*#__PURE__*/React.createElement(Button, {
    icon: "plus",
    onClick: handleAppend
  }, "\u6DFB\u52A0\u989D\u5916\u4FDD\u5B58\u6570\u636E"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(ItemEdit, {
    text: {
      label: tLabel,
      value: tValue
    },
    valueField: "field",
    items: listData,
    onChange: onChange,
    onRemove: onRemove,
    onIndexChange: handleItemIndexChange
  }));
}