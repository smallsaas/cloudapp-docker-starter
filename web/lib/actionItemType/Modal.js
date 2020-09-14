function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ZEle from 'zero-element';
export default (props => {
  const {
    title,
    options,
    namespace,
    handle,
    hooks = {},
    ...restProps
  } = props;
  const {
    icon,
    modalTitle,
    modalWidth,
    ...rest
  } = options;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(undefined);
  const {
    onSubmitActionModal
  } = hooks;

  function handleOpen() {
    setVisible(true);
  }

  function handleClose() {
    setVisible(false);
  }

  function handleCloseAndQuery() {
    setVisible(false);

    if (typeof handle.onRefresh === 'function') {
      handle.onRefresh();
    }

    if (loading) {
      setLoading(false);
    }
  }

  function handleSubmit(data, handleResponse) {
    setLoading(true);
    onSubmitActionModal(data, handleResponse).finally(_ => setLoading(false));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    onClick: handleOpen,
    type: "primary",
    icon: icon
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
    MODAL: true // namespace={`${namespace}_actionModal`}
    ,
    namespace: namespace
  }, restProps, {
    config: {
      layout: 'Empty',
      ...rest
    },
    onClose: handleCloseAndQuery,
    onSubmit: onSubmitActionModal ? handleSubmit : undefined,
    loading: loading
  }))));
});