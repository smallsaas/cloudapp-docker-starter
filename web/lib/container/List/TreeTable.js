function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatTableFields } from "./utils/format";
import { getActionItem } from "../../utils/readConfig";
import { Table } from 'antd';
import { Render } from 'zero-element/lib/config/layout';
import { formatAPI } from 'zero-element/lib/utils/format';
import { query } from "../../utils/request";
import useOperation from "./utils/useOperation";
import { mapObjList } from "../../utils/tool";
/**
 * 在原有 Table 的基础上，可通过点击 '＋' 来加载子项
 * 接收 扁平列表数据
 * 渲染之前, 会自动根据 pid 格式化为 树状
 *
 */

export default function TreeTable(props) {
  const {
    namespace,
    config,
    extraData
  } = props;
  const {
    layout = 'Empty',
    layoutConfig = {},
    API = {},
    fields,
    operation,
    actions = [],
    props: propsCfg = {},
    actionLayout = 'Row',
    actionLayoutConfig = {}
  } = config;
  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
    extraData
  }, config);
  const {
    handle,
    data,
    model
  } = listProps;
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [oData, onClickOperation] = useOperation();
  const {
    columns
  } = formatTableFields(fields, operation, { ...handle,
    onRefresh: handleRefresh,
    onClickOperation
  }, {
    namespace,
    extraData,
    model
  });
  useDidMount(_ => {
    if (API.listAPI) {
      handleInitData({});
    }
  });
  useEffect(_ => {
    if (data) {
      setTreeData(formatTree(data));
      setExpandedRowKeys([]);
    }
  }, [data]);
  useEffect(_ => {
    const {
      children = []
    } = treeData[0] || {};

    if (treeData.length === 1 && expandedRowKeys.length === 0 && children.length === 0) {
      handleAppend(treeData[0].id);
      setExpandedRowKeys([treeData[0].id]);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [treeData, expandedRowKeys]);

  function handleInitData() {
    const api = formatAPI(API.listAPI, {
      namespace
    });
    setLoading(true);
    query(api).then(data => setTreeData(formatTree(data))).catch(err => console.warn('数据初始化失败', err)).finally(_ => setLoading(false));
  }

  function handleExpand(expanded, record) {
    if (expanded && API.appendAPI) {
      handleAppend(record.id);
    }
  }

  function handleExpandedChange(keys) {
    setExpandedRowKeys(keys);
  }

  function handleAppend(id) {
    if (!API.appendAPI) return false;
    const api = formatAPI(API.appendAPI, {
      namespace,
      data: {
        id
      }
    });
    setLoading(true);
    query(api).then(data => setTreeData(formatTree(appendNode(id, treeData, data)))).catch(err => console.warn('数据初始化失败', err)).finally(_ => setLoading(false));
  }

  function handleRefresh() {
    if (expandedRowKeys.includes(oData.pid)) {
      handleAppend(oData.pid);
    } else {
      handleInitData();
      setExpandedRowKeys([]);
    }
  }

  return /*#__PURE__*/React.createElement(Render, _extends({
    n: layout
  }, layoutConfig, {
    handle: handle,
    namespace: namespace
  }), /*#__PURE__*/React.createElement(Render, _extends({
    n: actionLayout
  }, actionLayoutConfig), actions.map((action, i) => getActionItem({
    key: i,
    ...action
  }, model, handle, {
    namespace,
    extraData,
    config
  }))), /*#__PURE__*/React.createElement(Table, _extends({
    rowKey: "id",
    size: "middle",
    dataSource: treeData,
    columns: columns,
    loading: loading,
    pagination: false
  }, propsCfg, {
    expandedRowKeys: expandedRowKeys,
    onExpand: handleExpand,
    onExpandedRowsChange: handleExpandedChange
  })));
}
/**
 * 为数据加上 children = [] 属性
 * 格式化数据为 树状
 * @param {} data 
 */

function formatTree(data) {
  const stack = [];

  if (Array.isArray(data)) {
    stack.push(...data);
  } else {
    stack.push(data);
  }

  const record = {};
  const rst = [];

  while (stack.length) {
    const item = stack.shift();

    if (item && item.id) {
      record[item.id] = item;

      if (item.children) {
        stack.push(...item.children);
      } else {
        item.children = [];
      }

      if (item.pid && record[item.pid]) {
        const list = record[item.pid].children;

        if (list.findIndex(i => i.id === item.id) === -1) {
          record[item.pid].children.push(item);
        } // record[item.pid].children = uniqueObjList(
        //   record[item.pid].children,
        //   [item]
        // );

      } else {
        rst.push(item);
      }
    }
  }

  return [...rst];
}

function appendNode(id, tree, data) {
  const stack = [...tree];
  let target;

  while (stack.length) {
    const item = stack.shift();

    if (item.id === id) {
      target = item;
      break;
    }

    if (item.children) {
      stack.push(...item.children);
    }
  }

  if (target) {
    target.children = mapObjList(target.children, data, ['children']);
  }

  return [...tree];
}