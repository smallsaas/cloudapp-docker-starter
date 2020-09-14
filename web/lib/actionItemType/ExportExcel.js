import React from 'react';
import { Button } from 'antd';
import { download } from 'zero-element/lib/utils/request';
import { getPageData } from 'zero-element/lib/Model';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { DownloadOutlined } from '@ant-design/icons';
import "./index.css";
export default function ExportExcel(props) {
  const {
    title = '导出',
    options = {},
    namespace,
    handle,
    config,
    ...restProps
  } = props;
  const {
    API,
    method,
    name = namespace,
    fileName,
    ...rest
  } = options;
  const {
    API: lAPI = {}
  } = config;
  const {
    listAPI
  } = lAPI;
  const pageData = getPageData(namespace);
  const {
    searchData,
    current,
    total
  } = pageData;

  function handleClick() {
    download(API, {
      method,
      fileName
    }, { ...searchData,
      templateName: name,
      api: `${get()}${listAPI}?pageNum=${current}&pageSize=${total}`
    });
  }

  return /*#__PURE__*/React.createElement(Button, {
    className: "ZEle-action-button",
    onClick: handleClick,
    icon: /*#__PURE__*/React.createElement(DownloadOutlined, null)
  }, title);
}