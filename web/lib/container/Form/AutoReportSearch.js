function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, useState, useEffect } from 'react';
import { Form } from 'antd';
import useBaseSearch from 'zero-element/lib/helper/form/useBaseSearch';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, Tooltip } from 'antd';
import { getFormItem } from "../../utils/readConfig";
import { Render } from 'zero-element/lib/config/layout';
import { RollbackOutlined } from '@ant-design/icons';
import useFormHandle from "./utils/useFormHandle";
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
export default function AutoReportSearch(props) {
  const [form] = Form.useForm();
  const {
    namespace,
    config,
    extraData
  } = props;
  const {
    layout = 'Grid',
    layoutConfig = {}
  } = config;
  const {
    layoutType = 'horizontal',
    value = [6, 6, 6, 6],
    collapse = 2,
    buttonSpan
  } = layoutConfig;
  const searchProps = useBaseSearch({
    namespace,
    modelPath: 'searchData',
    extraData
  }, config);
  const {
    loading,
    data,
    modelStatus,
    handle,
    model
  } = searchProps;
  const {
    onSearch,
    onClearSearch
  } = handle;
  const {
    listData
  } = model;
  const {
    searchColumns,
    header,
    columns
  } = listData;
  const [fields, setFields] = useState([]);
  const [expand, setExpand] = useState(false);
  const {
    onFormatValue,
    onSaveOtherValue,
    onValuesChange,
    onExpect
  } = useFormHandle(form, {
    namespace,
    config
  });
  useEffect(_ => {
    if (Array.isArray(header) && Array.isArray(columns) && Array.isArray(searchColumns)) {
      const typeMap = {};
      header.forEach((field, i) => {
        typeMap[field] = columns[i];
      });
      setFields(searchColumns.map(field => {
        const [name, type] = field.split('-');

        if (type) {
          return {
            field: name,
            label: name,
            ...typeOptionsMap[type]
          };
        }

        return {
          field,
          label: field,
          ...typeOptionsMap[typeMap[field]]
        };
      }));
    }
  }, [searchColumns, header, columns]);
  useWillUnmount(onClearSearch);

  function handleExpand() {
    setExpand(true);
  }

  function handleCollapse() {
    setExpand(false);
  }

  function handleSubmitForm(values) {
    onSearch({ ...data,
      ...values
    });
  }

  function handleReset() {
    form.resetFields();
  }

  function renderFooter(validLength) {
    return /*#__PURE__*/React.createElement("div", {
      key: "searchButton",
      span: buttonSpan,
      style: {
        marginLeft: '8px'
      }
    }, /*#__PURE__*/React.createElement(Tooltip, {
      title: "\u91CD\u7F6E"
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: handleReset,
      type: "link",
      icon: /*#__PURE__*/React.createElement(RollbackOutlined, null)
    })), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      htmlType: "submit",
      loading: loading
    }, "\u641C\u7D22"), validLength > collapse ? /*#__PURE__*/React.createElement(ExpandButton, {
      expand: expand,
      onExpand: handleExpand,
      onCollapse: handleCollapse
    }) : null);
  }

  const renderFieldsAndButton = fields.map(field => getFormItem(field, modelStatus, {
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

const typeOptionsMap = {
  'D': {
    // 金钱
    type: 'number-range'
  },
  'T': {
    // 时间
    type: 'range',
    span: 12
  },
  'P': {
    // 百分比
    type: 'number-range',
    options: {
      min: 0,
      max: 100
    }
  },
  'C': {
    // 数量
    type: 'number-range'
  },
  'S': {
    // 字符串
    type: 'input'
  }
};