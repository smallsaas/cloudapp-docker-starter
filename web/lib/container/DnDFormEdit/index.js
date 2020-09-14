import React, { useReducer, useContext, useRef } from 'react';
import { Button, Spin, Input, Card, message } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm'; // import PageContext from 'zero-element/lib/context/PageContext';

import { Flex } from 'layout-flex';
import global from 'zero-element/lib/config/global';
import ComponentPanel from "./ComponentPanel";
import Fields from "./Fields";
import EchoPanel from "./EchoPanel";
import AttributesPanel from "./AttributesPanel";
import DnDContext from "./utils/context";
import handleState from "./utils/dispatchState";
import formatToConfig from "./utils/format";
import { assigned, fieldCount, setInitId } from "./utils/Item";
import Panel from "../../components/Panel";
const {
  FlexItem
} = Flex;
const initState = {
  current: {},
  // 当前编辑的元素
  name: '',
  // 表单名称
  fields: [],
  config: {
    id: 0,
    title: '表单',
    type: 'Canvas',
    items: []
  },
  copyList: [],
  layoutType: 'horizontal',
  spinning: false,
  spinningTip: ''
};

function DndFormEdit(props) {
  const {
    onSubmit,
    initData
  } = props;
  const formRef = useRef({});
  const [state, dispatch] = useReducer(handleState, initState, () => JSON.parse(JSON.stringify(initState)));
  const {
    fields,
    config,
    copyList,
    layoutType,
    spinning,
    spinningTip
  } = state;
  const {
    API,
    path
  } = props.config; // const context = useContext(PageContext);
  // const { namespace } = context;

  const namespace = 'todo';
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData'
  }, props.config);
  const {
    router
  } = global;
  const originFields = useRef([]);
  useDidMount(_ => {
    if (typeof initData === 'object') {
      const {
        originConfig = {}
      } = initData;
      dispatch({
        type: 'initConfig',
        payload: initData
      });
      setInitId(originConfig.finalId, originConfig.fieldCount);
    }

    if (API.getAPI) {
      dispatch({
        type: 'save',
        payload: {
          spinning: true,
          spinningTip: '正在读取……'
        }
      });
      formProps.handle.onGetOne({}).then(({
        code,
        data
      }) => {
        const {
          originConfig = {}
        } = data;

        if (code === 200) {
          originFields.current = data.fields;
          dispatch({
            type: 'initConfig',
            payload: data
          });
          setInitId(originConfig.finalId, originConfig.fieldCount);
        }
      }).finally(_ => {
        dispatch({
          type: 'save',
          payload: {
            spinning: false,
            spinningTip: ''
          }
        });
      });
    }
  });

  function handleName(e) {
    const name = e.target.value;
    dispatch({
      type: 'save',
      payload: {
        name
      }
    });
  }

  function handleSave() {
    const [data, otherFields] = formatToConfig(config, state.name, {
      layoutType
    });
    const method = API.updateAPI ? formProps.handle.onUpdateForm : formProps.handle.onCreateForm;
    const submitData = {
      title: state.name,
      config: data,
      fields: uniqueFields(fields.map(f => ({
        field: f,
        label: f
      })), originFields.current, otherFields),
      originConfig: { ...state.config,
        title: state.name,
        finalId: assigned,
        fieldCount: fieldCount
      }
    };

    if (onSubmit) {
      onSubmit(submitData);
      return false;
    }

    dispatch({
      type: 'save',
      payload: {
        spinning: true,
        spinningTip: '正在保存……'
      }
    });
    method({
      fields: submitData
    }).then(_ => {
      message.success('保存成功');

      if (path && router) {
        const fPath = formatAPI(path, {
          namespace
        });
        router(fPath);
      }
    }).finally(_ => {
      dispatch({
        type: 'save',
        payload: {
          spinning: false,
          spinningTip: ''
        }
      });
    });
  }

  function renderSubmitButton() {
    if (typeof onSubmit === 'function') {
      return null;
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      onClick: handleSave
    }, "\u4FDD\u5B58"));
  }

  formRef.current = {
    onSubmit: handleSave
  };
  return /*#__PURE__*/React.createElement(DnDContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(Spin, {
    spinning: spinning,
    tip: spinningTip
  }, /*#__PURE__*/React.createElement(Card, {
    size: "small"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "\u8868\u5355\u540D\u79F0\uFF1A"), /*#__PURE__*/React.createElement(Input, {
    value: state.name,
    onChange: handleName
  })), renderSubmitButton()), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Panel, {
    title: "\u8868\u5355\u5B57\u6BB5"
  }, /*#__PURE__*/React.createElement(Fields, {
    data: fields,
    dispatch: dispatch
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "\u8868\u5355\u753B\u5E03"
  }, /*#__PURE__*/React.createElement(EchoPanel, {
    layoutType: layoutType,
    config: config,
    dispatch: dispatch
  })))), /*#__PURE__*/React.createElement(FlexItem, {
    style: {
      width: '256px'
    }
  }, /*#__PURE__*/React.createElement(ComponentPanel, {
    layoutType: layoutType,
    dispatch: dispatch,
    copyList: copyList
  }), /*#__PURE__*/React.createElement(AttributesPanel, {
    current: state.current,
    dispatch: dispatch,
    fields: fields,
    API: API
  }))));
}
/**
 * 合并成唯一的字段列表
 *
 * @param {array} lowList
 * @param {array} midList
 * @param {array} highList
 * @returns
 */


function uniqueFields(lowList, midList, highList) {
  const records = {};
  lowList.forEach(f => {
    records[f.field] = f;
  });
  midList.forEach(f => {
    const target = records[f.field];

    if (target && target.label === target.field) {
      records[f.field] = f;
    }
  });
  highList.forEach(f => {
    records[f.field] = f;
  });
  return Object.values(records);
}

export default DragDropContext(HTML5Backend)(DndFormEdit);