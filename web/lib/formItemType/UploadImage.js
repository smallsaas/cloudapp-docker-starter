function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { Upload, Modal } from 'antd';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';
import { formatAPI } from 'zero-element/lib/utils/format';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const initFileList = [];
export default function UploadImage(props) {
  const {
    value,
    options,
    namespace,
    ...rest
  } = props;
  const {
    API = '/api/upload/files',
    max = 9
  } = options;
  const [fileList, setFileList] = useState(initFileList);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const fAPI = formatAPI(API, {
    namespace
  });
  useEffect(_ => {
    if (fileList === initFileList) {
      setFileList(format(value));
    }
  }, [fileList, value]);

  function handlePreview(file) {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  }

  function handleCancel() {
    setPreviewVisible(false);
  }

  const uploadButton = /*#__PURE__*/React.createElement("div", null, loading ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : /*#__PURE__*/React.createElement(PlusOutlined, null), /*#__PURE__*/React.createElement("div", {
    className: "ant-upload-text"
  }, "\u70B9\u51FB\u4E0A\u4F20"));

  function handleChange(info) {
    const {
      fileList
    } = info;
    setFileList(fileList);

    if (info.file.status === 'uploading' && fileList.length > 0) {
      setLoading(true);
    }

    if (info.file.status === 'done' || info.file.status === 'error' || info.file.status === 'removed') {
      setLoading(false);
      const doneImageList = fileList.filter(file => file.status === 'done');
      const saveimageList = doneImageList.map(file => ({
        url: file.response ? file.response.data.url : file.url
      }));
      props.onChange(saveimageList);
    }
  }

  const uploadProps = {
    accept: 'image/*',
    name: 'file',
    action: /^http(s)*:\/\//.test(API) ? fAPI : `${get()}${fAPI}`,
    listType: 'picture-card',
    fileList: fileList,
    showUploadList: true,
    headers: {
      authorization: `Bearer ${getToken()}`
    },
    onPreview: handlePreview,
    onChange: handleChange
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "clearfix",
    style: {
      marginTop: '0.5em'
    }
  }, rest), /*#__PURE__*/React.createElement(Upload, uploadProps, fileList.length >= max ? '' : uploadButton), /*#__PURE__*/React.createElement(Modal, {
    visible: previewVisible,
    footer: null,
    onCancel: handleCancel
  }, /*#__PURE__*/React.createElement("img", {
    alt: "image",
    style: {
      width: '100%'
    },
    src: previewImage
  })));
}

function format(value) {
  let rst = [];

  try {
    if (typeof value === 'string') {
      rst = JSON.parse(value);
    } else if (Array.isArray(value)) {
      rst = value;
    }
  } catch (e) {// rst.push(value);
  }

  rst.length > 0 && rst.map((item, index) => {
    rst[index] = { ...item,
      uid: index,
      status: 'done'
    };
  });
  return rst;
}