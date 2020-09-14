function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { Spin, Input, Tree, Empty } from 'antd';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatAPI } from 'zero-element/lib/utils/format';
import { query } from "../../utils/request";
import findNode from "./findNode";
import findNodes from "./findNodes";
import formatInit from "./formatInit";
import checkData from "./checkData";
const {
  Search
} = Input;
export default (props => {
  const {
    API,
    searchField = 'search',
    namespace,
    initData = {},
    onChange,
    defaultAelectedKeys,
    childrenColumnName = 'children',
    id = 'id',
    ...rest
  } = props;
  const [treeData, setTreeData] = useState(initData);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeLoading, setTreeLoading] = useState(false);
  useDidMount(_ => {
    if (API) {
      handleLoadInitData();
    }
  });
  useEffect(_ => {
    handleSelectChange(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys]);

  function handleLoadInitData() {
    if (API.initAPI === undefined) {
      return false;
    }

    const api = formatAPI(API.initAPI, {
      namespace
    });
    setTreeLoading(true);
    query(api).then(data => {
      const rst = formatInit(data, childrenColumnName, id);
      setTreeData(rst);

      if (defaultAelectedKeys) {
        handleSelect(defaultAelectedKeys);
      } else if (rst.length === 1) {
        const keys = [String(rst[0].id)];
        handleSelect(keys);
        setExpandedKeys(keys);
      }
    }).catch(err => console.warn('数据初始化失败', err)).finally(_ => setTreeLoading(false));
  }

  function handleLoadData(treeNode) {
    const {
      id,
      key
    } = treeNode;

    if (key && !expandedKeys.includes(key)) {
      handleExpand([...expandedKeys, key]);
    }

    if (API.appendAPI === undefined) {
      return new Promise(res => res());
      ;
    }

    const api = formatAPI(API.appendAPI, {
      namespace,
      data: {
        id
      }
    });
    setTreeLoading(true);
    return query(api).then(data => {
      const find = findNode(id, treeData);
      find.children = find.children || [];
      find.children.push(...checkData(data));
      setTreeData({ ...treeData
      });
    }).catch(err => console.warn('子项获取失败', err)).finally(_ => setTreeLoading(false));
  }

  function handleExpand(expandedKeys) {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  }

  function handleSelect(selectedKeys) {
    setSelectedKeys(selectedKeys);

    if (selectedKeys[0] && !expandedKeys.includes(selectedKeys[0])) {
      handleExpand([...expandedKeys, selectedKeys[0]]);
    }
  }

  function handleSelectChange() {
    const id = selectedKeys[0];
    const find = findNode(id, treeData);
    onChange({
      id,
      ...find
    });
  }

  function handleLocalSearch(e) {
    const {
      value
    } = e.target;

    if (value) {
      const find = findNodes(value, treeData);
      setExpandedKeys(find.map(i => String(i.id)));
      setAutoExpandParent(true);
    }
  }

  function handleRemoteSearch(value) {
    const api = formatAPI(API.searchAPI, {
      namespace
    });
    setTreeLoading(true);
    return query(api, {
      [searchField]: value
    }).then(data => {
      const rst = checkData(data);

      if (rst) {
        rst.forEach(item => {
          const find = findNode(item.pid, treeData);
          find.children = find.children || [];
          find.children.push(item);
        });
      }

      setTreeData({ ...treeData
      }); // 构造一个对象，而不使用 react 的合成事件

      handleLocalSearch({
        target: {
          value
        }
      });
    }).catch(err => console.warn('搜索失败', err)).finally(_ => setTreeLoading(false));
  }

  const treeProps = {
    loadData: handleLoadData,
    selectedKeys,
    onSelect: handleSelect,
    ...rest
  };

  if (treeProps.expandedKeys || expandedKeys.length) {
    treeProps.expandedKeys = treeProps.expandedKeys || expandedKeys;
    treeProps.onExpand = treeProps.onExpand || handleExpand;
  }

  return /*#__PURE__*/React.createElement(Spin, {
    spinning: treeLoading
  }, API.searchAPI ? /*#__PURE__*/React.createElement(Search, {
    style: {
      // marginTop: 16,
      marginBottom: 8
    },
    placeholder: "\u641C\u7D22",
    onChange: handleLocalSearch,
    onSearch: handleRemoteSearch
  }) : null, treeData && (treeData.length || Object.keys(treeData).length) ? /*#__PURE__*/React.createElement(Tree, _extends({
    showLine: true,
    autoExpandParent: autoExpandParent
  }, treeProps, {
    treeData: treeData
  })) : /*#__PURE__*/React.createElement(Empty, null));
});