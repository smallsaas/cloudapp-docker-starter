function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useReducer } from 'react';
import ZEle from 'zero-element';
import { get as LAGet } from 'zero-element/lib/config/listAction';
import { Modal } from 'antd'; // import PageContext from 'zero-element/lib/context/PageContext';

import { formatAPI } from 'zero-element/lib/utils/format';
import ListOperation from "./ListOperation";
import reducer from "./reducer";
import "../../index.css";
const initialState = {
  confirm: false,
  modal: false,
  modalTitle: '',
  pagination: undefined,
  modalConfig: {},
  index: -1
};
export default function ListOperationWrapped(props) {
  // const context = useContext(PageContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    index,
    namespace,
    handle = {},
    extraData = {},
    model
  } = props;

  function onModal(cfg) {
    const {
      options
    } = cfg;
    const {
      modalTitle,
      modalWidth,
      pagination,
      ...rest
    } = options;
    const fTitle = formatAPI(modalTitle, {
      namespace
    });
    dispatch({
      type: 'openModal',
      payload: {
        modalTitle: fTitle,
        modalWidth,
        pagination: pagination,
        modalConfig: rest
      }
    });
  }

  function handleClose() {
    dispatch({
      type: 'closeModal',
      payload: {
        modal: false
      }
    });

    if (handle.onRefresh) {
      handle.onRefresh();
    }
  }

  function onChildEditModal(cfg) {
    const {
      options
    } = cfg;
    const {
      modalTitle,
      modalWidth,
      ...rest
    } = options;
    const fTitle = formatAPI(modalTitle, {
      namespace
    });
    dispatch({
      type: 'openModal',
      payload: {
        modalTitle: fTitle,
        modalWidth,
        modalConfig: rest,
        onSubmit: handle.onEdit,
        data: props.record,
        index
      }
    });
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ListOperation, _extends({}, props, {
    state: state,
    dispatch: dispatch,
    handle: { ...handle,
      onModal,
      onChildEditModal,
      ...LAGet()
    }
  })), /*#__PURE__*/React.createElement(Modal, {
    visible: state.modal,
    title: state.modalTitle,
    width: state.modalWidth,
    destroyOnClose: true,
    onCancel: handleClose,
    bodyStyle: {
      padding: 0
    },
    footer: null
  }, /*#__PURE__*/React.createElement(ZEle, {
    MODAL: true,
    index: index || state.index,
    namespace: model.namespace,
    config: {
      layout: 'Empty',
      ...state.modalConfig
    },
    onClose: handleClose,
    onSubmit: state.onSubmit,
    data: state.data,
    extraData: extraData,
    pagination: state.pagination
  })));
}