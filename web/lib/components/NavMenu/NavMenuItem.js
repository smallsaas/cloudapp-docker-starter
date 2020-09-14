import React, { useState } from 'react';
import { Input, Icon, Tooltip } from 'antd';
export default function NavMenuItem({
  data,
  onEdit,
  onRemote
}) {
  const [edit, setEdit] = useState(false);
  const value = data.title || data.name;
  const [v, setV] = useState(value);

  function handleEdit() {
    setEdit(true);
  }

  function cancelEdit() {
    setEdit(false);
    setV(value);
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setV(value);
  }

  function handleSave() {
    onEdit(data.id, v);
    setEdit(false);
  }

  function handleRemote() {
    onRemote(data.id);
    setEdit(false);
  }

  return /*#__PURE__*/React.createElement("div", null, edit ? /*#__PURE__*/React.createElement(Tooltip, {
    defaultVisible: true,
    title: /*#__PURE__*/React.createElement(React.Fragment, null, onEdit ? /*#__PURE__*/React.createElement(Icon, {
      type: "save",
      onClick: handleSave
    }) : null, onRemote ? /*#__PURE__*/React.createElement(Icon, {
      type: "delete",
      className: "ZEleA-margin-left",
      onClick: handleRemote
    }) : null, /*#__PURE__*/React.createElement(Icon, {
      type: "rollback",
      className: "ZEleA-margin-left",
      onClick: cancelEdit
    }))
  }, /*#__PURE__*/React.createElement(Input, {
    value: v,
    onChange: handleInputChange
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, onEdit || onRemote ? /*#__PURE__*/React.createElement(Icon, {
    type: "form",
    onClick: handleEdit
  }) : null, v));
}