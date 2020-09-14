import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import DrawerContent from "./DrawerContent";
import { arrayItemMove } from "../../../../utils/tool";
import "../../index.css";
export default function ListFieldsEdit(props) {
  const {
    fields = [],
    handle
  } = props;
  const {
    onFieldsOrder
  } = handle;
  const [visible, setVisibel] = useState(false);
  const [checkedList, setCheckedList] = useState(fields.map(i => i.field));

  function onSwitchVisibel() {
    setVisibel(!visible);
  }

  function onSwitchChecked(data) {
    const {
      field
    } = data;
    let newCheckedList = [...checkedList];
    const index = newCheckedList.findIndex(key => key === field);

    if (index > -1) {
      newCheckedList.splice(index, 1);
    } else {
      const index = fields.findIndex(i => i.field === field);
      newCheckedList.splice(index, 0, field);
    }

    setCheckedList(newCheckedList);
  }

  function onMoveField(type, data) {
    const {
      field
    } = data;
    const index = checkedList.findIndex(i => i === field);
    arrayItemMove(checkedList, type, index);
    arrayItemMove(fields, type, index);
    setCheckedList([...checkedList]);
  }

  function onSaveFields() {
    onSwitchVisibel();
    onFieldsOrder(checkedList);
  }

  const drawerProps = {
    fields,
    visible,
    onSwitchVisibel,
    checkedList,
    onSwitchChecked,
    onMoveField,
    onSaveFields
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ZEleA-ListFieldsEdit-settingIcon",
    onClick: onSwitchVisibel
  }, /*#__PURE__*/React.createElement(SettingOutlined, {
    title: "\u7F16\u8F91\u5B57\u6BB5"
  })), /*#__PURE__*/React.createElement(DrawerContent, drawerProps));
}