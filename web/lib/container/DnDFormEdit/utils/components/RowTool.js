import React, { useState } from 'react';
import { Icon } from 'antd';
import EditModal from "./EditModal";
import "../../index.css";

function handleRemoveRow(dispatch, config) {
  dispatch({
    type: 'delRow',
    payload: config
  });
}

function handleMoveUp(dispatch, config) {
  dispatch({
    type: 'rowMoveUp',
    payload: config
  });
}

function handleMoveDown(dispatch, config) {
  dispatch({
    type: 'rowMoveDown',
    payload: config
  });
}

export default function RowTool({
  dispatch,
  config,
  component
}) {
  const [visible, setVisible] = useState(false);

  function handleOpenModal() {
    setVisible(true);
  }

  function handleCloseModal() {
    setVisible(false);
  }

  function handleChangeRowValue(newValue) {
    dispatch({
      type: 'editRowValue',
      payload: {
        id: config.id,
        value: newValue
      }
    });
    handleCloseModal();
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-rowBox"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-itemTool ZEleA-DnDFormEdit-itemTool-left"
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "delete",
    onClick: handleRemoveRow.bind(null, dispatch, config),
    className: "ZEleA-DnDFormEdit-danger"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-itemTool ZEleA-DnDFormEdit-itemTool-right"
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "up",
    onClick: handleMoveUp.bind(null, dispatch, config),
    className: "ZEleA-DnDFormEdit-primary"
  }), /*#__PURE__*/React.createElement(Icon, {
    type: "down",
    onClick: handleMoveDown.bind(null, dispatch, config),
    className: "ZEleA-DnDFormEdit-primary"
  }), /*#__PURE__*/React.createElement(Icon, {
    type: "edit",
    onClick: handleOpenModal.bind(null, dispatch, config),
    className: "ZEleA-DnDFormEdit-primary"
  })), component, /*#__PURE__*/React.createElement(EditModal, {
    visible: visible,
    config: config,
    onCancel: handleCloseModal,
    onSave: handleChangeRowValue
  }));
}