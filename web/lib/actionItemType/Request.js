function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Button } from 'antd';
import { query, post, update, remove, download } from 'zero-element/lib/utils/request';
import { message as msg } from 'antd';
const methodMap = {
  'get': query,
  'post': post,
  'put': update,
  'delete': remove,
  'download': download
};
import "./index.css";
export default function Request(props) {
  const {
    title = 'Request',
    options,
    namespace,
    handle,
    ...restProps
  } = props;
  const {
    icon = 'monitor',
    method = 'get',
    message = '操作成功',
    API,
    data = {},
    buttonProps = {},
    ...rest
  } = options;
  const [loading, setLoading] = useState(false);

  function handleClick() {
    const match = methodMap[method];

    if (!API) {
      console.warn('action-request 缺少必要的参数 : API');
      return;
    }

    setLoading(true);

    if (method === 'download') {
      return download(API, {
        method: options.downloadMethod,
        fileName: options.fileName
      }).then(_ => {
        setLoading(false);

        if (message) {
          msg.success(message);
        }

        if (typeof handle.onRefresh === 'function') {
          handle.onRefresh();
        }
      });
    } else {
      match(API, data).then(_ => {
        setLoading(false);

        if (message) {
          msg.success(message);
        }

        if (typeof handle.onRefresh === 'function') {
          handle.onRefresh();
        }
      });
    }
  }

  return /*#__PURE__*/React.createElement(Button, _extends({
    className: "ZEle-action-button",
    onClick: handleClick,
    icon: icon
  }, buttonProps, {
    loading: loading
  }), title);
}