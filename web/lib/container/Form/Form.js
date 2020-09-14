function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, useMemo, useState } from 'react';
import { Form } from 'antd';
import { formatAPI } from 'zero-element/lib/utils/format';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { useDidMount, useWillUnmount, useForceUpdate } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, message } from 'antd';
import { getFormItem } from "../../utils/readConfig";
import { Render } from 'zero-element/lib/config/layout';
import global from 'zero-element/lib/config/global';
import useFormHandle from "./utils/useFormHandle";
import extraFieldType from "./utils/extraFieldType";
import canPortal from "../../utils/canPortal";
import { setPageData, getPageData, clearPageData } from 'zero-element/lib/Model';
import "./index.css";
const defaultLabelCol = {
  xs: {
    span: 8
  }
};
const defaultWrapperCol = {// xs: { span: 16, },
};
export default function BaseForm(props) {
  const [form] = Form.useForm();
  const forceUpdate = useForceUpdate();
  const {
    MODAL,
    namespace,
    config,
    extraData = {},
    onClose,
    onSubmit,
    extraEl,
    loading: propsLoading,
    forceInitForm,
    footer,
    hooks = {},
    formRef,
    keepData = false // 卸载 BaseForm 时不销毁 model.formData

  } = props;
  const {
    API = {},
    layout = 'Empty',
    layoutConfig = {},
    fields: fieldsCfg,
    path,
    goBack: gobackOpt = true,
    footer: footerOpt,
    requestOptions
  } = config;
  const {
    layoutType = 'inline'
  } = layoutConfig; // inline vertical horizontal

  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
    extraData
  }, config);
  const {
    router,
    goBack
  } = global;
  const renderGoBack = extraEl && extraEl.current && goBack;
  const {
    loading,
    data,
    model,
    handle
  } = formProps;
  const {
    onFormMap
  } = hooks;
  const pageDataFormData = getPageData(namespace).formData;
  const initData = useRef({ ...extraData,
    ...pageDataFormData,
    ...data
  });
  const {
    onFormatValue,
    handleFormatValue,
    onSaveOtherValue,
    onValuesChange,
    onExpect
  } = useFormHandle(form, {
    namespace,
    config,
    forceInitForm,
    onGetOne: handleGetData
  });
  const extraFields = useRef([]);
  const [fields, setFields] = useState(fieldsCfg);
  const {
    onGetOne,
    onCreateForm,
    onUpdateForm,
    onClearForm
  } = handle;
  const [canRenderForm, setCanRenderForm] = useState(API.getAPI ? false : true); // useMemo(recordDefaultValue, [fields]);

  useDidMount(_ => {
    recordDefaultValue();

    if (API.getAPI) {
      handleGetData();
    }

    if (typeof formRef === 'object') {
      formRef.current = form;
    }
  });
  useWillUnmount(_ => {
    if (!keepData) {
      onClearForm();
      clearPageData(namespace, 'formData');
    }
  });

  function handleGetData() {
    setCanRenderForm(false);
    onGetOne({}).then(({
      code,
      data
    }) => {
      if (code === 200) {
        initData.current = data;
        const {
          extra
        } = data;
        setPageData(namespace, 'formData', data);
        form.setFieldsValue({ ...initData.current
        });

        if (extra && Array.isArray(extra.items)) {
          setExtraFields(extra.items);
        } else {
          forceUpdate();
        }
      }
    }).finally(_ => {
      setCanRenderForm(true);
    });
  }

  function setExtraFields(items) {
    setFields([...fields, ...items.map(item => {
      extraFields.current.push(item.attr);
      return {
        label: item.fieldName,
        field: item.attr,
        type: extraFieldType[item.fieldType] || 'input',
        value: item.value
      };
    })]);
  }

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
    const extraSubmit = {};
    fields.forEach(field => {
      if (field.type === 'hidden') {
        extraSubmit[field.field] = extraData[field.field] || field.value;
      }
    });
    let submitData = { ...extraSubmit,
      ...pageDataFormData,
      ...values
    };
    handleFormatValue(submitData); // 修改并提交 extra 里面的数据

    extraFields.current.forEach(field => {
      const find = submitData.extra.items.find(item => item.attr === field);

      if (find) {
        find.value = submitData[field];
        delete submitData[field];
      }
    });

    if (onSubmit) {
      onSubmit(submitData, handleResponse);
      return false;
    }

    if (typeof onFormMap === 'function') {
      submitData = onFormMap(submitData, pageDataFormData);
    }

    if (API.updateAPI) {
      onUpdateForm({
        fields: submitData,
        options: requestOptions
      }).then(handleResponse);
    } else {
      onCreateForm({
        fields: submitData,
        options: requestOptions
      }).then(handleResponse);
    }
  }

  function handleResponse(data = {}, opt = {}) {
    const {
      message: msg = '操作成功'
    } = opt;

    if (data.code === 200) {
      if (msg) {
        message.success(msg);
      }

      if (onClose) {
        onClose(data);
      }

      if (router) {
        if (path) {
          const fPath = formatAPI(path, {
            namespace
          });
          router(fPath);
        }
      }

      if (!MODAL && gobackOpt && goBack) {
        goBack();
      }
    } else {
      message.error(`操作失败: ${data.message}`);
    }
  }

  function handleGoBack() {
    if (path) {
      const fPath = formatAPI(path, {
        namespace
      });
      router(fPath);
    } else {
      goBack();
    }
  }

  function handleReset() {
    form.resetFields();
    forceUpdate();
  }

  function renderFooter() {
    function onSubmit() {
      form.submit();
    }

    if (footer !== undefined || footerOpt !== undefined) {
      return footer;
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
    spinning: propsLoading || loading
  }, renderGoBack && canPortal(extraEl, /*#__PURE__*/React.createElement(Button, {
    onClick: handleGoBack
  }, "\u8FD4\u56DE")), /*#__PURE__*/React.createElement("div", {
    className: fields.length ? 'ant-modal-body' : undefined
  }, canRenderForm ? /*#__PURE__*/React.createElement(Form, {
    form: form,
    layout: layoutType,
    labelCol: defaultLabelCol,
    wrapperCol: defaultWrapperCol,
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
    },
    hooks,
    extraData
  })))) : /*#__PURE__*/React.createElement(Form, {
    form: form
  })), renderFooter());
}