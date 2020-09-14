function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, useMemo, useState } from 'react';
import { Form } from 'antd';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { useDidMount, useForceUpdate } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button } from 'antd';
import { getFormItem } from "../../utils/readConfig";
import { Render } from 'zero-element/lib/config/layout';
import useFormHandle from "./utils/useFormHandle";
export default function ChildrenForm(props) {
  const [form] = Form.useForm();
  const forceUpdate = useForceUpdate();
  const {
    namespace,
    config,
    index,
    onClose,
    onSubmit
  } = props;
  const {
    API = {},
    layout = 'Empty',
    layoutConfig = {},
    fields
  } = config;
  const {
    layoutType = 'inline'
  } = layoutConfig;
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData'
  }, config);
  const {
    onFormatValue,
    handleFormatValue,
    onSaveOtherValue,
    onValuesChange,
    onExpect
  } = useFormHandle(form, {
    namespace,
    config
  });
  const {
    loading,
    data,
    model,
    handle
  } = formProps;
  const initData = useRef(props.data || {});
  const {
    onGetOne
  } = handle;
  const [destroy, setDestroy] = useState(false); // useMemo(recordDefaultValue, [fields]);

  useDidMount(_ => {
    if (API.getAPI) {
      setDestroy(true);
      onGetOne({}).then(({
        code,
        data
      }) => {
        if (code === 200) {
          initData.current = data;
          forceUpdate();
        }
      }).finally(_ => setDestroy(false));
    }

    recordDefaultValue();
  });

  function recordDefaultValue() {
    fields.forEach(item => {
      const {
        field,
        value
      } = item;

      if (value !== undefined && initData.current[field] === undefined) {
        initData.current[field] = value;
      }
    });
    form.setFieldsValue({ ...initData.current
    });
    forceUpdate();
  }

  function handleSubmitForm(values) {
    const submitData = { ...values
    };
    handleFormatValue(submitData);

    if (onSubmit) {
      if (index !== undefined) {
        // 一对多的编辑
        onSubmit(index, submitData);
      } else {
        // 一对多的新增
        onSubmit(submitData);
      }

      if (onClose) {
        onClose();
      }

      return false;
    }
  }

  function handleReset() {
    form.resetFields();
  }

  function renderFooter() {
    function onSubmit() {
      form.submit();
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "ant-modal-footer"
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: handleReset
    }, "\u91CD\u7F6E"), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      htmlType: "submit",
      onClick: onSubmit
    }, "\u4FDD\u5B58"));
  }

  return /*#__PURE__*/React.createElement(Spin, {
    spinning: loading
  }, /*#__PURE__*/React.createElement("div", {
    className: fields.length ? 'ant-modal-body' : undefined
  }, destroy ? null : /*#__PURE__*/React.createElement(Form, {
    form: form,
    layout: layoutType,
    initialValues: initData.current,
    onValuesChange: onValuesChange,
    onFinish: handleSubmitForm
  }, /*#__PURE__*/React.createElement(Render, _extends({
    n: layout
  }, layoutConfig), fields.map(field => getFormItem(field, model, {
    namespace,
    form,
    handle: {
      onFormatValue,
      onSaveOtherValue,
      onExpect
    }
  }))))), renderFooter());
}