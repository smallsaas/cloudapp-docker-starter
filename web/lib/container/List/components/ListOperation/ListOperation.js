import React from 'react';
import { Dropdown, Menu, Popconfirm } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import handleAction from "./handleAction";
import checkExpected from "../../../../utils/checkExpected";
import { getModel } from 'zero-element/lib/Model';
import operationMap from "./type";
export default function ListOperation(props) {
  const {
    state,
    model,
    dispatch,
    index,
    record,
    operation,
    handle
  } = props;
  const {
    listData
  } = getModel(model.namespace);
  const {
    records
  } = listData;

  if (record.operation === false) {
    return null;
  }

  function handleCancel() {
    dispatch({
      type: 'closeConfirm'
    });

    if (handle.onClickOperation) {
      handle.onClickOperation({});
    }
  }

  function handleConfirm() {
    if (typeof state.type === 'function') {
      state.type();
    }

    dispatch({
      type: 'closeConfirm'
    });
  }

  function onAction(action, options) {
    handleAction(action, options, props, dispatch);
  }

  const popconfirmProps = {
    title: state.title,
    visible: state.confirm,
    onCancel: handleCancel,
    onConfirm: handleConfirm
  };
  const outsideList = [];
  const dropdownList = [];
  operation.forEach((item, i) => {
    item.options = item.options || {};

    if (checkExpected(record, item.expect || item.options)) {
      if (item.options.outside) {
        outsideList.push(operationMap['outside'](item, i, {
          index,
          record,
          records
        }, onAction));
      } else {
        if (operationMap[item.type]) {
          outsideList.push(operationMap[item.type](item, i, {
            index,
            record,
            records
          }, onAction));
        } else {
          dropdownList.push(operationMap['dropdown'](item, i, {
            index,
            record,
            records
          }, onAction));
        }
      }
    }
  });
  return /*#__PURE__*/React.createElement(Popconfirm, popconfirmProps, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-table-action"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-table-action-Outside"
  }, outsideList), dropdownList.length ? /*#__PURE__*/React.createElement(Dropdown, {
    overlay: renderMemu(dropdownList),
    trigger: ['click'],
    placement: "bottomRight"
  }, /*#__PURE__*/React.createElement(EllipsisOutlined, {
    style: {
      fontSize: '24px'
    }
  })) : outsideList.length === 0 ? /*#__PURE__*/React.createElement("span", {
    className: "ZEleA-table-action-empty"
  }, "\u6682\u65E0") : null));
}

function renderMemu(menuItemList) {
  if (menuItemList.length === 0) {
    menuItemList.push( /*#__PURE__*/React.createElement(Menu.Item, {
      key: "99",
      disabled: true
    }, "\u6682\u65E0"));
  }

  return /*#__PURE__*/React.createElement(Menu, null, menuItemList);
}