function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Drawer, Button, Select } from 'antd';
import { toNumber } from "../../../utils/tool";
import ItemEdit from "./components/ItemEdit";
import { arrayItemMove } from "../../../utils/tool";
import { renderBaseOptions, renderStyleOptions, renderAdvancedOptions } from "./components/render";
import "../index.css";
import Checkbox from "./components/Checkbox";
import Expect from "./components/Expect";
const {
  Option
} = Select;

function renderItemsOptions(items, handle, otherProps = {}) {
  return /*#__PURE__*/React.createElement(ItemEdit, _extends({
    items: items
  }, handle, otherProps));
}

function renderFieldsSelect(list, value, handleChange) {
  return /*#__PURE__*/React.createElement(Select, {
    style: {
      width: '100%'
    },
    value: value,
    onChange: handleChange
  }, list.map((item, i) => {
    return /*#__PURE__*/React.createElement(Option, {
      key: i,
      value: item
    }, item);
  }));
}

export default (({
  current,
  dispatch,
  fields,
  API
}) => {
  const {
    options = {}
  } = current;
  const {
    field = {},
    base = {},
    rules = {},
    style,
    items,
    advanced,
    config,
    table,
    expect,
    pdf
  } = options;
  const {
    required,
    ...restRules
  } = rules;

  function onSave() {
    dispatch({
      type: 'save',
      payload: {
        current: { ...current
        }
      }
    });
    dispatch({
      type: 'editElement',
      payload: current
    });
  }

  function handleClose() {
    dispatch({
      type: 'save',
      payload: {
        current: {}
      }
    });
  }

  function handleFieldChange(value) {
    field.value = value;
    onSave();
  }

  function handleBaseChange(key, e) {
    base[key].value = toNumber(e.target.value);
    onSave();
  }

  function handleStyleChange(key, e) {
    style[key].value = e.target.value;
    options.style = { ...style
    };
    onSave();
  }

  function handleAdvancedChange(key, value) {
    advanced[key].value = value;
    options.advanced = { ...advanced
    };
    onSave();
  }

  function handleItemChange(i, type, e) {
    items[i][type] = toNumber(e.target.value);
    onSave();
  }

  function handleItemAdd() {
    items.push({
      label: `选项${items.length + 1}`,
      value: items.length + 1
    });
    onSave();
  }

  function handleItemIndexChange(type, index) {
    arrayItemMove(items, type, index);
    onSave();
  }

  function handleItemDel(i) {
    items.splice(i, 1);
    onSave();
  }

  function handleTableAdd(pdf) {
    table.push({
      label: `字段${table.length + 1}`,
      value: `f_${table.length + 1}`,
      options: {
        type: 'plain',
        ...(pdf ? {} : {
          echoAdd: true,
          echoEdit: true,
          echoType: true
        })
      }
    });
    onSave();
  }

  function handleTableChange(i, type, e) {
    table[i][type] = e.target.value;
    onSave();
  }

  function handleTableIndexChange(type, index) {
    arrayItemMove(table, type, index);
    onSave();
  }

  function handleTableOptionsChange(i, type, value) {
    table[i].options[type] = value;
    onSave();
  }

  function handleTableDel(i) {
    table.splice(i, 1);
    onSave();
  }

  function handleRulesChange(key, value) {
    rules[key].value = value;
    onSave();
  }

  function handleRulesMsgChange(key, value) {
    rules[key].message = value;
    onSave();
  }

  function handleExpectChange(key, value) {
    if (!expect[key]) {
      expect[key] = {};
    }

    expect[key].value = toNumber(value);
    onSave();
  }
  /**
   * 实际上是修改了 config 的 options
   *
   * @param {string} key
   * @param {event} e
   */


  function handleConfigChange(key, e) {
    config[key].value = e.target.value;
    onSave();
  }

  return /*#__PURE__*/React.createElement(Drawer, {
    visible: Boolean(current.id),
    mask: false,
    onClose: handleClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u57FA\u672C\u5C5E\u6027"), /*#__PURE__*/React.createElement(Checkbox, {
    field: "required",
    data: required,
    onChange: handleRulesChange
  }), /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u5B57\u6BB5\u503C(\u540E\u7AEF\u5B57\u6BB5)"), renderFieldsSelect(fields, field.value, handleFieldChange), renderBaseOptions(base, handleBaseChange), Object.keys(restRules).length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u6570\u636E\u6821\u9A8C"), Object.keys(restRules).map(key => {
    return /*#__PURE__*/React.createElement(Checkbox, {
      key: key,
      field: key,
      data: restRules[key],
      onChange: handleRulesChange,
      onMsgChange: handleRulesMsgChange
    });
  })) : null, items ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u5B50\u9879"), /*#__PURE__*/React.createElement(Button, {
    type: "dashed",
    icon: "plus",
    onClick: handleItemAdd
  }, "\u6DFB\u52A0\u5B50\u9879"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), renderItemsOptions(items, {
    onChange: handleItemChange,
    onRemove: handleItemDel,
    onIndexChange: handleItemIndexChange
  })) : null, config ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u914D\u7F6E"), renderBaseOptions(config, handleConfigChange)) : null, expect ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u9884\u671F"), /*#__PURE__*/React.createElement(Expect, {
    data: expect,
    onChange: handleExpectChange
  })) : null, advanced ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u9AD8\u7EA7"), renderAdvancedOptions(advanced, options, {
    onAdvancedChange: handleAdvancedChange,
    onSave
  }, {
    API
  })) : null, table ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u663E\u793A\u5B57\u6BB5"), /*#__PURE__*/React.createElement(Button, {
    type: "dashed",
    icon: "plus",
    onClick: handleTableAdd.bind(null, pdf)
  }, "\u6DFB\u52A0\u5B57\u6BB5"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), renderItemsOptions(table, {
    onChange: handleTableChange,
    onRemove: handleTableDel,
    onOptionsChange: handleTableOptionsChange,
    onOptionsChange: handleTableOptionsChange,
    onIndexChange: handleTableIndexChange
  }, {
    disabled: Boolean(base.path && base.path.value)
  })) : null, style ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u6837\u5F0F"), renderStyleOptions(style, handleStyleChange)) : null);
});