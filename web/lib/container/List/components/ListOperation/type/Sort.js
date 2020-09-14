import React from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
export default (({
  options
}, i, {
  index,
  record,
  records
}, onAction) => {
  const {
    entity
  } = options;

  function handleDown() {
    const api = `/api/meta/patch/entity/${entity}/action/movedown/row/${record.id}/row/${records[index + 1].id}`;
    handleRequest(api);
  }

  function handleUp() {
    const api = `/api/meta/patch/entity/${entity}/action/moveup/row/${record.id}/row/${records[index - 1].id}`;
    handleRequest(api);
  }

  function handleRequest(api) {
    onAction('request', {
      method: 'post',
      API: api
    });
  }

  return /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "ZEleA-table-action-Sort"
  }, index === 0 ? null : /*#__PURE__*/React.createElement(ArrowUpOutlined, {
    title: "\u4E0A\u79FB",
    onClick: handleUp
  }), index === records.length - 1 ? null : /*#__PURE__*/React.createElement(ArrowDownOutlined, {
    onClick: handleDown,
    title: "\u4E0B\u79FB"
  }));
});