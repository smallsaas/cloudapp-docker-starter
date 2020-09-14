function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, useState, useMemo } from 'react';
import { Form } from 'antd';
import useBaseSearch from 'zero-element/lib/helper/form/useBaseSearch';
import { useWillUnmount, useForceUpdate } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, Tooltip } from 'antd';
import { getFormItem } from "../../utils/readConfig";
import { Render } from 'zero-element/lib/config/layout';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import useFormHandle from "./utils/useFormHandle";
import useLongPress from "../../utils/hooks/useLongPress";
import { useDebounceFn } from 'ahooks';
const defaultLabelCol = {
  xs: {
    span: 3
  },
  sm: {
    span: 8
  }
};
const defaultWrapperCol = {
  xs: {
    span: 21
  },
  sm: {
    span: 16
  }
};
export default function BaseSearch(props) {
  const [form] = Form.useForm();
  const {
    namespace,
    config,
    extraData = {}
  } = props;
  const {
    layout = 'Grid',
    fields,
    layoutConfig = {}
  } = config;
  const {
    layoutType = 'horizontal',
    value = [6, 6, 6, 6],
    collapse = 3,
    defaultExpand = fields.length > collapse ? false : null,
    buttonSpan
  } = layoutConfig;
  const forceUpdate = useForceUpdate();
  const [resetCD, setResetCD] = useState(false);
  const searchProps = useBaseSearch({
    namespace
  }, config);
  const {
    loading,
    data,
    model,
    handle
  } = searchProps;
  const initData = useRef({ ...data
  });
  const {
    onSearch,
    onSetSearchData,
    onClearSearch
  } = handle;
  const [expand, setExpand] = useState(defaultExpand);
  const {
    onFormatValue,
    onSaveOtherValue,
    onValuesChange,
    onExpect
  } = useFormHandle(form, {
    namespace,
    config,
    dataPath: 'searchData'
  });
  useMemo(recordDefaultValue, [fields]);
  const {
    run
  } = useDebounceFn(_ => {
    const data = {};
    fields.forEach(field => {
      data[field.field] = undefined;
    });
    onSetSearchData(data);
    onClearSearch();
    form.setFieldsValue(data);
    setResetCD(true);
    setTimeout(() => {
      setResetCD(false);
    }, 500);
  }, {
    wait: 300
  });
  const onLongPress = useLongPress(run); // useWillUnmount(_ => {
  //   onClearSearch();
  // });

  function handleExpand() {
    setExpand(true);
  }

  function handleCollapse() {
    setExpand(false);
  }

  function recordDefaultValue() {
    fields.forEach(item => {
      const {
        field,
        value
      } = item;

      if (value !== undefined && initData.current[field] === undefined) {
        initData.current[field] = extraData[field] || value;
      }
    });
    onSetSearchData(initData.current);
  }

  function handleSubmitForm(values) {
    onSearch({ ...data,
      ...values
    });
  }

  function handleReset() {
    form.resetFields();
    forceUpdate();
  }

  function renderFooter(validLength) {
    return /*#__PURE__*/React.createElement("div", {
      key: "searchButton",
      span: buttonSpan,
      style: {
        marginLeft: '8px'
      }
    }, /*#__PURE__*/React.createElement(Tooltip, {
      title: "\u70B9\u51FB\u91CD\u7F6E, \u957F\u6309\u6E05\u9664"
    }, resetCD ? /*#__PURE__*/React.createElement(Button, {
      type: "link",
      icon: /*#__PURE__*/React.createElement(CheckOutlined, null)
    }) : /*#__PURE__*/React.createElement(Button, _extends({
      type: "link",
      icon: /*#__PURE__*/React.createElement(RollbackOutlined, null),
      onClick: handleReset
    }, onLongPress))), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      htmlType: "submit",
      loading: loading
    }, "\u641C\u7D22"), validLength > collapse ? /*#__PURE__*/React.createElement(ExpandButton, {
      expand: expand,
      onExpand: handleExpand,
      onCollapse: handleCollapse
    }) : null);
  }

  const renderFieldsAndButton = fields.map(field => getFormItem(field, model, {
    namespace,
    form,
    handle: {
      onFormatValue,
      onSaveOtherValue,
      onExpect
    }
  })).filter(field => field);
  const validLength = renderFieldsAndButton.length;

  if (expand === false) {
    renderFieldsAndButton.splice(collapse);
  }

  renderFieldsAndButton.splice(collapse, 0, renderFooter(validLength));
  return /*#__PURE__*/React.createElement(Spin, {
    spinning: false
  }, renderFieldsAndButton.length > 1 ? /*#__PURE__*/React.createElement(Render, {
    n: "SearchLayout"
  }, /*#__PURE__*/React.createElement(Form, {
    form: form,
    layout: layoutType,
    labelCol: defaultLabelCol,
    wrapperCol: defaultWrapperCol,
    initialValues: initData.current,
    onValuesChange: onValuesChange,
    onFinish: handleSubmitForm
  }, /*#__PURE__*/React.createElement(Render, _extends({
    n: layout,
    value: value
  }, layoutConfig), renderFieldsAndButton))) : null);
}

function ExpandButton({
  expand,
  onExpand,
  onCollapse
}) {
  if (expand === null) return null;

  if (expand) {
    return /*#__PURE__*/React.createElement(Button, {
      type: "link",
      onClick: onCollapse
    }, "\u6536\u8D77");
  } else {
    return /*#__PURE__*/React.createElement(Button, {
      type: "link",
      onClick: onExpand
    }, "\u5C55\u5F00");
  }
}