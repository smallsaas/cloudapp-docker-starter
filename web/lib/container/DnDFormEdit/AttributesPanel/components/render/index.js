function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import LabelInput from "./LabelComponents/LabelInput";
import LabelRadio from "./LabelComponents/LabelRadio";
import SelectSQL from "./LabelComponents/SelectSQL";
import SelectTable from "./LabelComponents/SelectTable";
import SelectTableField from "./LabelComponents/SelectTableField";
import TableField from "./LabelComponents/TableField";
import SaveData from "./LabelComponents/SaveData";
const labelSet = {
  'input': LabelInput,
  'radio': LabelRadio,
  'selectSQL': SelectSQL,
  'selectTable': SelectTable,
  'selectTableField': SelectTableField,
  'tableField': TableField,
  'saveData': SaveData,
  'undefined': LabelInput
};
export function renderStyleOptions(opt, handle) {
  return Object.keys(opt).map(key => {
    const {
      type
    } = opt[key];
    const Match = labelSet[type];
    return /*#__PURE__*/React.createElement(Match, _extends({
      key: key,
      field: key,
      handle: handle
    }, opt[key]));
  });
}
export function renderBaseOptions(opt, handle) {
  return Object.keys(opt).map(key => {
    const {
      type
    } = opt[key];
    const Match = labelSet[type];
    return /*#__PURE__*/React.createElement(Match, _extends({
      key: key,
      field: key,
      handle: handle
    }, opt[key]));
  });
}
export function renderAdvancedOptions(opt, options, handle, props) {
  return Object.keys(opt).map(key => {
    const {
      type
    } = opt[key];
    const Match = labelSet[type];
    return /*#__PURE__*/React.createElement(Match, _extends({
      key: key,
      field: key,
      handle: handle
    }, opt[key], {
      options: options,
      config: opt
    }, props));
  });
}