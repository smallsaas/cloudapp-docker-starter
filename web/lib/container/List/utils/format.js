function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import ListOperation from "../components/ListOperation";
import ListFieldsEdit from "../components/ListFieldsEdit";
import { Render } from 'zero-element/lib/config/valueType';
/**
 *
 * 统一 Table columns 的格式
 * @export
 * @param {array} fields 标准化的 fields
 * @param {array} operation 对该行的操作
 * @param {object} handle 传递给 ListOperation
 * @param {object} props 传递给 valueType 与 ListOperation
 * @returns antd Table columns 和 sum width
 */

export function formatTableFields(fields = [], operation = [], handle, props = {}) {
  let operationCfg = {};
  let width = 0;
  let operationObj;
  const rst = fields.map((fieldCfg, i) => {
    const {
      field,
      label,
      valueType,
      render = valueTypeRender(valueType, fieldCfg, props, handle),
      ...rest
    } = fieldCfg;

    if (field === 'operation') {
      operationCfg = fieldCfg;
      return {};
    }

    if (typeof rest.width === 'number') {
      width += rest.width;
    }

    return {
      dataIndex: field,
      title: label,
      render,
      ...rest
    };
  }).filter(fieldCfg => fieldCfg.dataIndex);

  if (operation.length > 0) {
    operationObj = {
      dataIndex: 'operation',
      align: 'right',
      ...(width > 0 ? {
        fixed: 'right',
        width: 100
      } : {}),
      ...operationCfg,
      // fixed  width
      title: handle.onFieldsOrder ? () => /*#__PURE__*/React.createElement(ListFieldsEdit, {
        fields: props.fields,
        handle: handle
      }) : '操作',
      render: (text, record, index) => {
        return /*#__PURE__*/React.createElement(ListOperation, _extends({}, props, {
          text: text,
          record: record,
          index: index,
          operation: operation,
          handle: handle
        }));
      }
    }; // rst.push(operationObj);
  }

  return {
    columns: operationObj ? [...rst, operationObj] : [...rst],
    width
  };
}

function valueTypeRender(type, config, props, handle) {
  if (!type) return undefined;
  return (text, record, index) => /*#__PURE__*/React.createElement(Render, _extends({
    n: type
  }, config, props, {
    data: {
      text,
      record,
      index,
      type
    },
    handle: handle
  }));
}