function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ZEle from 'zero-element';
import { UploadOutlined } from '@ant-design/icons';
import "./index.css";
export default function ImportExcel(props) {
  const {
    title = '导入',
    options = {},
    namespace,
    handle,
    ...restProps
  } = props;
  const {
    modalTitle = '文件导入',
    modalWidth,
    API = '/api/io/excel/import',
    name,
    ...rest
  } = options;
  const [visible, setViseble] = useState(false);

  function handleOpen() {
    setViseble(true);
  }

  function handleClose() {
    setViseble(false);
  }

  function handleCloseAndQuery() {
    setViseble(false);

    if (typeof handle.onRefresh === 'function') {
      handle.onRefresh();
    }
  }

  if (!API) {
    console.warn('import-excel 缺少必要的 options : API');
  }

  const config = {
    items: [{
      component: 'Form',
      config: {
        API: {
          createAPI: API
        },
        fields: [{
          label: '上传文件',
          field: 'multipartFile',
          type: 'upload-file',
          options: {
            fileNameField: 'source',
            ...rest
          }
        }, {
          field: 'name',
          type: 'hidden',
          value: name
        }]
      }
    }]
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    className: "ZEle-action-button",
    onClick: handleOpen,
    icon: /*#__PURE__*/React.createElement(UploadOutlined, null)
  }, title), /*#__PURE__*/React.createElement(Modal, {
    title: modalTitle,
    width: modalWidth,
    visible: visible,
    destroyOnClose: true,
    onCancel: handleClose,
    bodyStyle: {
      padding: 0
    },
    footer: null
  }, /*#__PURE__*/React.createElement(ZEle, _extends({
    MODAL: true,
    namespace: namespace
  }, restProps, {
    config: config,
    onClose: handleCloseAndQuery
  }))));
}